import { styles } from "@/src/styles/negocios/invitaciones.styles";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InvitacionesScreen() {
  const [code, setCode] = useState("");

  function handleContinue() {
    if (!code.trim()) {
      Alert.alert("Falta el código", "Ingresa el código de invitación.");
      return;
    }

    Alert.alert(
      "Invitaciones en preparación",
      "Todavía no podemos validar códigos. Cuando conectemos el backend, comprobaremos la invitación y el negocio que te la envió.",
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Volver</Text>
        </Pressable>

        <Text style={styles.eyebrow}>ACCESO A UN NEGOCIO</Text>
        <Text style={styles.title}>Mis invitaciones</Text>
        <Text style={styles.description}>
          Si el propietario te invitó a trabajar en su negocio, podrás aceptar
          la invitación y acceder con el rol asignado.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Código de invitación</Text>
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="Ingresa tu código"
            autoCapitalize="characters"
            style={styles.input}
            maxLength={100}
          />

          <Pressable style={styles.primaryButton} onPress={handleContinue}>
            <Text style={styles.primaryButtonText}>Validar invitación</Text>
          </Pressable>
        </View>

        <Text style={styles.emptyTitle}>¿No tienes un código?</Text>
        <Text style={styles.description}>
          Solicita al propietario del negocio que te envíe una invitación. Por
          ahora, esta pantalla es una demostración.
        </Text>
      </View>
    </SafeAreaView>
  );
}
