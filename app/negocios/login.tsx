import { authClient } from "@/src/services/auth/auth-client";
import { styles } from "@/src/styles/negocios/login.styles";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NegociosLoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      Alert.alert(
        "Campos incompletos",
        "Ingresa tu correo electrónico y contraseña.",
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      Alert.alert("Correo inválido", "Ingresa un correo electrónico válido.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await authClient.signIn.email({
        email: normalizedEmail,
        password,
      });

      if (result.error) {
        Alert.alert(
          "No se pudo iniciar sesión",
          result.error.message ||
            "Verifica tus credenciales e inténtalo nuevamente.",
        );
        return;
      }

      router.replace("/negocios/organizaciones");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      Alert.alert(
        "Error de conexión",
        "No pudimos comunicarnos con el servidor. Inténtalo nuevamente.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
              accessibilityRole="button"
            >
              <Text style={styles.backText}>← Volver</Text>
            </Pressable>

            <View style={styles.brand}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>N</Text>
              </View>
              <Text style={styles.brandName}>NegociosPEM</Text>
            </View>

            <Text style={styles.title}>Qué bueno verte de nuevo</Text>
            <Text style={styles.subtitle}>
              Ingresa a tu cuenta para administrar tu negocio.
            </Text>

            <View style={styles.form}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="tu@negocio.com"
                placeholderTextColor="#98A197"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
              />

              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Ingresa tu contraseña"
                  placeholderTextColor="#98A197"
                  style={styles.passwordInput}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="current-password"
                  textContentType="password"
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  style={styles.showButton}
                >
                  <Text style={styles.showText}>
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </Text>
                </Pressable>
              </View>

              <Pressable
                onPress={handleLogin}
                disabled={isLoading}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.pressed,
                ]}
                accessibilityRole="button"
              >
                <Text style={styles.primaryButtonText}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Text>
              </Pressable>

              <View style={styles.registerRow}>
                <Text style={styles.registerText}>¿Aún no tienes cuenta?</Text>
                <Pressable
                  onPress={() => router.push("/negocios/register")}
                  accessibilityRole="link"
                >
                  <Text style={styles.registerLink}> Regístrate</Text>
                </Pressable>
              </View>
            </View>

            <Text style={styles.footer}>NEGOCIOSPEM · PUERTO MALDONADO</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
