import { styles } from "@/src/styles/negocios/(tabs)/home.styles";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function QuickAction({
  icon,
  title,
  description,
  onPress,
}: {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}
      accessibilityRole="button"
    >
      <View style={styles.actionIcon}>
        <Text style={styles.actionIconText}>{icon}</Text>
      </View>

      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>

      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

export default function NegociosDashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>ESPACIO DE NEGOCIOS</Text>
              <Text style={styles.brand}>NegociosPEM</Text>
            </View>

            <Pressable
              onPress={() => router.push("/negocios/mas")}
              style={styles.profileButton}
              accessibilityRole="button"
              accessibilityLabel="Abrir más opciones"
            >
              <Text style={styles.profileInitial}>N</Text>
            </Pressable>
          </View>

          <View style={styles.welcome}>
            <Text style={styles.welcomeEyebrow}>TU ESPACIO DE TRABAJO</Text>
            <Text style={styles.welcomeTitle}>¡Hola! 👋</Text>
            <Text style={styles.welcomeDescription}>
              Administra tu negocio y encuentra aquí tus herramientas.
            </Text>
          </View>

          <View style={styles.demoNotice}>
            <View style={styles.demoDot} />
            <Text style={styles.demoText}>
              Vista de demostración · Sin datos reales
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Tu resumen</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>S/</Text>
              </View>
              <Text style={styles.statLabel}>Ventas de hoy</Text>
              <Text style={styles.statValue}>—</Text>
              <Text style={styles.statFootnote}>Aún sin conectar</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>▤</Text>
              </View>
              <Text style={styles.statLabel}>Pedidos activos</Text>
              <Text style={styles.statValue}>—</Text>
              <Text style={styles.statFootnote}>Aún sin conectar</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Accesos rápidos</Text>

          <View style={styles.actions}>
            <QuickAction
              icon="▦"
              title="Mi catálogo"
              description="Gestiona productos y servicios"
              onPress={() => router.push("/negocios/catalogo")}
            />

            <QuickAction
              icon="⚙"
              title="Configuración"
              description="Opciones de tu espacio de negocio"
              onPress={() => router.push("/negocios/mas")}
            />
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>✦</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Tu negocio empieza aquí</Text>
              <Text style={styles.tipDescription}>
                El siguiente paso será configurar tu negocio y habilitar las
                herramientas que necesitas.
              </Text>
            </View>
          </View>

          <Text style={styles.footer}>NEGOCIOSPEM · PUERTO MALDONADO</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
