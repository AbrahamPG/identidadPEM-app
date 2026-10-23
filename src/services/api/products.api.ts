import { apiRequest } from "./client";

export type PosProduct = {
  id: string;
  name: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  agotado: boolean;
  trackStock: boolean;
  isVisibleInCatalog: boolean;
  tenantId: string;
  category: {
    id: string;
    name: string;
    tenantId: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreatePosProduct = {
  name: string;
  priceCents: number;
  categoryId: string;
  description?: string;
  imageUrl?: string;
  agotado?: boolean;
  trackStock?: boolean;
  isVisibleInCatalog?: boolean;
};

export type UpdatePosProduct = Partial<
  Pick<
    PosProduct,
    | "name"
    | "description"
    | "priceCents"
    | "imageUrl"
    | "agotado"
    | "trackStock"
    | "isVisibleInCatalog"
  >
> & {
  categoryId?: string;
};

export type PosCategory = {
  id: string;
  name: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreatePosCategory = {
  name: string;
};

export function createCategory(
  category: CreatePosCategory,
): Promise<PosCategory> {
  return apiRequest<PosCategory>("/categories", {
    method: "POST",
    body: category,
  });
}

export function getProducts(): Promise<PosProduct[]> {
  return apiRequest<PosProduct[]>("/products");
}

export function createProduct(product: CreatePosProduct): Promise<PosProduct> {
  return apiRequest<PosProduct>("/products", {
    method: "POST",
    body: {
      agotado: false,
      trackStock: false,
      isVisibleInCatalog: true,
      ...product,
    },
  });
}

export function getCategories(): Promise<PosCategory[]> {
  return apiRequest<PosCategory[]>("/categories");
}

export function updateProduct(
  id: string,
  changes: UpdatePosProduct,
): Promise<PosProduct> {
  return apiRequest<PosProduct>(`/products/${id}`, {
    method: "PATCH",
    body: changes,
  });
}

export function deleteProduct(id: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/products/${id}`, {
    method: "DELETE",
  });
}
