import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MenuOptionProps = {
  emoji: string;
  title: string;
  description: string;
  onPress: () => void;
};

function MenuOption({ emoji, title, description, onPress }: MenuOptionProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <View style={styles.iconBox}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>

      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

export default function MasScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Más opciones</Text>
        <Text style={styles.subtitle}>
          Administra tu negocio y su presencia en IdentidadPEM.
        </Text>

        <Text style={styles.sectionTitle}>MI NEGOCIO</Text>

        <Pressable
          style={styles.currentBusiness}
          onPress={() => router.push("/negocios/organizaciones")}
          accessibilityRole="button"
        >
          <View style={styles.businessIcon}>
            <Text style={styles.emoji}>🏪</Text>
          </View>

          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Negocio actual</Text>
            <Text style={styles.optionDescription}>
              Cambiar de negocio u organización
            </Text>
          </View>

          <Text style={styles.arrow}>⌄</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>ADMINISTRACIÓN</Text>

        {/* <MenuOption
          emoji="📝"
          title="Información del negocio"
          description="Descripción, dirección y WhatsApp"
          onPress={() => router.push("/negocios/informacion")}
        /> */}

        <MenuOption
          emoji="📸"
          title="Fotos del negocio"
          description="Selecciona y ordena hasta 5 fotos"
          onPress={() => router.push("/negocios/fotos")}
        />

        <MenuOption
          emoji="👥"
          title="Equipo y permisos"
          description="Próximamente"
          onPress={() => {}}
        />

        <Text style={styles.sectionTitle}>PLANES</Text>

        <View style={styles.proCard}>
          <Text style={styles.proEyebrow}>IDENTIDADPEM PRO</Text>
          <Text style={styles.proTitle}>
            Tu negocio puede llegar más lejos ✨
          </Text>
          <Text style={styles.proDescription}>
            Descubre las funciones adicionales para impulsar tu negocio.
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>S/ 50</Text>
            <Text style={styles.pricePeriod}>/ mes</Text>
          </View>

          <Text style={styles.trial}>15 días de prueba · Sin compromiso</Text>

          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonText}>Próximamente</Text>
          </View>
        </View>

        <Text style={styles.footer}>IdentidadPEM · Puerto Maldonado</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F2",
  },
  content: {
    padding: 20,
    paddingBottom: 32,
    gap: 12,
  },
  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#173B2B",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "#68756A",
    marginBottom: 12,
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 2,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#718073",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EADF",
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  optionPressed: {
    opacity: 0.75,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "#F0F4E9",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 23,
  },
  optionContent: {
    flex: 1,
    gap: 4,
  },
  optionTitle: {
    color: "#173B2B",
    fontSize: 15,
    fontWeight: "700",
  },
  optionDescription: {
    color: "#68756A",
    fontSize: 12,
    lineHeight: 18,
  },
  arrow: {
    color: "#718073",
    fontSize: 25,
  },
  currentBusiness: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF0E3",
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  businessIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  proCard: {
    backgroundColor: "#173B2B",
    borderRadius: 20,
    padding: 20,
    gap: 10,
  },
  proEyebrow: {
    color: "#C8D9A9",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  proTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "800",
  },
  proDescription: {
    color: "#D7E2D7",
    fontSize: 13,
    lineHeight: 20,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 4,
  },
  price: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "800",
  },
  pricePeriod: {
    color: "#D7E2D7",
    fontSize: 13,
    marginLeft: 5,
  },
  trial: {
    color: "#D7E2D7",
    fontSize: 12,
  },
  comingSoon: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginTop: 5,
  },
  comingSoonText: {
    color: "#173B2B",
    fontSize: 12,
    fontWeight: "800",
  },
  footer: {
    textAlign: "center",
    color: "#899389",
    fontSize: 11,
    marginTop: 20,
  },
});
