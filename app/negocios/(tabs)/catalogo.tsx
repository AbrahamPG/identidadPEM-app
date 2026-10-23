import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Accordion,
  type CatalogSectionId,
} from "@/components/negocios/catalogo/Accordion";
import { BusinessSelector } from "@/components/negocios/catalogo/BusinessSelector";
import { BusinessSettingsSections } from "@/components/negocios/catalogo/BusinessSettingsSections";
import { ProductManager } from "@/components/negocios/catalogo/ProductManager";
import { usePlan } from "@/contexts/plan-context";
import { useProducts } from "@/contexts/products-context";
import { getBusinessProfileLimits } from "@/src/services/api/business-profile.api";
import { authClient } from "@/src/services/auth/auth-client";
import { ui } from "@/src/styles/negocios/(tabs)/catalog-managments.styles";
import { styles } from "@/src/styles/negocios/(tabs)/catalog.styles";
import { useEffect } from "react";

export default function CatalogoScreen() {
  const { products } = useProducts();
  const { isPro, activateProDemo } = usePlan();
  const [maxPhotos, setMaxPhotos] = useState(5);
  const { data: activeOrganization, isPending: isOrganizationPending } =
    authClient.useActiveOrganization();
  const [expandedSection, setExpandedSection] =
    useState<CatalogSectionId | null>("products");
  const [isCatalogMutationBusy, setIsCatalogMutationBusy] = useState(false);

  const organizationId = activeOrganization?.id;
  const businessProducts = products.filter(
    (product) => product.organizationId === organizationId,
  );
  const availableProducts = businessProducts.filter(
    (product) => product.isActive,
  ).length;

  function toggleSection(section: CatalogSectionId) {
    setExpandedSection((current) => (current === section ? null : section));
  }

  useEffect(() => {
    let cancelled = false;

    async function loadLimits() {
      if (!organizationId) {
        setMaxPhotos(5);
        return;
      }

      try {
        const limits = await getBusinessProfileLimits();

        if (!cancelled) {
          setMaxPhotos(limits.maxPhotos);
        }
      } catch (error) {
        console.error("[CATALOGO] Error al cargar límites de fotos:", error);
      }
    }

    void loadLimits();

    return () => {
      cancelled = true;
    };
  }, [organizationId]);

  useEffect(() => {
    console.log(
      "[CATALOGO] Organización activa:",
      activeOrganization?.id,
      activeOrganization?.name,
    );
  }, [activeOrganization?.id, activeOrganization?.name]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={[styles.content, ui.pageContent]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>NEGOCIOSPEM</Text>
          <Text style={styles.title}>Administra tu negocio</Text>
          <Text style={styles.description}>
            Selecciona una organización y administra las categorías y productos
            de su catálogo.
          </Text>
        </View>

        <BusinessSelector
          activeOrganization={activeOrganization}
          isOrganizationPending={isOrganizationPending}
          disabled={isCatalogMutationBusy}
        />

        <View style={styles.summary}>
          <View>
            <Text style={styles.summaryLabel}>Productos en catálogo</Text>
            <Text style={styles.summaryNumber}>{businessProducts.length}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View>
            <Text style={styles.summaryLabel}>Disponibles</Text>
            <Text style={styles.summaryNumber}>{availableProducts}</Text>
          </View>
        </View>

        <Text style={ui.sectionHeading}>CONFIGURACIÓN DEL NEGOCIO</Text>

        <Accordion
          title="Productos y catálogo"
          subtitle="Gestiona categorías y productos del negocio activo"
          icon="📦"
          expanded={expandedSection === "products"}
          onPress={() => toggleSection("products")}
        >
          <ProductManager
            organizationId={organizationId}
            onMutationStateChange={setIsCatalogMutationBusy}
          />
        </Accordion>

        <BusinessSettingsSections
          organizationId={organizationId}
          organizationName={activeOrganization?.name ?? ""}
          maxPhotos={maxPhotos}
          onActivatePro={activateProDemo}
          expandedSection={expandedSection}
          onToggleSection={toggleSection}
        />

        <Text style={styles.footerNote}>
          Categorías y productos se guardan en POSbro. El perfil, las fotos y
          los horarios aún no se persisten.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
