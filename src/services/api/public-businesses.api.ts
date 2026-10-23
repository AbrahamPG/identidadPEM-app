import type { Business } from "@/constants/businesses";
import { apiRequest } from "./client";

export type PublicBusinessResponse = {
  id: string;
  tenantId: string;
  name: string;
  slug?: string;
  logo?: string | null;
  businessType: string | null;
  description: string | null;
  address: string | null;
  phone: string | null;
  photos: string[] | null;
  socialLinks: Record<string, string> | null;
  openingHours: Record<string, { open: string; close: string }> | null;
  createdAt: string;
};

export type PublicCatalogResponse = {
  available: boolean;
  products: PublicCatalogProduct[];
};

export type PublicCatalogProduct = {
  id: string;
  name: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  agotado: boolean;
  category: {
    id: string;
    name: string;
  };
};

export async function getPublicBusinesses(): Promise<Business[]> {
  const businesses =
    await apiRequest<PublicBusinessResponse[]>("/public/businesses");

  return businesses.map(mapPublicBusiness);
}

export async function getPublicBusiness(businessId: string): Promise<Business> {
  const business = await apiRequest<PublicBusinessResponse>(
    `/public/businesses/${encodeURIComponent(businessId)}`,
  );

  return mapPublicBusiness(business);
}

export async function getPublicCatalog(
  businessId: string,
): Promise<PublicCatalogResponse> {
  return apiRequest<PublicCatalogResponse>(
    `/public/businesses/${encodeURIComponent(businessId)}/catalog`,
  );
}

function mapPublicBusiness(business: PublicBusinessResponse): Business {
  const category = mapBusinessCategory(business.businessType);

  const emojiByCategory = {
    food: "🍲",
    hotel: "🛏️",
    tourism: "🌿",
    services: "🧰",
  } as const;

  const labelByCategory = {
    food: "Comida",
    hotel: "Hospedaje",
    tourism: "Turismo",
    services: "Servicios",
  } as const;

  const imageUrl = Array.isArray(business.photos)
    ? business.photos.find(
        (photo) => typeof photo === "string" && photo.trim().length > 0,
      )
    : undefined;

  return {
    id: business.id,
    name: business.name,
    category,
    phone: business.phone ?? null,
    categoryLabel: labelByCategory[category],
    emoji: emojiByCategory[category],
    ...(imageUrl ? { imageUrl } : {}),
    description: business.description ?? "",
    location: business.address ?? "Ubicación no registrada",
    featured: false,
  };
}

function mapBusinessCategory(
  businessType: string | null,
): Business["category"] {
  const type = (businessType ?? "").trim().toLowerCase();

  if (
    [
      "food",
      "restaurant",
      "restaurante",
      "polleria",
      "pollería",
      "jugueria",
      "juguería",
      "cafe",
      "cafeteria",
      "comida",
    ].includes(type)
  ) {
    return "food";
  }

  if (["hotel", "hospedaje", "hostal", "lodging"].includes(type)) {
    return "hotel";
  }

  if (
    ["tourism", "turismo", "tour", "tours", "agencia_turismo"].includes(type)
  ) {
    return "tourism";
  }

  return "services";
}
