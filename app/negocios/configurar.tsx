import { styles } from "@/src/styles/negocios/configurar.styles";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfigurarNegocioScreen() {
  const params = useLocalSearchParams<{
    name?: string;
    type?: string;
  }>();

  const name = typeof params.name === "string" ? params.name : "Mi negocio";

  const type = typeof params.type === "string" ? params.type : "Otro";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>NEGOCIOSPEM · CONFIGURACIÓN</Text>

        <View style={styles.hero}>
          <Text style={styles.heroIcon}>🎉</Text>
          <Text style={styles.title}>¡Vamos a preparar tu negocio!</Text>
          <Text style={styles.description}>
            Estos son los datos que elegiste. Más adelante podrás completar el
            perfil público y configurar tus productos o servicios.
          </Text>
        </View>

        <View style={styles.businessCard}>
          <Text style={styles.label}>NOMBRE DEL NEGOCIO</Text>
          <Text style={styles.businessName}>{name}</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>TIPO DE NEGOCIO</Text>
          <Text style={styles.businessType}>{type}</Text>
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>Tu siguiente paso</Text>
          <Text style={styles.noticeDescription}>
            Puedes comenzar preparando tu catálogo. Después trabajaremos en tu
            perfil público, fotos y datos de contacto.
          </Text>
        </View>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.replace("/negocios/catalogo")}
          accessibilityRole="button"
        >
          <Text style={styles.primaryButtonText}>Continuar al catálogo →</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.back()}
          accessibilityRole="button"
        >
          <Text style={styles.secondaryButtonText}>
            Volver y editar los datos
          </Text>
        </Pressable>

        <Text style={styles.footer}>
          MODO DEMO · LOS DATOS AÚN NO SE GUARDAN
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
