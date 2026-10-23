import { CategoryCarousel } from "@/components/negocios/catalogo/CategoryCarousel";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { Business } from "@/constants/businesses";
import Colors from "@/constants/Colors";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import {
  getPublicBusiness,
  getPublicCatalog,
  type PublicCatalogProduct,
} from "@/src/services/api/public-businesses.api";
import { styles } from "@/src/styles/identidadPEM/business-detail.styles";

export default function BusinessDetailScreen() {
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { ready, isFavorite, toggleFavorite } = useFavorites();
  const { isDark } = useAppTheme();
  const theme = isDark ? Colors.dark : Colors.light;

  const [business, setBusiness] = useState<Business | null>(null);
  const [catalogAvailable, setCatalogAvailable] = useState(false);
  const [publicProducts, setPublicProducts] = useState<PublicCatalogProduct[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!id) {
      setError("No se recibió el identificador del negocio.");
      setLoading(false);
      setCatalogLoading(false);
      return;
    }

    let active = true;

    async function loadBusiness() {
      setLoading(true);
      setCatalogLoading(true);
      setError(null);

      try {
        const result = await getPublicBusiness(id!);

        if (active) {
          setBusiness(result);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "No se pudo cargar el negocio.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }

      try {
        const catalog = await getPublicCatalog(id!);
        console.log("CATÁLOGO API:", JSON.stringify(catalog, null, 2));

        if (active) {
          setCatalogAvailable(catalog.available);
          setPublicProducts(catalog.products);
        }
      } catch {
        if (active) {
          setCatalogAvailable(false);
          setPublicProducts([]);
        }
      } finally {
        if (active) setCatalogLoading(false);
      }
    }

    void loadBusiness();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}
      >
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.tint} />
          <Text style={[styles.notFoundText, { color: theme.description }]}>
            Cargando negocio...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !business) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}
      >
        <View style={styles.center}>
          <Text style={styles.notFoundEmoji}>🔎</Text>
          <Text style={styles.notFoundTitle}>
            {error ? "No pudimos cargar el negocio" : "Negocio no encontrado"}
          </Text>
          <Text style={styles.notFoundText}>
            {error ?? "Puede que la ficha ya no esté disponible."}
          </Text>

          <Pressable
            onPress={() => router.back()}
            style={styles.primaryButton}
            accessibilityRole="button"
          >
            <Text style={styles.primaryButtonText}>Volver</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const favorite = isFavorite(business.id);

  const updateQuantity = (productId: string, change: number) => {
    setQuantities((previous) => {
      const nextQuantity = (previous[productId] ?? 0) + change;

      if (nextQuantity <= 0) {
        const next = { ...previous };
        delete next[productId];
        return next;
      }

      return { ...previous, [productId]: nextQuantity };
    });
  };

  const contactWhatsApp = async () => {
    if (!business.phone?.trim()) {
      Alert.alert(
        "Contacto no disponible",
        "Este negocio todavía no ha registrado un teléfono de contacto.",
      );
      return;
    }

    const selectedProducts = catalogAvailable
      ? publicProducts.filter(
          (product) => !product.agotado && (quantities[product.id] ?? 0) > 0,
        )
      : [];

    const total = selectedProducts.reduce(
      (sum, product) =>
        sum + (product.priceCents / 100) * quantities[product.id],
      0,
    );

    const message =
      selectedProducts.length === 0
        ? `Hola, vi *${business.name}* en IdentidadPEM y quisiera hacer una consulta.`
        : [
            `Hola, vi *${business.name}* en IdentidadPEM y quisiera hacer este pedido:`,
            "",
            ...selectedProducts.map(
              (product) =>
                `• ${product.name} x${quantities[product.id]} — S/ ${(
                  (product.priceCents / 100) *
                  quantities[product.id]
                ).toFixed(2)}`,
            ),
            "",
            `*Total estimado: S/ ${total.toFixed(2)}*`,
            "",
            "¿Podrían confirmarme la disponibilidad? Gracias.",
          ].join("\n");

    const phone = business.phone.replace(/\D/g, "");
    const internationalPhone = phone.startsWith("51") ? phone : `51${phone}`;
    const url = `https://wa.me/${internationalPhone}?text=${encodeURIComponent(message)}`;

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("Error", "No se pudo abrir WhatsApp. Inténtalo nuevamente.");
    }
  };

  const productsByCategory = publicProducts.reduce<
    {
      categoryId: string;
      categoryName: string;
      products: PublicCatalogProduct[];
    }[]
  >((groups, product) => {
    const categoryId = product.category.id;
    const categoryName = product.category.name;

    let group = groups.find((item) => item.categoryId === categoryId);

    if (!group) {
      group = {
        categoryId,
        categoryName,
        products: [],
      };

      groups.push(group);
    }

    group.products.push(product);

    return groups;
  }, []);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => router.back()}
          style={[
            styles.backButton,
            {
              backgroundColor: "transparent",
              borderColor: "transparent",
            },
          ]}
          accessibilityRole="button"
        >
          <Text style={[styles.backText, { color: theme.tint }]}>‹ Volver</Text>
        </Pressable>

        <View style={[styles.heroImage, { backgroundColor: theme.surface }]}>
          {business.imageUrl ? (
            <Image
              source={{ uri: business.imageUrl }}
              style={styles.heroPhoto}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.heroEmoji}>{business.emoji}</Text>
          )}
        </View>

        <View style={styles.details}>
          <Text style={[styles.eyebrow, { color: theme.tint }]}>
            {business.categoryLabel.toUpperCase()}
          </Text>

          <Text style={[styles.title, { color: theme.text }]}>
            {business.name}
          </Text>

          <Text style={[styles.description, { color: theme.description }]}>
            {business.description}
          </Text>

          <View
            style={[
              styles.locationCard,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Text style={styles.locationEmoji}>📍</Text>

            <View style={styles.locationInfo}>
              <Text style={[styles.locationLabel, { color: theme.tint }]}>
                UBICACIÓN
              </Text>

              <Text style={[styles.locationValue, { color: theme.text }]}>
                {business.location}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.aboutCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={[styles.aboutTitle, { color: theme.text }]}>
              Sobre este negocio
            </Text>

            <Text style={[styles.aboutText, { color: theme.description }]}>
              {business.description?.trim() ||
                "Este negocio todavía no ha agregado una descripción."}
            </Text>
          </View>

          {/* Catálogo activable de demostración */}

          {/* Catálogo de productos */}
          <View
            style={[
              styles.catalogCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.catalogHeader}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.aboutTitle, { color: theme.text }]}>
                  Catálogo de productos
                </Text>

                <Text
                  style={{
                    color: theme.description,
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  Productos y precios disponibles para este negocio.
                </Text>
              </View>
            </View>

            {catalogLoading ? (
              <View style={{ marginTop: 14 }}>
                <ActivityIndicator color={theme.tint} />
                <Text style={{ color: theme.description, marginTop: 8 }}>
                  Cargando catálogo...
                </Text>
              </View>
            ) : !catalogAvailable ? (
              <Text style={{ color: theme.description, marginTop: 14 }}>
                Este negocio no tiene el catálogo habilitado.
              </Text>
            ) : publicProducts.length === 0 ? (
              <Text style={{ color: theme.description, marginTop: 14 }}>
                Todavía no hay productos publicados en este catálogo.
              </Text>
            ) : (
              <View style={{ marginTop: 14, gap: 22 }}>
                {productsByCategory.map((group) => (
                  <View key={group.categoryId}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 12,
                      }}
                    >
                      <Text
                        style={{
                          color: theme.text,
                          fontSize: 18,
                          fontWeight: "800",
                        }}
                      >
                        {group.categoryName}
                      </Text>

                      <Text style={{ color: theme.description, fontSize: 12 }}>
                        {group.products.length} productos
                      </Text>
                    </View>

                    <CategoryCarousel
                      borderColor={theme.border}
                      buttonColor={theme.card}
                      textColor={theme.text}
                    >
                      {group.products.map((product) => (
                        <View
                          key={product.id}
                          style={{
                            width: 220,
                            padding: 14,
                            borderRadius: 16,
                            borderWidth: 1,
                            borderColor: theme.border,
                            backgroundColor: theme.surface,
                          }}
                        >
                          {product.imageUrl ? (
                            <Image
                              source={{ uri: product.imageUrl }}
                              style={{
                                width: "100%",
                                height: 135,
                                borderRadius: 10,
                                marginBottom: 12,
                              }}
                              resizeMode="cover"
                            />
                          ) : (
                            <View
                              style={{
                                height: 135,
                                borderRadius: 10,
                                marginBottom: 12,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: theme.card,
                              }}
                            >
                              <Text style={{ fontSize: 38 }}>🍽️</Text>
                            </View>
                          )}

                          <Text
                            style={{
                              color: theme.text,
                              fontSize: 15,
                              fontWeight: "700",
                            }}
                            numberOfLines={2}
                          >
                            {product.name}
                          </Text>

                          {!!product.description && (
                            <Text
                              style={{
                                color: theme.description,
                                fontSize: 12,
                                lineHeight: 18,
                                marginTop: 5,
                                minHeight: 36,
                              }}
                              numberOfLines={2}
                            >
                              {product.description}
                            </Text>
                          )}

                          <Text
                            style={{
                              color: theme.tint,
                              fontSize: 17,
                              fontWeight: "800",
                              marginTop: 12,
                            }}
                          >
                            S/ {(product.priceCents / 100).toFixed(2)}
                          </Text>

                          <Text
                            style={{
                              color: product.agotado ? "#B91C1C" : "#15803D",
                              fontSize: 12,
                              fontWeight: "700",
                              marginTop: 5,
                            }}
                          >
                            {product.agotado ? "Agotado" : "Disponible"}
                          </Text>

                          {!product.agotado && (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 12,
                              }}
                            >
                              <Pressable
                                onPress={() => updateQuantity(product.id, -1)}
                                accessibilityRole="button"
                                accessibilityLabel={`Quitar una unidad de ${product.name}`}
                                style={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: 9,
                                  borderWidth: 1,
                                  borderColor: theme.border,
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundColor: theme.card,
                                }}
                              >
                                <Text
                                  style={{ color: theme.text, fontSize: 22 }}
                                >
                                  −
                                </Text>
                              </Pressable>

                              <Text
                                style={{
                                  color: theme.text,
                                  fontSize: 16,
                                  fontWeight: "800",
                                }}
                              >
                                {quantities[product.id] ?? 0}
                              </Text>

                              <Pressable
                                onPress={() => updateQuantity(product.id, 1)}
                                accessibilityRole="button"
                                accessibilityLabel={`Agregar una unidad de ${product.name}`}
                                style={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: 9,
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundColor: theme.tint,
                                }}
                              >
                                <Text
                                  style={{
                                    color: theme.buttonText,
                                    fontSize: 22,
                                  }}
                                >
                                  +
                                </Text>
                              </Pressable>
                            </View>
                          )}
                        </View>
                      ))}
                    </CategoryCarousel>
                  </View>
                ))}
              </View>
            )}
          </View>

          <Pressable
            onPress={contactWhatsApp}
            accessibilityRole="button"
            accessibilityLabel="Contactar al negocio por WhatsApp"
            style={{
              backgroundColor: "#25D366",
              borderRadius: 14,
              paddingVertical: 16,
              paddingHorizontal: 18,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              marginTop: 18,
            }}
          >
            <Text style={{ fontSize: 20 }}>💬</Text>
            <Text style={{ color: "#FFFFFF", fontWeight: "800", fontSize: 16 }}>
              {catalogAvailable &&
              Object.values(quantities).some((quantity) => quantity > 0)
                ? "Enviar pedido por WhatsApp"
                : "Contactar por WhatsApp"}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => toggleFavorite(business.id)}
            disabled={!ready}
            style={({ pressed }) => [
              styles.favoriteButton,
              {
                backgroundColor: favorite ? theme.surface : theme.tint,
                borderColor: theme.tint,
              },
              pressed && styles.pressed,
              !ready && styles.disabledButton,
            ]}
            accessibilityRole="button"
            accessibilityLabel={
              favorite
                ? `Quitar ${business.name} de favoritos`
                : `Guardar ${business.name} en favoritos`
            }
          >
            {!ready ? (
              <ActivityIndicator color={theme.buttonText} />
            ) : (
              <Text
                style={[
                  styles.favoriteButtonText,
                  {
                    color: favorite ? theme.tint : theme.buttonText,
                  },
                ]}
              >
                {favorite
                  ? "♥  Quitar de guardados"
                  : "♡  Guardar en favoritos"}
              </Text>
            )}
          </Pressable>

          <Text style={[styles.disclaimer, { color: theme.description }]}>
            Los precios y la disponibilidad deben ser confirmados por el
            negocio.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
