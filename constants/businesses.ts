export type BusinessCategory = "food" | "hotel" | "tourism" | "services";

export type Business = {
  id: string;
  name: string;
  category: BusinessCategory;
  categoryLabel: string;
  emoji: string;
  phone?: string | null;
  imageUrl?: string;
  description: string;
  location: string;
  featured: boolean;
};

// Temporalmente vacío durante la migración.
// Las pantallas deben consumir getPublicBusinesses().
export const BUSINESSES: Business[] = [];
