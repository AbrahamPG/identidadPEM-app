import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  createBusinessProfile,
  getMyBusinessProfile,
  publishBusinessProfile,
  unpublishBusinessProfile,
  updateBusinessProfile,
  type BusinessOpeningHours,
  type SaveBusinessProfile,
} from "@/src/services/api/business-profile.api";
import { ui } from "@/src/styles/negocios/(tabs)/catalog-managments.styles";
import { styles } from "@/src/styles/negocios/(tabs)/catalog.styles";
import { Accordion, type CatalogSectionId } from "./Accordion";

type Props = {
  organizationId?: string;
  organizationName: string;
  maxPhotos: number;
  onActivatePro: () => void;
  expandedSection: CatalogSectionId | null;
  onToggleSection: (section: CatalogSectionId) => void;
};

const DAYS = [
  ["lunes", "Lunes"],
  ["martes", "Martes"],
  ["miercoles", "Miércoles"],
  ["jueves", "Jueves"],
  ["viernes", "Viernes"],
  ["sabado", "Sábado"],
  ["domingo", "Domingo"],
] as const;

const SAMPLE_PHOTOS = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
];

const BUSINESS_TYPES = [
  { value: "restaurante", label: "Restaurante / Pollería", icon: "🍗" },
  { value: "barberia", label: "Barbería / Peluquería", icon: "💈" },
  { value: "hotel", label: "Hotel / Hospedaje", icon: "🏨" },
  { value: "turismo", label: "Turismo", icon: "🌿" },
  { value: "transporte", label: "Transporte", icon: "🚐" },
  { value: "servicios", label: "Servicios", icon: "🛠️" },
] as const;

function getMissingFields(error: unknown): string[] {
  if (typeof error !== "object" || error === null) return [];

  const candidate = error as {
    missingFields?: unknown;
    response?: {
      data?: {
        missingFields?: unknown;
      };
    };
  };

  const fields =
    candidate.missingFields ?? candidate.response?.data?.missingFields;

  return Array.isArray(fields)
    ? fields.filter((field): field is string => typeof field === "string")
    : [];
}

function emptyHours(): BusinessOpeningHours {
  return Object.fromEntries(
    DAYS.map(([day]) => [day, { open: "09:00", close: "21:00" }]),
  );
}

function isNotFound(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return /404|not found|no encontrado|no existe/i.test(message);
}

