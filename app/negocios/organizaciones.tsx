import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { authClient } from "@/src/services/auth/auth-client";
import { styles } from "@/src/styles/negocios/organizaciones.styles";

type Organization = {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
};

export default function OrganizacionesScreen() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectingId, setSelectingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadOrganizations() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const result = await authClient.organization.list();

        if (result.error) {
          throw new Error(
            result.error.message || "No se pudieron cargar las organizaciones.",
          );
        }

        if (isMounted) {
          setOrganizations(result.data ?? []);
        }
      } catch (error) {
        console.error("Error cargando organizaciones:", error);

        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Ocurrió un error al cargar las organizaciones.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadOrganizations();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSelect(organization: Organization) {
    try {
      setSelectingId(organization.id);

      const activation = await authClient.organization.setActive({
        organizationId: organization.id,
      });

      if (activation.error) {
        throw new Error(
          activation.error.message || "No se pudo activar el negocio.",
        );
      }

      const memberResult = await authClient.organization.getActiveMemberRole();

      if (memberResult.error) {
        throw new Error(
          memberResult.error.message ||
            "No se pudo verificar tu rol en este negocio.",
        );
      }

      const role = memberResult.data?.role;

      if (role === "owner" || role === "admin") {
        router.replace("/negocios/(tabs)/catalogo");
        return;
      }

      Alert.alert(
        "Rol pendiente de configurar",
        `Tu organización "${organization.name}" está activa, pero el rol "${role ?? "desconocido"}" todavía no tiene una pantalla asignada en IdentidadPEM.`,
      );
    } catch (error) {
      console.error("Error seleccionando organización:", error);

      Alert.alert(
        "No se pudo entrar al negocio",
        error instanceof Error ? error.message : "Ocurrió un error inesperado.",
      );
    } finally {
      setSelectingId(null);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>NEGOCIOSPEM</Text>
        <Text style={styles.title}>Tus espacios de trabajo</Text>
        <Text style={styles.description}>
          Elige el negocio al que quieres acceder. Tus organizaciones se cargan
          desde tu cuenta.
        </Text>

        {isLoading && (
          <View style={styles.card}>
            <ActivityIndicator size="large" color="#245536" />
            <Text style={styles.businessType}>
              Cargando tus organizaciones...
            </Text>
          </View>
        )}

        {!isLoading && errorMessage && (
          <View style={styles.card}>
            <Text style={styles.businessName}>
              No pudimos cargar tus negocios
            </Text>
            <Text style={styles.description}>{errorMessage}</Text>

            <Pressable
              style={styles.primaryButton}
              onPress={() => router.replace("/negocios/organizaciones")}
            >
              <Text style={styles.primaryButtonText}>Volver a intentar</Text>
            </Pressable>
          </View>
        )}

        {!isLoading && !errorMessage && organizations.length === 0 && (
          <View style={styles.card}>
            <Ionicons name="storefront-outline" size={32} color="#245536" />
            <Text style={styles.businessName}>
              Aún no perteneces a ningún negocio
            </Text>
            <Text style={styles.description}>
              Cuando crees una organización o aceptes una invitación, aparecerá
              aquí.
            </Text>
          </View>
        )}

        {!isLoading &&
          !errorMessage &&
          organizations.map((organization) => (
            <View key={organization.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="storefront-outline"
                    size={24}
                    color="#245536"
                  />
                </View>

                <View style={styles.businessInfo}>
                  <Text style={styles.businessName}>{organization.name}</Text>
                  <Text style={styles.businessType}>{organization.slug}</Text>
                </View>
              </View>

              <Pressable
                style={styles.primaryButton}
                disabled={selectingId !== null}
                onPress={() => void handleSelect(organization)}
              >
                {selectingId === organization.id ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <>
                    <Text style={styles.primaryButtonText}>
                      Entrar al negocio
                    </Text>
                    <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                  </>
                )}
              </Pressable>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
