import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { authClient } from "@/src/services/auth/auth-client";
import { ui } from "@/src/styles/negocios/(tabs)/catalog-managments.styles";

type BusinessOrganization = {
  id: string;
  name: string;
  slug: string;
};

type BusinessSelectorProps = {
  activeOrganization: BusinessOrganization | null | undefined;
  isOrganizationPending: boolean;
  disabled?: boolean;
};

export function BusinessSelector({
  activeOrganization,
  isOrganizationPending,
  disabled = false,
}: BusinessSelectorProps) {
  const [organizations, setOrganizations] = useState<BusinessOrganization[]>(
    [],
  );
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(true);
  const [businessPickerOpen, setBusinessPickerOpen] = useState(false);
  const [selectingOrganizationId, setSelectingOrganizationId] = useState<
    string | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadOrganizations() {
      setIsLoadingOrganizations(true);
      setError(null);

      try {
        const result = await authClient.organization.list();
        if (result.error) {
          throw new Error(
            result.error.message || "No se pudieron cargar los negocios.",
          );
        }

        if (!cancelled) {
          setOrganizations(result.data ?? []);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "No se pudieron cargar los negocios.",
          );
        }
      } finally {
        if (!cancelled) setIsLoadingOrganizations(false);
      }
    }

    void loadOrganizations();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleChangeOrganization(organizationId: string) {
    if (disabled || selectingOrganizationId) return;

    try {
      setSelectingOrganizationId(organizationId);
      setError(null);

      const result = await authClient.organization.setActive({
        organizationId,
      });
      if (result.error) {
        throw new Error(
          result.error.message || "No se pudo cambiar de negocio.",
        );
      }
      setBusinessPickerOpen(false);
    } catch (changeError) {
      setError(
        changeError instanceof Error
          ? changeError.message
          : "No se pudo cambiar de negocio.",
      );
    } finally {
      setSelectingOrganizationId(null);
    }
  }

  const isDisabled =
    disabled ||
    isOrganizationPending ||
    isLoadingOrganizations ||
    selectingOrganizationId !== null;

  return (
    <View style={ui.businessSelector}>
      <Text style={ui.overline}>NEGOCIO ACTUAL</Text>
      <Pressable
        onPress={() => setBusinessPickerOpen((current) => !current)}
        style={ui.selectedBusiness}
        accessibilityRole="button"
        accessibilityState={{ expanded: businessPickerOpen }}
        disabled={isDisabled}
      >
        <View style={ui.businessAvatar}>
          <Text style={{ fontSize: 24 }}>🏪</Text>
        </View>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={ui.businessName}>
            {isOrganizationPending
              ? "Cargando negocio..."
              : (activeOrganization?.name ?? "Selecciona un negocio")}
          </Text>
          <Text style={ui.businessMeta}>
            {activeOrganization
              ? `Organización activa · ${activeOrganization.slug}`
              : "Sin organización activa"}
          </Text>
        </View>
        <Text style={ui.chevron}>{businessPickerOpen ? "⌃" : "⌄"}</Text>
      </Pressable>

      {businessPickerOpen && (
        <View style={ui.businessList}>
          {isLoadingOrganizations ? (
            <ActivityIndicator color="#245536" />
          ) : organizations.length === 0 ? (
            <Text style={ui.demoNote}>
              {error ?? "No se encontraron organizaciones para tu cuenta."}
            </Text>
          ) : (
            organizations.map((organization) => {
              const isSelected = organization.id === activeOrganization?.id;
              const isSelecting = selectingOrganizationId === organization.id;

              return (
                <Pressable
                  key={organization.id}
                  onPress={() => void handleChangeOrganization(organization.id)}
                  disabled={isDisabled}
                  style={[
                    ui.businessOption,
                    isSelected && ui.businessOptionSelected,
                  ]}
                >
                  <Text style={{ fontSize: 21 }}>🏪</Text>
                  <View style={{ flex: 1, gap: 3 }}>
                    <Text style={ui.businessName}>{organization.name}</Text>
                    <Text style={ui.businessMeta}>
                      {isSelected ? "Negocio activo" : organization.slug}
                    </Text>
                  </View>
                  {isSelecting ? (
                    <ActivityIndicator color="#245536" />
                  ) : isSelected ? (
                    <Text style={ui.selectedMark}>✓</Text>
                  ) : null}
                </Pressable>
              );
            })
          )}
          {!!error && organizations.length > 0 && (
            <Text style={ui.demoNote}>{error}</Text>
          )}
        </View>
      )}
    </View>
  );
}
