import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getWorkspaceDestination } from "@/src/lib/negocios-workspace";
import { authClient } from "@/src/services/auth/auth-client";
import { styles } from "@/src/styles/negocios/role-workspace.styles";
import type { BusinessRole } from "@/src/types/negocios-access";

type Props = {
  requiredRole: BusinessRole;
  title: string;
  description: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  firstCardTitle: string;
  firstCardDescription: string;
  secondCardTitle: string;
  secondCardDescription: string;
};

function mapAuthRole(role: string): BusinessRole | null {
  switch (role.toLowerCase()) {
    case "owner":
      return "OWNER";
    case "admin":
      return "ADMIN";
    default:
      return null;
  }
}

export default function RoleWorkspaceScreen({
  requiredRole,
  title,
  description,
  icon,
  firstCardTitle,
  firstCardDescription,
  secondCardTitle,
  secondCardDescription,
}: Props) {
  const { data: activeOrganization, isPending: isOrganizationPending } =
    authClient.useActiveOrganization();

  const [activeRole, setActiveRole] = useState<BusinessRole | null>(null);
  const [memberRoleLabel, setMemberRoleLabel] = useState("No verificado");
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadActiveRole() {
      if (!activeOrganization) {
        setActiveRole(null);
        setMemberRoleLabel("Sin organización activa");
        setIsRoleLoading(false);
        return;
      }

      setIsRoleLoading(true);

      try {
        const result = await authClient.organization.getActiveMemberRole();

        if (cancelled) return;

        if (result.error) {
          throw new Error(
            result.error.message || "No se pudo consultar el rol.",
          );
        }

        const role = result.data?.role;

        setMemberRoleLabel(role ?? "Desconocido");
        setActiveRole(role ? mapAuthRole(role) : null);
      } catch (error) {
        if (cancelled) return;

        console.error("Error consultando el rol:", error);
        setMemberRoleLabel("No verificado");
        setActiveRole(null);
      } finally {
        if (!cancelled) {
          setIsRoleLoading(false);
        }
      }
    }

    if (!isOrganizationPending) {
      void loadActiveRole();
    }

    return () => {
      cancelled = true;
    };
  }, [activeOrganization?.id, isOrganizationPending]);

  useEffect(() => {
    if (
      isOrganizationPending ||
      isRoleLoading ||
      !activeOrganization ||
      !activeRole ||
      activeRole === requiredRole
    ) {
      return;
    }

    router.replace(getWorkspaceDestination(activeRole));
  }, [
    activeOrganization,
    activeRole,
    isOrganizationPending,
    isRoleLoading,
    requiredRole,
  ]);

  useEffect(() => {
    if (!isOrganizationPending && !activeOrganization) {
      router.replace("/negocios/organizaciones");
    }
  }, [activeOrganization, isOrganizationPending]);

  if (
    isOrganizationPending ||
    isRoleLoading ||
    !activeOrganization ||
    (activeRole !== null && activeRole !== requiredRole)
  ) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.eyebrow}>NEGOCIOSPEM</Text>
            <Text style={styles.organization}>{activeOrganization.name}</Text>
          </View>

          <Pressable
            style={styles.changeButton}
            onPress={() => router.replace("/negocios/organizaciones")}
          >
            <Text style={styles.changeButtonText}>Cambiar negocio</Text>
          </Pressable>
        </View>

        {activeRole === null ? (
          <>
            <View style={styles.iconContainer}>
              <Ionicons name="shield-outline" size={34} color="#245536" />
            </View>

            <Text style={styles.title}>Tu rol operativo está pendiente</Text>

            <Text style={styles.description}>
              Tu organización está activa, pero todavía no hemos configurado la
              correspondencia entre tu rol de POSbro y los permisos de
              IdentidadPEM.
            </Text>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Rol reportado por POSbro</Text>
              <Text style={styles.infoDescription}>{memberRoleLabel}</Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.iconContainer}>
              <Ionicons name={icon} size={34} color="#245536" />
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>{firstCardTitle}</Text>
              <Text style={styles.infoDescription}>{firstCardDescription}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>{secondCardTitle}</Text>
              <Text style={styles.infoDescription}>
                {secondCardDescription}
              </Text>
            </View>

            <Text style={styles.demoText}>
              Vista de demostración. Las operaciones reales se conectarán al
              backend más adelante.
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
