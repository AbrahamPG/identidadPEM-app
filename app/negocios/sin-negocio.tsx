import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "@/src/styles/negocios/sin-negocio.styles";

export default function SinNegocioScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>NEGOCIOSPEM</Text>
          <Text style={styles.title}>¡Bienvenido! 👋</Text>
          <Text style={styles.description}>
            Crea tu espacio de negocio o revisa si alguien te ha invitado a
            trabajar en un equipo.
          </Text>
        </View>

        <Pressable
          style={styles.primaryCard}
          onPress={() => router.push("/negocios/crear")}
          accessibilityRole="button"
        >
          <Text style={styles.cardIcon}>🏪</Text>
          <Text style={styles.cardTitle}>Tengo un negocio</Text>
          <Text style={styles.cardDescription}>
            Crea tu organización y configura las herramientas para administrar
            tu negocio.
          </Text>
          <Text style={styles.actionText}>Crear negocio →</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryCard}
          onPress={() => router.push("/negocios/invitaciones")}
          accessibilityRole="button"
        >
          <Text style={styles.cardIcon}>✉️</Text>
          <Text style={styles.cardTitle}>Mis invitaciones</Text>
          <Text style={styles.cardDescription}>
            Revisa las invitaciones para unirte a un restaurante, pollería,
            hotel u otro negocio.
          </Text>
          <Text style={styles.actionText}>Ver invitaciones →</Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace("/negocios/login")}
          accessibilityRole="button"
        >
          <Text style={styles.logoutText}>Volver al inicio de sesión</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
