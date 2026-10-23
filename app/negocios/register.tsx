import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
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

import { authClient } from "@/src/services/auth/auth-client";
import { styles } from "@/src/styles/negocios/register.styles";

export default function NegociosRegisterScreen() {
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRegister() {
    if (isSubmitting) return;

    const name = ownerName.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!name || !normalizedEmail || !password || !confirmPassword) {
      Alert.alert(
        "Campos incompletos",
        "Completa tu nombre, correo y contraseña.",
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      Alert.alert("Correo inválido", "Ingresa un correo válido.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Contraseña muy corta", "Utiliza al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Las contraseñas no coinciden",
        "Verifica ambas contraseñas.",
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await authClient.signUp.email({
        name,
        email: normalizedEmail,
        password,
      });

      if (result.error) {
        Alert.alert(
          "No se pudo crear la cuenta",
          result.error.message || "Inténtalo nuevamente.",
        );
        return;
      }

      Alert.alert(
        "Cuenta creada",
        "Tu cuenta se creó correctamente. Ahora podrás configurar tu negocio.",
        [
          {
            text: "Continuar",
            onPress: () => router.replace("/negocios/sin-negocio"),
          },
        ],
      );
    } catch (error) {
      console.error("Error registrando usuario:", error);

      Alert.alert(
        "Error de conexión",
        error instanceof Error
          ? error.message
          : "No se pudo conectar con el servidor.",
      );
    } finally {
      setIsSubmitting(false);
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
              disabled={isSubmitting}
            >
              <Text style={styles.backText}>← Volver</Text>
            </Pressable>

            <View style={styles.brand}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>N</Text>
              </View>
              <Text style={styles.brandName}>NegociosPEM</Text>
            </View>

            <Text style={styles.title}>Crea tu cuenta</Text>
            <Text style={styles.subtitle}>
              Regístrate para comenzar a gestionar tu negocio.
            </Text>

            <View style={styles.form}>
              <Text style={styles.label}>Tu nombre</Text>
              <TextInput
                value={ownerName}
                onChangeText={setOwnerName}
                placeholder="Ej. María Pérez"
                placeholderTextColor="#98A197"
                style={styles.input}
                autoCapitalize="words"
                autoComplete="name"
                textContentType="name"
                editable={!isSubmitting}
              />

              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="tu@correo.com"
                placeholderTextColor="#98A197"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                editable={!isSubmitting}
              />

              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Mínimo 8 caracteres"
                  placeholderTextColor="#98A197"
                  style={styles.passwordInput}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="new-password"
                  textContentType="newPassword"
                  editable={!isSubmitting}
                />

                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  style={styles.showButton}
                  disabled={isSubmitting}
                >
                  <Text style={styles.showText}>
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </Text>
                </Pressable>
              </View>

              <Text style={styles.label}>Confirmar contraseña</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Repite tu contraseña"
                placeholderTextColor="#98A197"
                style={styles.input}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="off"
                editable={!isSubmitting}
              />

              <Pressable
                onPress={handleRegister}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && !isSubmitting && styles.pressed,
                ]}
                accessibilityRole="button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.primaryButtonText}>Crear cuenta</Text>
                )}
              </Pressable>

              <View style={styles.loginRow}>
                <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
                <Pressable
                  onPress={() => router.replace("/negocios/login")}
                  accessibilityRole="link"
                  disabled={isSubmitting}
                >
                  <Text style={styles.loginLink}> Inicia sesión</Text>
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
