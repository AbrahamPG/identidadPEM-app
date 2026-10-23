import { styles } from "@/src/styles/index.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const BRAND_LEAF = require("../assets/images/favicon.png");

export default function EntryScreen() {
  const [loading, setLoading] = useState(false);

  async function openIdentity() {
    if (loading) return;

    setLoading(true);

    try {
      const completed = await AsyncStorage.getItem(
        "@identidadpem/onboarding-completed",
      );

      router.push(
        completed === "true"
          ? "/identidadPEM/(tabs)"
          : "/identidadPEM/onboarding",
      );
    } catch {
      router.push("/identidadPEM/onboarding");
    } finally {
      setLoading(false);
    }
  }

  function openBusinesses() {
    router.push("/negocios");
  }

  function openTransport() {
    router.push("/transporte");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <View style={styles.brandMark}>
                <Image source={BRAND_LEAF} resizeMode="contain" />
              </View>

              <View>
                <Text style={styles.brandName}>IdentidadPEM</Text>
                <Text style={styles.brandLocation}>
                  PUERTO MALDONADO · PERÚ
                </Text>
              </View>
            </View>

            <View style={styles.hero}>
              <Text style={styles.eyebrow}>LO NUESTRO, MÁS CERCA</Text>

              <Text style={styles.heroTitle}>
                Descubre.{"\n"}Conecta. Crece.
              </Text>

              <Text style={styles.heroDescription}>
                Explora nuestra ciudad y conecta con las personas, los negocios
                y las oportunidades que la hacen única.
              </Text>

              <View style={styles.decorCircle} />
            </View>
          </View>

          <View style={styles.experiences}>
            <Text style={styles.sectionTitle}>¿Qué deseas hacer hoy?</Text>

            <Pressable
              onPress={openIdentity}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
            >
              <View style={styles.cardIcon}>
                <Text style={styles.iconText}>⌕</Text>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>IdentidadPEM</Text>
                <Text style={styles.cardDescription}>
                  Descubre negocios, servicios y lugares de nuestra ciudad.
                </Text>
                <Text style={styles.cardAction}>Explorar la ciudad ↗</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={openBusinesses}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
            >
              <View style={styles.cardIcon}>
                <Text style={styles.iconText}>▦</Text>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>NegociosPEM</Text>
                <Text style={styles.cardDescription}>
                  Registra tu negocio, administra tu catálogo y organiza tu
                  operación.
                </Text>
                <Text style={styles.cardAction}>
                  Entrar o crear mi negocio ↗
                </Text>
              </View>
            </Pressable>

            <View style={[styles.card, styles.disabledCard]}>
              <View style={styles.transportIcon}>
                <Text style={styles.iconText}>➤</Text>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.transportTitleRow}>
                  <Text style={styles.cardTitle}>TransportePEM</Text>
                  <Text style={styles.comingSoon}>PRÓXIMAMENTE</Text>
                </View>

                <Text style={styles.cardDescription}>
                  Una nueva forma de conectar con el transporte local.
                </Text>

                <Text style={styles.disabledAction}>
                  En evaluación para Puerto Maldonado
                </Text>
              </View>
            </View>

            {loading && (
              <View style={styles.loadingRow}>
                <ActivityIndicator color="#24583B" />
                <Text style={styles.loadingText}>
                  Preparando IdentidadPEM...
                </Text>
              </View>
            )}
          </View>

          <View style={styles.footer}>
            <View style={styles.footerLine} />
            <Text style={styles.footerText}>
              Hecho para conectar Puerto Maldonado
            </Text>
            <Text style={styles.footerSubtext}>
              Una ciudad, muchas oportunidades.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
