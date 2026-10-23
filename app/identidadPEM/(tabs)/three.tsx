import { styles } from "@/src/styles/identidadPEM/saved.styles";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
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
import { getPublicBusinesses } from "@/src/services/api/public-businesses.api";

export default function SavedScreen() {
  const { favorites, ready, toggleFavorite } = useFavorites();
  const { isDark } = useAppTheme();
  const theme = isDark ? Colors.dark : Colors.light;

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

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

  const savedBusinesses = businesses.filter((business) =>
    favorites.includes(business.id),
  );

  function goToExplore() {
    router.navigate("/identidadPEM/(tabs)/two");
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.eyebrow, { color: theme.tint }]}>
            TU ESPACIO PERSONAL
          </Text>

          <Text style={[styles.title, { color: theme.text }]}>
            Mis guardados
          </Text>

          <Text style={[styles.subtitle, { color: theme.description }]}>
            Los lugares que te gustan, siempre a mano.
          </Text>
        </View>

        {!ready || loading ? (
          <View
            style={[
              styles.emptyState,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <ActivityIndicator size="large" color={theme.tint} />
            <Text
              style={[styles.emptyDescription, { color: theme.description }]}
            >
              Cargando tus favoritos...
            </Text>
          </View>
        ) : loadError ? (
          <View
            style={[
              styles.emptyState,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.emptyEmoji, { color: theme.tint }]}>⚠️</Text>

            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No pudimos cargar tus guardados
            </Text>

            <Text
              style={[styles.emptyDescription, { color: theme.description }]}
            >
              Revisa tu conexión e inténtalo nuevamente.
            </Text>

            <Pressable
              onPress={() => setRetryKey((key) => key + 1)}
              style={[styles.exploreButton, { backgroundColor: theme.tint }]}
              accessibilityRole="button"
            >
              <Text
                style={[styles.exploreButtonText, { color: theme.buttonText }]}
              >
                Reintentar
              </Text>
            </Pressable>
          </View>
        ) : savedBusinesses.length === 0 ? (
          <View
            style={[
              styles.emptyState,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <View
              style={[styles.heartCircle, { backgroundColor: theme.surface }]}
            >
              <Text style={[styles.emptyEmoji, { color: theme.tint }]}>♡</Text>
            </View>

            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              Aún no tienes favoritos
            </Text>

            <Text
              style={[styles.emptyDescription, { color: theme.description }]}
            >
              Explora los negocios de Puerto Maldonado y guarda los que más te
              gusten. Los encontrarás aquí.
            </Text>

            <Pressable
              onPress={goToExplore}
              style={[styles.exploreButton, { backgroundColor: theme.tint }]}
              accessibilityRole="button"
            >
              <Text
                style={[styles.exploreButtonText, { color: theme.buttonText }]}
              >
                Explorar negocios →
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.list}>
            <Text style={[styles.count, { color: theme.description }]}>
              {savedBusinesses.length}{" "}
              {savedBusinesses.length === 1
                ? "negocio guardado"
                : "negocios guardados"}
            </Text>

            {savedBusinesses.map((business) => (
              <View
                key={business.id}
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/business/[id]",
                      params: { id: business.id },
                    })
                  }
                  style={[styles.artwork, { backgroundColor: theme.surface }]}
                  accessibilityRole="button"
                  accessibilityLabel={`Ver ${business.name}`}
                >
                  {business.imageUrl ? (
                    <Image
                      source={{ uri: business.imageUrl }}
                      style={styles.businessPhoto}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={styles.businessEmoji}>{business.emoji}</Text>
                  )}
                </Pressable>

                <View style={styles.businessInfo}>
                  <Text style={[styles.category, { color: theme.tint }]}>
                    {business.categoryLabel.toUpperCase()}
                  </Text>

                  <Text style={[styles.businessName, { color: theme.text }]}>
                    {business.name}
                  </Text>

                  <Text
                    style={[styles.description, { color: theme.description }]}
                  >
                    {business.description}
                  </Text>

                  <Text style={[styles.location, { color: theme.description }]}>
                    📍 {business.location}
                  </Text>

                  <Pressable
                    onPress={() => toggleFavorite(business.id)}
                    accessibilityRole="button"
                    accessibilityLabel={`Quitar ${business.name} de favoritos`}
                    style={[styles.removeButton, { borderColor: theme.border }]}
                  >
                    <Text style={[styles.removeText, { color: theme.tint }]}>
                      ♥ Quitar de guardados
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}

            <Pressable
              onPress={goToExplore}
              style={[
                styles.secondaryButton,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}
              accessibilityRole="button"
            >
              <Text style={[styles.secondaryButtonText, { color: theme.tint }]}>
                Descubrir más negocios →
              </Text>
            </Pressable>
          </View>
        )}

        <Text style={[styles.footer, { color: theme.description }]}>
          IDENTIDADPEM · PUERTO MALDONADO
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
