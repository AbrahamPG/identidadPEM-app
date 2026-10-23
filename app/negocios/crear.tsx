import { styles } from "@/src/styles/negocios/crear.styles";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CrearNegocioScreen() {
  const [name, setName] = useState("");
  const [type, setType] = useState("Restaurante");

  function handleCreate() {
    if (!name.trim()) {
      Alert.alert("Falta el nombre", "Escribe el nombre de tu negocio.");
      return;
    }

    router.replace({
      pathname: "/negocios/configurar",
      params: {
        name: name.trim(),
        type,
      },
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Volver</Text>
        </Pressable>

        <Text style={styles.eyebrow}>NUEVO ESPACIO</Text>
        <Text style={styles.title}>Crea tu negocio</Text>
        <Text style={styles.description}>
          Configura los datos iniciales. Después podrás preparar su catálogo y
          sus herramientas.
        </Text>

        <Text style={styles.label}>Nombre del negocio</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Ej. Pollería El Buen Sabor"
          style={styles.input}
          maxLength={100}
        />

        <Text style={styles.label}>Tipo de negocio</Text>
        {["Restaurante", "Hotel", "Salón de belleza", "Otro"].map((option) => (
          <Pressable
            key={option}
            onPress={() => setType(option)}
            style={[styles.option, type === option && styles.optionSelected]}
          >
            <Text
              style={[
                styles.optionText,
                type === option && styles.optionTextSelected,
              ]}
            >
              {type === option ? "● " : "○ "}
              {option}
            </Text>
          </Pressable>
        ))}

        <Pressable style={styles.primaryButton} onPress={handleCreate}>
          <Text style={styles.primaryButtonText}>Continuar</Text>
        </Pressable>

        <Text style={styles.notice}>
          Modo demo: aún no se guardan datos en el servidor.
        </Text>
      </View>
    </SafeAreaView>
  );
}
