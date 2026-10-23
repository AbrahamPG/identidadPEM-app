import { useAppTheme } from "@/contexts/ThemeContext";
import { styles } from "@/src/styles/identidadPEM/explore.styles";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { Business, BusinessCategory } from "@/constants/businesses";

import Colors from "@/constants/Colors";
import { useFavorites } from "@/contexts/FavoritesContext";
import { getPublicBusinesses } from "@/src/services/api/public-businesses.api";
import { Image } from "react-native";

const categories: {
  id: "all" | BusinessCategory;
  label: string;
  emoji: string;
}[] = [
  { id: "all", label: "Todo", emoji: "✨" },
  { id: "food", label: "Comida", emoji: "🍽️" },
  { id: "hotel", label: "Hospedaje", emoji: "🛏️" },
  { id: "tourism", label: "Turismo", emoji: "🌿" },
  { id: "services", label: "Servicios", emoji: "🛠️" },
];

const CATEGORY_COLORS: Record<BusinessCategory, string> = {
  food: "#FCE7D4",
  hotel: "#DDEBDD",
  tourism: "#D8EBDD",
  services: "#DDE8F5",
};

const VALID_CATEGORIES: BusinessCategory[] = [
  "food",
  "hotel",
  "tourism",
  "services",
];

function getValidCategory(
  value: string | string[] | undefined,
): "all" | BusinessCategory {
  if (
    typeof value === "string" &&
    VALID_CATEGORIES.includes(value as BusinessCategory)
  ) {
    return value as BusinessCategory;
  }

  return "all";
}
const PAGE_SIZE = 10;
export default function ExploreScreen() {
  const { isDark } = useAppTheme();
  const theme = isDark ? Colors.dark : Colors.light;
  const { width } = useWindowDimensions();
  const { category } = useLocalSearchParams<{ category?: string | string[] }>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | BusinessCategory
  >(() => getValidCategory(category));

  // Actualiza el filtro si Inicio envía otra categoría.
  useEffect(() => {
    setSelectedCategory(getValidCategory(category));
  }, [category]);

  useEffect(() => {
    let active = true;

    async function loadBusinesses() {
      setLoading(true);
      setLoadError(null);

      try {
        const data = await getPublicBusinesses();

        if (active) {
          setBusinesses(data);
        }
      } catch (error) {
        if (active) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "No se pudieron cargar los negocios.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadBusinesses();

    return () => {
      active = false;
    };
  }, [retryKey]);

  const columns = width >= 1050 ? 3 : width >= 650 ? 2 : 1;
  const cardWidth = columns === 1 ? "100%" : columns === 2 ? "48%" : "31.5%";

  const filteredBusinesses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return businesses.filter((business) => {
      const matchesCategory =
        selectedCategory === "all" || business.category === selectedCategory;

      const searchableText = [
        business.name,
        business.categoryLabel,
        business.description,
        business.location,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        query.length === 0 || searchableText.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [businesses, search, selectedCategory]);

  // Paginación
  const totalPages = Math.ceil(filteredBusinesses.length / PAGE_SIZE);

  const paginatedBusinesses = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    return filteredBusinesses.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredBusinesses, currentPage]);

  // Volver a la página 1 cuando cambie la búsqueda o categoría
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  function openBusiness(business: Business) {
    router.push({
      pathname: "/business/[id]",
      params: { id: business.id },
    });
  }

  function clearFilters() {
    setSearch("");
    setSelectedCategory("all");
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.brand, { color: theme.text }]}>
              Identidad<Text style={{ color: theme.tint }}>PEM</Text>
            </Text>
            <Text style={[styles.headerLocation, { color: theme.description }]}>
              Puerto Maldonado, Madre de Dios
            </Text>
          </View>

          <View
            style={[styles.locationBadge, { backgroundColor: theme.surface }]}
          >
            <Text style={styles.locationBadgeEmoji}>📍</Text>
            <Text style={[styles.locationBadgeText, { color: theme.tint }]}>
              PEM
            </Text>
          </View>
        </View>

        {/* Portada y buscador */}
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>DESCUBRE LO NUESTRO</Text>

          <Text style={styles.heroTitle}>
            Encuentra lo que{"\n"}buscas, cerca de ti.
          </Text>

          <Text style={styles.heroDescription}>
            Explora negocios, servicios y experiencias de Puerto Maldonado.
          </Text>

          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                borderWidth: 1,
              },
            ]}
          >
            <Text style={[styles.searchIcon, { color: theme.tint }]}>⌕</Text>

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Nombre, categoría o servicio..."
              placeholderTextColor="#8A938A"
              style={[styles.searchInput, { color: theme.text }]}
              returnKeyType="search"
              accessibilityLabel="Buscar negocios"
            />

            {search.length > 0 && (
              <Pressable
                onPress={() => setSearch("")}
                style={styles.clearSearch}
                accessibilityRole="button"
                accessibilityLabel="Limpiar búsqueda"
              >
                <Text style={styles.clearSearchText}>✕</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Categorías */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeading}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Explora por categoría
            </Text>

            <Text
              style={[styles.sectionSubtitle, { color: theme.description }]}
            >
              Encuentra justo lo que necesitas
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map((item) => {
            const active = selectedCategory === item.id;

            return (
              <Pressable
                key={item.id}
                onPress={() => setSelectedCategory(item.id)}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor: active ? theme.tint : theme.card,
                    borderColor: active ? theme.tint : theme.border,
                  },
                ]}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <Text style={styles.categoryEmoji}>{item.emoji}</Text>
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color: active ? theme.buttonText : theme.text,
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Resultados */}
        {/* Resultados */}
        <View style={styles.resultsHeader}>
          <View style={styles.sectionHeading}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Directorio de negocios
            </Text>

            <Text
              style={[styles.sectionSubtitle, { color: theme.description }]}
            >
              {loading
                ? "Cargando negocios..."
                : loadError
                  ? "No se pudieron cargar los negocios"
                  : `${filteredBusinesses.length} ${
                      filteredBusinesses.length === 1
                        ? "resultado encontrado"
                        : "resultados encontrados"
                    }`}
            </Text>
          </View>

          {!loading &&
            !loadError &&
            (search.length > 0 || selectedCategory !== "all") && (
              <Pressable onPress={clearFilters} accessibilityRole="button">
                <Text style={styles.resetText}>Limpiar filtros</Text>
              </Pressable>
            )}
        </View>

        {/* Tarjetas */}

        {loading ? (
          <View
            style={[
              styles.emptyState,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Text style={styles.emptyEmoji}>⏳</Text>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              Cargando negocios
            </Text>
            <Text
              style={[styles.emptyDescription, { color: theme.description }]}
            >
              Estamos buscando los negocios publicados.
            </Text>
          </View>
        ) : loadError ? (
          <View
            style={[
              styles.emptyState,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Text style={styles.emptyEmoji}>⚠️</Text>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No pudimos conectar
            </Text>
            <Text
              style={[styles.emptyDescription, { color: theme.description }]}
            >
              Revisa tu conexión e inténtalo nuevamente.
            </Text>

            <Pressable
              onPress={() => setRetryKey((key) => key + 1)}
              style={[styles.emptyButton, { backgroundColor: theme.tint }]}
              accessibilityRole="button"
            >
              <Text
                style={[styles.emptyButtonText, { color: theme.buttonText }]}
              >
                Reintentar
              </Text>
            </Pressable>
          </View>
        ) : filteredBusinesses.length > 0 ? (
          <View style={styles.businessGrid}>
            {paginatedBusinesses.map((business) => {
              const favorite = isFavorite(business.id);

              return (
                <View
                  key={business.id}
                  style={[
                    styles.businessCard,
                    {
                      width: cardWidth as `${number}%`,
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Pressable
                    onPress={() => openBusiness(business)}
                    style={({ pressed }) =>
                      pressed ? styles.cardPressed : undefined
                    }
                    accessibilityRole="button"
                    accessibilityLabel={`Ver detalles de ${business.name}`}
                  >
                    <View
                      style={[
                        styles.businessImage,
                        {
                          backgroundColor: CATEGORY_COLORS[business.category],
                        },
                      ]}
                    >
                      {business.imageUrl ? (
                        <Image
                          source={{ uri: business.imageUrl }}
                          style={styles.businessPhoto}
                          resizeMode="cover"
                        />
                      ) : (
                        <Text style={styles.businessEmoji}>
                          {business.emoji}
                        </Text>
                      )}
                    </View>

                    <View style={styles.businessInfo}>
                      <Text
                        style={[styles.businessCategory, { color: theme.tint }]}
                      >
                        {business.categoryLabel.toUpperCase()}
                      </Text>

                      <Text
                        style={[styles.businessName, { color: theme.text }]}
                        numberOfLines={1}
                      >
                        {business.name}
                      </Text>

                      <Text
                        style={[
                          styles.businessDescription,
                          { color: theme.description },
                        ]}
                        numberOfLines={2}
                      >
                        {business.description}
                      </Text>

                      <View style={styles.cardFooter}>
                        <Text
                          style={[
                            styles.businessLocation,
                            { color: theme.description },
                          ]}
                          numberOfLines={1}
                        >
                          📍 {business.location}
                        </Text>

                        <Text style={[styles.cardArrow, { color: theme.tint }]}>
                          ↗
                        </Text>
                      </View>
                    </View>
                  </Pressable>

                  <Pressable
                    onPress={() => toggleFavorite(business.id)}
                    style={[
                      styles.favoriteButton,
                      { borderTopColor: theme.border },
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={
                      favorite
                        ? `Quitar ${business.name} de favoritos`
                        : `Guardar ${business.name} en favoritos`
                    }
                  >
                    <Text
                      style={[
                        styles.favoriteText,
                        { color: favorite ? theme.tint : theme.description },
                      ]}
                    >
                      {favorite ? "♥ Guardado" : "♡ Guardar"}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        ) : (
          <View
            style={[
              styles.emptyState,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Text style={styles.emptyEmoji}>🔎</Text>

            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No encontramos resultados
            </Text>

            <Text
              style={[styles.emptyDescription, { color: theme.description }]}
            >
              Prueba con otro nombre o selecciona una categoría diferente.
            </Text>

            <Pressable
              onPress={clearFilters}
              style={[styles.emptyButton, { backgroundColor: theme.tint }]}
              accessibilityRole="button"
            >
              <Text
                style={[styles.emptyButtonText, { color: theme.buttonText }]}
              >
                Ver todos los negocios
              </Text>
            </Pressable>
          </View>
        )}

        {/* Paginación */}
        {!loading && !loadError && totalPages > 1 && (
          <View style={styles.pagination}>
            <Pressable
              onPress={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              style={[
                styles.pageButton,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  opacity: currentPage === 1 ? 0.5 : 1,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Página anterior"
            >
              <Text style={[styles.pageButtonText, { color: theme.text }]}>
                ‹
              </Text>
            </Pressable>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.pageNumbers}
            >
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <Pressable
                    key={page}
                    onPress={() => setCurrentPage(page)}
                    style={[
                      styles.pageButton,
                      {
                        backgroundColor:
                          currentPage === page ? theme.tint : theme.card,
                        borderColor:
                          currentPage === page ? theme.tint : theme.border,
                      },
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: currentPage === page }}
                    accessibilityLabel={`Página ${page}`}
                  >
                    <Text
                      style={[
                        styles.pageButtonText,
                        {
                          color:
                            currentPage === page
                              ? theme.buttonText
                              : theme.text,
                        },
                      ]}
                    >
                      {page}
                    </Text>
                  </Pressable>
                ),
              )}
            </ScrollView>

            <Pressable
              onPress={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages}
              style={[
                styles.pageButton,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  opacity: currentPage === totalPages ? 0.5 : 1,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Página siguiente"
            >
              <Text style={[styles.pageButtonText, { color: theme.text }]}>
                ›
              </Text>
            </Pressable>
          </View>
        )}

        {/* Invitación a descubrir */}
        <View style={styles.exploreBanner}>
          <Text style={styles.exploreBannerEmoji}>🌿</Text>
          <Text style={styles.exploreBannerTitle}>Descubre lo nuestro</Text>
          <Text style={styles.exploreBannerDescription}>
            Guarda tus negocios favoritos y vuelve a encontrarlos cuando los
            necesites.
          </Text>
        </View>

        {/* Pie */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>IDENTIDADPEM</Text>
          <Text style={styles.footerText}>
            Conectando Puerto Maldonado con lo nuestro.
          </Text>
          <Text style={styles.footerCopyright}>
            © IdentidadPEM · Puerto Maldonado
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
