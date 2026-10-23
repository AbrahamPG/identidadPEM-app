import { styles } from "@/src/styles/identidadPEM/home.styles";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
  type ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Business, type BusinessCategory } from "@/constants/businesses";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { getPublicBusinesses } from "@/src/services/api/public-businesses.api";

const HERO_IMAGE = require("../../../assets/images/hero/portadaPEM.webp");
const BRAND_LEAF = require("../../../assets/images/favicon.png");
const categories: {
  id: BusinessCategory;
  label: string;
  image: ImageSourcePropType;
}[] = [
  {
    id: "food",
    label: "Comida",
    image: require("../../../assets/images/categories/comida.webp"),
  },
  {
    id: "hotel",
    label: "Hospedaje",
    image: require("../../../assets/images/categories/hospedaje.webp"),
  },
  {
    id: "tourism",
    label: "Turismo",
    image: require("../../../assets/images/categories/turismo.webp"),
  },
  {
    id: "services",
    label: "Servicios",
    image: require("../../../assets/images/categories/servicios.webp"),
  },
];

const CATEGORY_COLORS: Record<BusinessCategory, string> = {
  food: "#FCE7D4",
  hotel: "#DDEBDD",
  tourism: "#D8EBDD",
  services: "#DDE8F5",
};

export default function HomeScreen() {
  const { isFavorite, toggleFavorite } = useFavorites();

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loadingBusinesses, setLoadingBusinesses] = useState(true);
  const [businessesError, setBusinessesError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadBusinesses() {
      try {
        setLoadingBusinesses(true);
        setBusinessesError(null);

        const result = await getPublicBusinesses();

        if (active) {
          setBusinesses(result);
        }
      } catch (error) {
        if (active) {
          setBusinessesError(
            error instanceof Error
              ? error.message
              : "No se pudieron cargar los negocios.",
          );
        }
      } finally {
        if (active) {
          setLoadingBusinesses(false);
        }
      }
    }

    void loadBusinesses();

    return () => {
      active = false;
    };
  }, []);

  function openBusiness(businessId: string) {
    router.push({
      pathname: "/business/[id]",
      params: { id: businessId },
    });
  }

  function exploreCategory(category: BusinessCategory) {
    router.push({
      pathname: "/identidadPEM/(tabs)/two",
      params: { category },
    });
  }

  function exploreAll() {
    router.push("/identidadPEM/(tabs)/two");
  }
  const { isDark: darkMode, toggleTheme } = useAppTheme();
  const theme = darkMode
    ? {
        background: "#10271C",
        surface: "#193B29",
        card: "#1C3327",
        text: "#F1F5EC",
        muted: "#B0BDB1",
        border: "#304638",
        accent: "#B7F34A",
        accentSoft: "#29472F",
      }
    : {
        background: "#F8F8F1",
        surface: "#FFFFFF",
        card: "#FFFFFF",
        text: "#193B29",
        muted: "#7B8279",
        border: "#E7E9E0",
        accent: "#23663D",
        accentSoft: "#E8F1E4",
      };
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabecera */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>
              Identidad<Text style={styles.brandAccent}>PEM</Text>
            </Text>

            <Text style={styles.location}>
              📍 Puerto Maldonado, Madre de Dios
            </Text>
          </View>

          <Pressable
            onPress={toggleTheme}
            style={[
              styles.headerBadge,
              darkMode && { backgroundColor: "#193B29" },
            ]}
            accessibilityRole="button"
            accessibilityLabel={
              darkMode ? "Activar modo claro" : "Activar modo oscuro"
            }
          >
            <Image
              source={BRAND_LEAF}
              style={[styles.brandLeaf, darkMode && { tintColor: "#B7F34A" }]}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        {/* Portada */}
        <ImageBackground
          source={HERO_IMAGE}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          {/* Filtro oscuro para mantener el texto legible */}
          <View style={styles.heroOverlay} />

          <Text style={styles.heroEyebrow}>DESCUBRE LO NUESTRO</Text>

          <Text style={styles.heroTitle}>
            Tu ciudad tiene{"\n"}mucho por descubrir.
          </Text>

          <Text style={styles.heroDescription}>
            Encuentra negocios, servicios y experiencias de nuestra querida
            Puerto Maldonado.
          </Text>

          <Pressable
            onPress={exploreAll}
            style={({ pressed }) => [
              styles.searchButton,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
          >
            <Text style={styles.searchIcon}>⌕</Text>
            <Text style={styles.searchPlaceholder}>¿Qué estás buscando?</Text>
            <Text style={[styles.searchArrow, { color: theme.accent }]}>→</Text>
          </Pressable>
        </ImageBackground>
        {/* Categorías */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeading}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Explora por categoría
            </Text>
            <Text style={[styles.sectionSubtitle, { color: theme.muted }]}>
              Encuentra lo que necesitas
            </Text>
          </View>

          <Pressable onPress={exploreAll} accessibilityRole="button">
            <Text style={[styles.seeAll, { color: theme.accent }]}>
              Ver todas →
            </Text>
          </Pressable>
        </View>
        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <Pressable
              key={category.id}
              onPress={() => exploreCategory(category.id)}
              style={({ pressed }) => [
                styles.categoryCard,
                {
                  backgroundColor: theme.card,
                },
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Explorar ${category.label}`}
            >
              <Image
                source={category.image}
                style={styles.categoryImage}
                resizeMode="cover"
                accessibilityIgnoresInvertColors
              />

              <Text style={[styles.categoryLabel, { color: theme.text }]}>
                {category.label}
              </Text>

              <Text style={[styles.categoryArrow, { color: theme.accent }]}>
                ↗
              </Text>
            </Pressable>
          ))}
        </View>
        {/* Destacados */}
        <View style={[styles.sectionHeader, styles.featuredHeader]}>
          <View style={styles.sectionHeading}>
            <Text style={[styles.sectionSubtitle, { color: theme.muted }]}>
              Negocios de tu ciudad
            </Text>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Descubre lo nuestro
            </Text>
          </View>

          <Pressable onPress={exploreAll} accessibilityRole="button">
            <Text style={[styles.seeAll, { color: theme.accent }]}>
              Ver todos →
            </Text>
          </Pressable>
        </View>

        {loadingBusinesses ? (
          <View
            style={[
              styles.noFeatured,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={[styles.noFeaturedText, { color: theme.muted }]}>
              Cargando negocios...
            </Text>
          </View>
        ) : businessesError ? (
          <View
            style={[
              styles.noFeatured,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={[styles.noFeaturedTitle, { color: theme.text }]}>
              No pudimos cargar los negocios
            </Text>
            <Text style={[styles.noFeaturedText, { color: theme.muted }]}>
              {businessesError}
            </Text>
          </View>
        ) : businesses.length > 0 ? (
          <View style={styles.featuredList}>
            {businesses.map((business) => {
              const favorite = isFavorite(business.id);

              return (
                <View
                  key={business.id}
                  style={[
                    styles.businessCard,
                    {
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Pressable
                    onPress={() => openBusiness(business.id)}
                    style={({ pressed }) => [
                      styles.businessMain,
                      pressed && styles.pressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`Ver ${business.name}`}
                  >
                    <View
                      style={[
                        styles.businessArtwork,
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
                      <Text style={styles.businessCategory}>
                        {business.categoryLabel.toUpperCase()}
                      </Text>

                      <Text
                        style={[styles.businessName, { color: theme.text }]}
                        numberOfLines={2}
                      >
                        {business.name}
                      </Text>

                      <Text
                        style={[
                          styles.businessDescription,
                          { color: theme.muted },
                        ]}
                        numberOfLines={2}
                      >
                        {business.description}
                      </Text>

                      <Text
                        style={[
                          styles.businessLocation,
                          { color: theme.muted },
                        ]}
                      >
                        📍 {business.location}
                      </Text>
                    </View>

                    <Text style={styles.businessArrow}>›</Text>
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
                    <Text style={[styles.favoriteText, { color: theme.muted }]}>
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
              styles.noFeatured,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={[styles.noFeaturedTitle, { color: theme.text }]}>
              Aún no hay negocios publicados
            </Text>
            <Text style={[styles.noFeaturedText, { color: theme.muted }]}>
              Vuelve pronto para descubrir los negocios de tu ciudad.
            </Text>
          </View>
        )}

        {/* Acceso al directorio completo */}
        <View
          style={[styles.exploreBanner, { backgroundColor: theme.accentSoft }]}
        >
          <Text style={styles.exploreBannerEmoji}>🔎</Text>
          <Text style={[styles.exploreBannerTitle, { color: theme.muted }]}>
            ¿Buscas algo específico?
          </Text>
          <Text style={styles.exploreBannerDescription}>
            Explora el directorio y encuentra más opciones para ti.
          </Text>

          <Pressable
            onPress={exploreAll}
            style={({ pressed }) => [
              styles.exploreButton,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.exploreButtonText,
                { color: darkMode ? theme.text : "#193B29" },
              ]}
            >
              Explorar todos los negocios →
            </Text>
          </Pressable>
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
