import { styles } from "@/src/styles/negocios/home.styles";
import { router } from "expo-router";

import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NegociosScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
        >
          <Text style={styles.backText}>← Volver</Text>
        </Pressable>

        <View style={styles.hero}>
          <View style={styles.logo}>
            <Text style={styles.logoIcon}>⌂</Text>
          </View>

          <Text style={styles.brand}>NegociosPEM</Text>
          <Text style={styles.tagline}>Tu negocio, más conectado.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Haz crecer tu negocio</Text>

          <Text style={styles.description}>
            Administra tu negocio desde un solo lugar y accede a las
            herramientas que necesitas para crecer.
          </Text>

          <Pressable
            onPress={() => router.push("/negocios/login")}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
          >
            <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/negocios/register")}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
          >
            <Text style={styles.secondaryButtonText}>
              Crear cuenta de negocio
            </Text>
          </Pressable>

          <Text style={styles.helper}>
            ¿Es tu primera vez? Crea tu cuenta para comenzar.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>NEGOCIOSPEM · PUERTO MALDONADO</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
