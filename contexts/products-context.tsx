import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  createProduct as createProductApi,
  getProducts,
  updateProduct as updateProductApi,
  type CreatePosProduct,
  type PosProduct,
  type UpdatePosProduct,
} from "@/src/services/api/products.api";

export type Product = {
  id: string;
  organizationId: string;
  name: string;
  priceCents: number;
  isActive: boolean;
  isVisibleInCatalog: boolean;
  categoryId: string;
  categoryName: string;
  trackStock: boolean;
};

type ProductsContextType = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  loadProducts: (organizationId: string) => Promise<void>;
  clearProducts: () => void;
  addProduct: (
    organizationId: string,
    product: CreatePosProduct,
  ) => Promise<Product>;
  updateProduct: (
    organizationId: string,
    productId: string,
    changes: UpdatePosProduct,
  ) => Promise<Product>;
};

const ProductsContext = createContext<ProductsContextType | null>(null);

function mapApiProduct(product: PosProduct): Product {
  return {
    id: product.id,
    organizationId: product.tenantId,
    name: product.name,
    priceCents: product.priceCents,
    isActive: !product.agotado,
    isVisibleInCatalog: product.isVisibleInCatalog ?? true,
    categoryId: product.category?.id ?? "",
    categoryName: product.category?.name ?? "Sin categoría",
    trackStock: product.trackStock,
  };
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeOrganizationId = useRef<string | null>(null);
  const latestRequestId = useRef(0);

  const clearProducts = useCallback(() => {
    latestRequestId.current += 1;
    activeOrganizationId.current = null;
    setProducts([]);
    setError(null);
    setIsLoading(false);
  }, []);

  const loadProducts = useCallback(async (organizationId: string) => {
    const requestId = ++latestRequestId.current;

    if (activeOrganizationId.current !== organizationId) {
      activeOrganizationId.current = organizationId;
      setProducts([]);
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getProducts();

      console.log("[PRODUCTS] Respuesta recibida", {
        requestId,
        organizationId,
        total: result.length,
        productos: result.map((product) => ({
          name: product.name,
          tenantId: product.tenantId,
        })),
      });

      if (requestId !== latestRequestId.current) return;

      setProducts(
        result
          .filter((product) => product.tenantId === organizationId)
          .map(mapApiProduct),
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "No se pudieron cargar los productos.";

      if (requestId === latestRequestId.current) {
        setError(message);
      }

      throw err;
    } finally {
      if (requestId === latestRequestId.current) {
        setIsLoading(false);
      }
    }
  }, []);

  const addProduct = useCallback(
    async (
      organizationId: string,
      product: CreatePosProduct,
    ): Promise<Product> => {
      setError(null);

      const savedProduct = await createProductApi(product);

      if (savedProduct.tenantId !== organizationId) {
        throw new Error(
          "El producto se creó con una organización distinta a la seleccionada. Recarga el catálogo antes de continuar.",
        );
      }

      const mappedProduct = mapApiProduct(savedProduct);

      if (activeOrganizationId.current === organizationId) {
        setProducts((current) => [
          ...current.filter((item) => item.id !== mappedProduct.id),
          mappedProduct,
        ]);
      }

      return mappedProduct;
    },
    [],
  );

  const updateProduct = useCallback(
    async (
      organizationId: string,
      productId: string,
      changes: UpdatePosProduct,
    ): Promise<Product> => {
      setError(null);

      const savedProduct = await updateProductApi(productId, changes);

      if (savedProduct.tenantId !== organizationId) {
        throw new Error(
          "El producto pertenece a una organización distinta a la seleccionada.",
        );
      }

      const mappedProduct = mapApiProduct(savedProduct);

      if (activeOrganizationId.current === organizationId) {
        setProducts((current) =>
          current.map((product) =>
            product.id === mappedProduct.id ? mappedProduct : product,
          ),
        );
      }

      return mappedProduct;
    },
    [],
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        error,
        loadProducts,
        clearProducts,
        addProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts debe usarse dentro de ProductsProvider");
  }

  return context;
}