export function BusinessSettingsSections({
  organizationId,
  organizationName,
  maxPhotos,
  onActivatePro,
  expandedSection,
  onToggleSection,
}: Props) {
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [phone, setPhone] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState(SAMPLE_PHOTOS[0]);
  const [photoLinks, setPhotoLinks] = useState("");
  const [openingHours, setOpeningHours] =
    useState<BusinessOpeningHours>(emptyHours());

  const [profileExists, setProfileExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingInfo, setIsSavingInfo] = useState(false);
  const [isSavingPhotos, setIsSavingPhotos] = useState(false);
  const [isSavingHours, setIsSavingHours] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      setIsLoading(true);
      setError(null);
      setProfileExists(false);

      setDescription("");
      setAddress("");
      setPhone("");

      setOpeningHours(emptyHours());
      if (!organizationId) return;

      setIsLoading(true);
      setError(null);
      setProfileExists(false);

      try {
        const profile = await getMyBusinessProfile();
        if (cancelled) return;

        setBusinessType(profile.businessType ?? "");
        setIsPublished(profile.isPublished);
        setCoverImageUrl(profile.coverImageUrl ?? "");
        setPhotoLinks(profile.photos?.join("\n") ?? "");
        setProfileExists(true);
        setDescription(profile.description ?? "");
        setAddress(profile.address ?? "");
        setPhone(profile.phone ?? "");

        setCoverImageUrl(profile.coverImageUrl ?? SAMPLE_PHOTOS[0]);

        setPhotoLinks(
          profile.photos?.length
            ? profile.photos.join("\n")
            : SAMPLE_PHOTOS.join("\n"),
        );

        setOpeningHours({
          ...emptyHours(),
          ...(profile.openingHours ?? {}),
        });
      } catch (err) {
        if (cancelled) return;

        if (isNotFound(err)) {
          // Aún no existe un perfil para esta organización.
          setProfileExists(false);
          setDescription("");
          setAddress("");
          setPhone("");
          setBusinessType("");
          setIsPublished(false);
          setCoverImageUrl(SAMPLE_PHOTOS[0]);
          setPhotoLinks(SAMPLE_PHOTOS.join("\n"));
          setOpeningHours(emptyHours());
        } else {
          setError(
            err instanceof Error
              ? err.message
              : "No se pudo cargar el perfil del negocio.",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, [organizationId]);

  async function saveProfile(data: SaveBusinessProfile) {
    if (!organizationId) {
      throw new Error("Selecciona una organización primero.");
    }

    const profile = profileExists
      ? await updateBusinessProfile(data)
      : await createBusinessProfile(data);

    setProfileExists(true);
    setBusinessType(profile.businessType ?? "");
    setIsPublished(profile.isPublished);

    return profile;
  }

  async function handleSaveInfo() {
    if (!address.trim()) {
      Alert.alert("Falta la dirección", "Ingresa la dirección del negocio.");
      return;
    }

    setIsSavingInfo(true);
    setError(null);

    try {
      await saveProfile({
        businessType,
        description: description.trim(),
        address: address.trim(),
        phone: phone.trim(),
      });

      Alert.alert("Guardado", "La información del negocio se guardó.");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "No se pudo guardar la información.";
      setError(message);
      Alert.alert("Error al guardar", message);
    } finally {
      setIsSavingInfo(false);
    }
  }

  async function handleSavePhotos() {
    const photos = photoLinks
      .split(/\n/)
      .map((url) => url.trim())
      .filter(Boolean);

    const invalidUrl = [coverImageUrl, ...photos].some((url) => {
      if (!url) return false;
      try {
        const parsed = new URL(url);
        return parsed.protocol !== "https:" && parsed.protocol !== "http:";
      } catch {
        return true;
      }
    });

    if (invalidUrl) {
      Alert.alert(
        "URL no válida",
        "Usa enlaces completos que comiencen con https:// o http://.",
      );
      return;
    }

    setIsSavingPhotos(true);
    setError(null);

    try {
      await saveProfile({
        coverImageUrl: coverImageUrl.trim(),
        photos,
      });

      Alert.alert("Guardado", "Los enlaces de las fotos se guardaron.");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "No se pudieron guardar las fotos.";
      setError(message);
      Alert.alert("Error al guardar", message);
    } finally {
      setIsSavingPhotos(false);
    }
  }

  async function handleSaveHours() {
    for (const [day, label] of DAYS) {
      const { open, close } = openingHours[day] ?? {
        open: "",
        close: "",
      };

      const validTime = (value: string) =>
        /^([01]\d|2[0-3]):[0-5]\d$/.test(value);

      if (!validTime(open) || !validTime(close)) {
        Alert.alert(
          "Horario no válido",
          `Revisa las horas de ${label}. Usa el formato HH:MM.`,
        );
        return;
      }

      if (open >= close) {
        Alert.alert(
          "Revisa el horario",
          `La apertura de ${label} debe ser anterior al cierre.`,
        );
        return;
      }
    }

    setIsSavingHours(true);
    setError(null);

    try {
      await saveProfile({ openingHours });
      Alert.alert("Guardado", "Los horarios de atención se guardaron.");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "No se pudieron guardar los horarios.";
      setError(message);
      Alert.alert("Error al guardar", message);
    } finally {
      setIsSavingHours(false);
    }
  }

  async function handlePublish() {
    if (!organizationId) {
      Alert.alert(
        "Selecciona un negocio",
        "Primero selecciona una organización.",
      );
      return;
    }

    if (!profileExists) {
      Alert.alert(
        "Guarda tu negocio primero",
        "Guarda la información del negocio antes de publicarlo.",
      );
      return;
    }

    setIsPublishing(true);
    setError(null);

    try {
      const result = await publishBusinessProfile();

      setIsPublished(result.profile.isPublished);

      Alert.alert("¡Negocio publicado!", result.message);
    } catch (err) {
      const missingFields = getMissingFields(err);

      if (missingFields.length > 0) {
        Alert.alert(
          "Completa tu ficha",
          `Antes de publicar, completa estos campos:\n\n${missingFields
            .map((field) => `• ${field}`)
            .join("\n")}`,
        );
      } else {
        const message =
          err instanceof Error
            ? err.message
            : "No se pudo publicar el negocio.";

        setError(message);
        Alert.alert("No se pudo publicar", message);
      }
    } finally {
      setIsPublishing(false);
    }
  }

  async function handleUnpublish() {
    setIsPublishing(true);
    setError(null);

    try {
      const result = await unpublishBusinessProfile();

      setIsPublished(result.profile.isPublished);

      Alert.alert("Negocio despublicado", result.message);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "No se pudo despublicar el negocio.";

      setError(message);
      Alert.alert("Error", message);
    } finally {
      setIsPublishing(false);
    }
  }

  const busy =
    isLoading ||
    isSavingInfo ||
    isSavingPhotos ||
    isSavingHours ||
    isPublishing;

  function saveButton(label: string, loading: boolean, onPress: () => void) {
    return (
      <Pressable
        onPress={onPress}
        disabled={busy || !organizationId}
        style={({ pressed }) => [
          ui.secondaryButton,
          (pressed || busy) && { opacity: 0.7 },
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#245536" />
        ) : (
          <Text style={ui.secondaryButtonText}>{label}</Text>
        )}
      </Pressable>
    );
  }

  return (
    <>
      {isLoading && (
        <View style={{ padding: 12, alignItems: "center" }}>
          <ActivityIndicator color="#245536" />
          <Text style={styles.helper}>Cargando perfil del negocio...</Text>
        </View>
      )}

      {!!error && (
        <Text style={[styles.helper, { color: "#B42318" }]}>{error}</Text>
      )}

      <Accordion
        title="Información del negocio"
        subtitle="Descripción, ubicación y WhatsApp"
        icon="🏪"
        expanded={expandedSection === "info"}
        onPress={() => onToggleSection("info")}
      >
        <Text style={styles.label}>Nombre comercial</Text>
        <TextInput
          value={organizationName}
          editable={false}
          accessibilityLabel="Nombre comercial"
          style={[styles.input, ui.readOnlyInput]}
        />
        <Text style={ui.fieldHint}>
          El nombre se obtiene de la organización activa en Better Auth.
        </Text>

        <Text style={styles.label}>Tipo de negocio</Text>
        <Text style={ui.fieldHint}>
          Selecciona la categoría que mejor representa tu negocio.
        </Text>

        <View style={{ gap: 8, marginBottom: 16 }}>
          {BUSINESS_TYPES.map((type) => {
            const selected = businessType === type.value;

            return (
              <Pressable
                key={type.value}
                onPress={() => setBusinessType(type.value)}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: selected ? "#245536" : "#D0D5DD",
                  borderRadius: 10,
                  backgroundColor: selected ? "#EAF4EC" : "#FFFFFF",
                }}
              >
                <Text style={{ fontSize: 22 }}>{type.icon}</Text>

                <Text
                  style={{
                    flex: 1,
                    color: "#202020",
                    fontWeight: selected ? "600" : "400",
                  }}
                >
                  {type.label}
                </Text>

                <Text style={{ color: "#245536" }}>{selected ? "✓" : "○"}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Descripción del negocio</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="¿Qué ofrece tu negocio?"
          style={[styles.input, styles.textArea]}
          multiline
          maxLength={500}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Dirección del local</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Ej. Av. principal 123"
          style={styles.input}
          maxLength={200}
        />

        <Text style={styles.label}>WhatsApp para pedidos</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Ej. 51987654321"
          style={styles.input}
          keyboardType="phone-pad"
          maxLength={20}
        />

        {saveButton(
          "Guardar información",
          isSavingInfo,
          () => void handleSaveInfo(),
        )}
      </Accordion>

      <Accordion
        title="Fotos del negocio"
        subtitle={`Hasta ${maxPhotos ?? 5} fotos`}
        icon="📸"
        expanded={expandedSection === "photos"}
        onPress={() => onToggleSection("photos")}
      >
        <Text style={styles.label}>URL de la foto de portada</Text>
        <TextInput
          value={coverImageUrl}
          onChangeText={setCoverImageUrl}
          placeholder="https://..."
          autoCapitalize="none"
          keyboardType="url"
          style={styles.input}
        />

        <Text style={styles.label}>URLs de la galería</Text>
        <TextInput
          value={photoLinks}
          onChangeText={setPhotoLinks}
          placeholder={"https://...\nhttps://..."}
          autoCapitalize="none"
          keyboardType="url"
          multiline
          textAlignVertical="top"
          style={[styles.input, { minHeight: 130 }]}
        />

        <Text style={ui.fieldHint}>
          Usa un enlace por línea. Hemos precargado enlaces de ejemplo; puedes
          reemplazarlos. Por ahora se guardan las URLs, no se suben archivos.
        </Text>

        {saveButton(
          "Guardar enlaces de fotos",
          isSavingPhotos,
          () => void handleSavePhotos(),
        )}
      </Accordion>

      <Accordion
        title="Horarios de atención"
        subtitle="Configura la apertura y el cierre de cada día"
        icon="🕒"
        expanded={expandedSection === "hours"}
        onPress={() => onToggleSection("hours")}
      >
        {DAYS.map(([day, label]) => (
          <View key={day} style={{ marginBottom: 12 }}>
            <Text style={styles.label}>{label}</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.helper}>Apertura</Text>
                <TextInput
                  value={openingHours[day]?.open ?? "09:00"}
                  onChangeText={(value) =>
                    setOpeningHours((current) => ({
                      ...current,
                      [day]: {
                        ...(current[day] ?? { open: "09:00", close: "21:00" }),
                        open: value,
                      },
                    }))
                  }
                  placeholder="09:00"
                  style={styles.input}
                  maxLength={5}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.helper}>Cierre</Text>
                <TextInput
                  value={openingHours[day]?.close ?? "21:00"}
                  onChangeText={(value) =>
                    setOpeningHours((current) => ({
                      ...current,
                      [day]: {
                        ...(current[day] ?? { open: "09:00", close: "21:00" }),
                        close: value,
                      },
                    }))
                  }
                  placeholder="21:00"
                  style={styles.input}
                  maxLength={5}
                />
              </View>
            </View>
          </View>
        ))}

        <Text style={ui.fieldHint}>
          Formato de 24 horas: por ejemplo, 09:00 a 21:00.
        </Text>

        {saveButton(
          "Guardar horarios",
          isSavingHours,
          () => void handleSaveHours(),
        )}
      </Accordion>

      <View
        style={{
          marginTop: 20,
          marginBottom: 20,
          padding: 16,
          borderWidth: 1,
          borderColor: "#D0D5DD",
          borderRadius: 14,
          backgroundColor: "#FFFFFF",
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#202020" }}>
          Publicación en IdentidadPEM
        </Text>

        <Text style={styles.helper}>
          Completa tu ficha y publícala cuando estés listo para que los clientes
          puedan encontrar tu negocio.
        </Text>

        <View
          style={{
            alignSelf: "flex-start",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 20,
            backgroundColor: isPublished ? "#EAF4EC" : "#F2F4F7",
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              color: isPublished ? "#245536" : "#475467",
            }}
          >
            {isPublished ? "● Publicado" : "● Borrador"}
          </Text>
        </View>

        <Text style={styles.helper}>
          {isPublished
            ? "Tu ficha está publicada. Puedes ocultarla temporalmente cuando lo necesites."
            : "Tu ficha todavía no está publicada. Guardar información no la hace visible públicamente."}
        </Text>

        <Pressable
          onPress={() => void handlePublish()}
          disabled={busy || !organizationId || isPublished || !profileExists}
          accessibilityRole="button"
          style={{
            padding: 14,
            borderRadius: 10,
            alignItems: "center",
            backgroundColor: "#245536",
            opacity:
              busy || !organizationId || isPublished || !profileExists
                ? 0.55
                : 1,
          }}
        >
          {isPublishing ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
              Publicar en IdentidadPEM
            </Text>
          )}
        </Pressable>

        {isPublished && (
          <Pressable
            onPress={() => void handleUnpublish()}
            disabled={busy || !organizationId}
            accessibilityRole="button"
            style={{
              padding: 12,
              borderRadius: 10,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#D0D5DD",
              opacity: busy ? 0.55 : 1,
            }}
          >
            <Text style={{ color: "#B42318", fontWeight: "600" }}>
              Despublicar negocio
            </Text>
          </Pressable>
        )}
      </View>

      <Pressable
        style={ui.proCard}
        onPress={onActivatePro}
        disabled={maxPhotos >= 15}
        accessibilityRole="button"
      >
        <Text style={ui.proEyebrow}>IDENTIDADPEM PRO</Text>
        <Text style={ui.proTitle}>
          {maxPhotos >= 15
            ? "¡Tu negocio tiene Pro! ✨"
            : "Dale más visibilidad a tu negocio ✨"}
        </Text>
        <Text style={ui.proDescription}>
          {maxPhotos >= 15
            ? "Las funciones Pro están habilitadas en esta demo."
            : "Descubre las funciones adicionales para impulsar tu negocio."}
        </Text>
        <View style={ui.priceRow}>
          <Text style={ui.proPrice}>S/ 50</Text>
          <Text style={ui.proPeriod}>/ mes</Text>
        </View>
        <Text style={ui.proTrial}>15 días de prueba · Sin compromiso</Text>
        <View style={ui.proBadge}>
          <Text style={ui.proBadgeText}>
            {maxPhotos >= 15 ? "Pro activado (demo)" : "Activar Pro"}
          </Text>
        </View>
      </Pressable>
    </>
  );
}
