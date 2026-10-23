import { Link, Stack } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "¡Oops!", headerShown: false }} />

      <View style={styles.container}>
        <View style={styles.illustration}>
          <Text style={styles.leaf}>🌿</Text>
          <Text style={styles.monkey}>🙈</Text>
          <Text style={styles.leaf}>🌴</Text>
        </View>

        <Text style={styles.errorCode}>ERROR 404</Text>

        <Text style={styles.title}>¡Oops! Te perdiste en la selva</Text>

        <Text style={styles.description}>
          Parece que este camino no lleva a ningún negocio. ¡No te preocupes!
          Volvamos a explorar Puerto Maldonado.
        </Text>

        <Link href="/" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>🏠 Volver al inicio</Text>
          </Pressable>
        </Link>

        <Text style={styles.footer}>IdentidadPEM · Descubre lo nuestro 🌿</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 40,
  },
  illustration: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    gap: 12,
  },
  monkey: {
    fontSize: 100,
  },
  leaf: {
    fontSize: 38,
  },
  errorCode: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 3,
    color: "#27835B",
    marginBottom: 12,
  },
  title: {
    fontSize: 27,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 35,
    marginBottom: 14,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    opacity: 0.75,
    maxWidth: 340,
  },
  button: {
    marginTop: 28,
    backgroundColor: "#237A50",
    paddingVertical: 15,
    paddingHorizontal: 26,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  footer: {
    marginTop: 34,
    fontSize: 12,
    opacity: 0.6,
    textAlign: "center",
  },
});
