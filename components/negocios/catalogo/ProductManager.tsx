import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { useProducts } from "@/contexts/products-context";
import {
  createCategory,
  getCategories,
  type PosCategory,
} from "@/src/services/api/products.api";
import { ui } from "@/src/styles/negocios/(tabs)/catalog-managments.styles";
import { styles } from "@/src/styles/negocios/(tabs)/catalog.styles";

type ProductManagerProps = {
  organizationId: string | undefined;
  onMutationStateChange: (isMutating: boolean) => void;
};

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export function ProductManager({
  organizationId,
  onMutationStateChange,
}: ProductManagerProps) {
  const {
    products,
    addProduct,
    updateProduct,
    loadProducts,
    clearProducts,
    isLoading: isLoadingProducts,
  } = useProducts();

  const [categories, setCategories] = useState<PosCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isVisibleInCatalog, setIsVisibleInCatalog] = useState(true);

  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [isUpdatingProductId, setIsUpdatingProductId] = useState<string | null>(
    null,
  );
  const [loadedOrganizationId, setLoadedOrganizationId] = useState<
    string | null
  >(null);

  const requestId = useRef(0);
  const mutationInProgress = useRef(false);

  const loadCatalog = useCallback(async () => {
    const currentRequestId = ++requestId.current;

    console.log("[CATALOG] Iniciando carga", {
      currentRequestId,
      organizationId,
    });
    setLoadedOrganizationId(null);
    setCategories([]);
    setSelectedCategoryId("");
    setCategoriesError(null);
    setProductsError(null);

    if (!organizationId) {
      clearProducts();
      setIsLoadingCategories(false);
      return;
    }

    setIsLoadingCategories(true);

    const [categoriesResult, productsResult] = await Promise.allSettled([
      getCategories(),
      loadProducts(organizationId),
    ]);

    if (currentRequestId !== requestId.current) return;

    if (categoriesResult.status === "fulfilled") {
      const loadedCategories = categoriesResult.value.filter(
        (category) => category.tenantId === organizationId,
      );

      setCategories(loadedCategories);
      setSelectedCategoryId(loadedCategories[0]?.id ?? "");
    } else {
      setCategoriesError(
        getErrorMessage(
          categoriesResult.reason,
          "No se pudieron cargar las categorías.",
        ),
      );
    }

    if (productsResult.status === "rejected") {
      setProductsError(
        getErrorMessage(
          productsResult.reason,
          "No se pudieron cargar los productos.",
        ),
      );
    }

    setLoadedOrganizationId(organizationId);
    setIsLoadingCategories(false);
  }, [clearProducts, loadProducts, organizationId]);

  useEffect(() => {
    void loadCatalog();

    return () => {
      requestId.current += 1;
    };
  }, [loadCatalog]);

  const visibleCategories =
    loadedOrganizationId === organizationId ? categories : [];

  const businessProducts = products.filter(
    (product) => product.organizationId === organizationId,
  );

  const isLoadingCatalog = isLoadingCategories || isLoadingProducts;

  const isCatalogReady =
    Boolean(organizationId) &&
    loadedOrganizationId === organizationId &&
    !isLoadingCatalog;

  const isMutating =
    isCreatingCategory || isCreatingProduct || isUpdatingProductId !== null;

  async function handleCreateProduct() {
    if (mutationInProgress.current) return;

    if (!organizationId || !isCatalogReady) {
      Alert.alert(
        "Catálogo cargando",
        "Espera a que termine la carga del negocio.",
      );
      return;
    }

    const cleanName = name.trim();
    const cleanPrice = Number(price.replace(",", "."));
    const priceCents = Math.round(cleanPrice * 100);

    if (!cleanName) {
      Alert.alert("Falta el nombre", "Escribe el nombre del producto.");
      return;
    }

    if (
      !price.trim() ||
      !Number.isFinite(cleanPrice) ||
      !Number.isSafeInteger(priceCents) ||
      priceCents < 1
    ) {
      Alert.alert("Precio inválido", "Ingresa un precio válido en soles.");
      return;
    }

    if (
      !visibleCategories.some((category) => category.id === selectedCategoryId)
    ) {
      Alert.alert(
        "Selecciona una categoría",
        "El producto necesita una categoría de este negocio para guardarse.",
      );
      return;
    }

    mutationInProgress.current = true;
    setIsCreatingProduct(true);
    onMutationStateChange(true);

    try {
      await addProduct(organizationId, {
        name: cleanName,
        priceCents,
        categoryId: selectedCategoryId,
        agotado: false,
        trackStock: false,
        isVisibleInCatalog,
      });

      setName("");
      setPrice("");
      setIsVisibleInCatalog(true);

      Alert.alert(
        "Producto guardado",
        isVisibleInCatalog
          ? "El producto se creó y quedó marcado para mostrarse en el catálogo."
          : "El producto se creó y quedó oculto del catálogo público.",
      );
    } catch (error) {
      Alert.alert(
        "No se pudo guardar",
        getErrorMessage(error, "Verifica la conexión y vuelve a intentarlo."),
      );
    } finally {
      mutationInProgress.current = false;
      setIsCreatingProduct(false);
      onMutationStateChange(false);
    }
  }

  async function handleCreateCategory() {
    if (mutationInProgress.current) return;

    if (!organizationId || !isCatalogReady) {
      Alert.alert(
        "Catálogo cargando",
        "Espera a que termine la carga del negocio.",
      );
      return;
    }

    const cleanName = newCategoryName.trim();

    if (!cleanName) {
      Alert.alert("Falta el nombre", "Escribe el nombre de la categoría.");
      return;
    }

    mutationInProgress.current = true;
    setIsCreatingCategory(true);
    onMutationStateChange(true);

    try {
      const category = await createCategory({ name: cleanName });

      if (category.tenantId !== organizationId) {
        throw new Error(
          "La categoría se creó con una organización distinta a la seleccionada.",
        );
      }

      setCategories((current) => {
        if (current.some((item) => item.id === category.id)) return current;

        return [...current, category].sort((left, right) =>
          left.name.localeCompare(right.name, "es"),
        );
      });

      setSelectedCategoryId(category.id);
      setNewCategoryName("");

      Alert.alert("Categoría creada", `Se creó "${category.name}".`);
    } catch (error) {
      Alert.alert(
        "No se pudo crear la categoría",
        getErrorMessage(error, "Verifica la conexión con el servidor."),
      );
    } finally {
      mutationInProgress.current = false;
      setIsCreatingCategory(false);
      onMutationStateChange(false);
    }
  }

  async function handleToggleCatalogVisibility(
    productId: string,
    currentlyVisible: boolean,
  ) {
    if (mutationInProgress.current) return;

    if (!organizationId || !isCatalogReady) {
      Alert.alert(
        "Catálogo cargando",
        "Espera a que termine la carga del negocio.",
      );
      return;
    }

    mutationInProgress.current = true;
    setIsUpdatingProductId(productId);
    onMutationStateChange(true);

    try {
      const updatedProduct = await updateProduct(organizationId, productId, {
        isVisibleInCatalog: !currentlyVisible,
      });

      Alert.alert(
        "Visibilidad actualizada",
        updatedProduct.isVisibleInCatalog
          ? "El producto quedó visible para el catálogo público."
          : "El producto quedó oculto del catálogo público.",
      );
    } catch (error) {
      Alert.alert(
        "No se pudo actualizar",
        getErrorMessage(
          error,
          "No se pudo guardar la visibilidad del producto.",
        ),
      );
    } finally {
      mutationInProgress.current = false;
      setIsUpdatingProductId(null);
      onMutationStateChange(false);
    }
  }

  return (
    <>
      <Text style={styles.sectionTitle}>Agregar producto</Text>
      <Text style={styles.helper}>
        Los productos pertenecen al negocio seleccionado y se guardan en el
        servidor.
      </Text>

      {!organizationId ? (
        <View style={styles.emptyState}>
          <Text style={styles.helper}>
            Selecciona un negocio para ver su catálogo.
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.label}>Nombre del producto *</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Ej. Mostrito personal"
            placeholderTextColor="#9AA49A"
            style={styles.input}
            maxLength={150}
            editable={!isMutating && isCatalogReady}
          />

          <Text style={styles.label}>Precio en soles (S/) *</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="Ej. 18.00"
            placeholderTextColor="#9AA49A"
            style={styles.input}
            keyboardType="decimal-pad"
            editable={!isMutating && isCatalogReady}
          />

          <Text style={styles.label}>Categoría del producto *</Text>

          {isLoadingCategories && visibleCategories.length === 0 ? (
            <ActivityIndicator color="#245536" />
          ) : categoriesError ? (
            <View style={ui.productPhotoPlaceholder}>
              <Text style={styles.helper}>{categoriesError}</Text>
              <Pressable onPress={() => void loadCatalog()}>
                <Text style={ui.secondaryButtonText}>Reintentar</Text>
              </Pressable>
            </View>
          ) : visibleCategories.length === 0 ? (
            <View style={ui.productPhotoPlaceholder}>
              <Text style={styles.helper}>
                Este negocio todavía no tiene categorías. Crea una para poder
                guardar productos.
              </Text>
            </View>
          ) : (
            <View style={{ gap: 8 }}>
              {visibleCategories.map((category) => {
                const selected = selectedCategoryId === category.id;

                return (
                  <Pressable
                    key={category.id}
                    onPress={() => setSelectedCategoryId(category.id)}
                    disabled={isMutating}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    style={[
                      ui.businessOption,
                      selected && ui.businessOptionSelected,
                    ]}
                  >
                    <Text style={{ flex: 1, color: "#245536" }}>
                      {category.name}
                    </Text>
                    {selected && <Text style={ui.selectedMark}>✓</Text>}
                  </Pressable>
                );
              })}
            </View>
          )}

          <View style={{ gap: 8, marginBottom: 12 }}>
            <TextInput
              value={newCategoryName}
              onChangeText={setNewCategoryName}
              placeholder="Nueva categoría: Bebidas, Combos..."
              placeholderTextColor="#9AA49A"
              style={styles.input}
              maxLength={100}
              editable={!isMutating && isCatalogReady}
            />

            <Pressable
              onPress={() => void handleCreateCategory()}
              disabled={
                isMutating || !isCatalogReady || !newCategoryName.trim()
              }
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
                (isMutating || !isCatalogReady || !newCategoryName.trim()) && {
                  opacity: 0.6,
                },
              ]}
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>
                {isCreatingCategory ? "Creando..." : "+ Crear categoría"}
              </Text>
            </Pressable>
          </View>

          <View style={{ gap: 8, marginBottom: 12 }}>
            <Text style={styles.label}>Visibilidad en el catálogo público</Text>

            <Pressable
              onPress={() => setIsVisibleInCatalog(true)}
              disabled={isMutating || !isCatalogReady}
              accessibilityRole="button"
              accessibilityState={{ selected: isVisibleInCatalog }}
              style={[
                ui.businessOption,
                isVisibleInCatalog && ui.businessOptionSelected,
              ]}
            >
              <View style={{ flex: 1, gap: 3 }}>
                <Text style={{ color: "#245536", fontWeight: "600" }}>
                  Mostrar producto
                </Text>
                <Text style={styles.helper}>
                  El producto puede aparecer en el catálogo público.
                </Text>
              </View>
              {isVisibleInCatalog && <Text style={ui.selectedMark}>✓</Text>}
            </Pressable>

            <Pressable
              onPress={() => setIsVisibleInCatalog(false)}
              disabled={isMutating || !isCatalogReady}
              accessibilityRole="button"
              accessibilityState={{ selected: !isVisibleInCatalog }}
              style={[
                ui.businessOption,
                !isVisibleInCatalog && ui.businessOptionSelected,
              ]}
            >
              <View style={{ flex: 1, gap: 3 }}>
                <Text style={{ color: "#245536", fontWeight: "600" }}>
                  Mantener oculto
                </Text>
                <Text style={styles.helper}>
                  Se guarda en POSbro, pero no se muestra públicamente.
                </Text>
              </View>
              {!isVisibleInCatalog && <Text style={ui.selectedMark}>✓</Text>}
            </Pressable>
          </View>

          <Pressable
            onPress={() => void handleCreateProduct()}
            disabled={
              isMutating ||
              !isCatalogReady ||
              isLoadingCatalog ||
              categoriesError !== null ||
              visibleCategories.length === 0
            }
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
              (isMutating ||
                isLoadingCatalog ||
                categoriesError !== null ||
                visibleCategories.length === 0) && { opacity: 0.6 },
            ]}
            accessibilityRole="button"
          >
            <Text style={styles.primaryButtonText}>
              {isCreatingProduct ? "Guardando..." : "+ Crear producto"}
            </Text>
          </Pressable>

          <View style={ui.listDivider} />

          <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>Tus productos</Text>
            <Text style={styles.listCount}>
              {businessProducts.length} productos
            </Text>
          </View>

          {productsError ? (
            <View style={styles.emptyState}>
              <Text style={styles.helper}>{productsError}</Text>
              <Pressable onPress={() => void loadCatalog()}>
                <Text style={ui.secondaryButtonText}>Reintentar</Text>
              </Pressable>
            </View>
          ) : isLoadingProducts && businessProducts.length === 0 ? (
            <ActivityIndicator color="#245536" />
          ) : businessProducts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Aún no tienes productos</Text>
              <Text style={styles.helper}>
                Crea tu primer producto usando el formulario de arriba.
              </Text>
            </View>
          ) : (
            businessProducts.map((product) => {
              const isUpdating = isUpdatingProductId === product.id;

              return (
                <View key={product.id} style={styles.productCard}>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.helper}>{product.categoryName}</Text>
                    <Text style={styles.productPrice}>
                      S/ {(product.priceCents / 100).toFixed(2)}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.statusBadge,
                      product.isActive
                        ? styles.availableBadge
                        : styles.unavailableBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        product.isActive
                          ? styles.availableText
                          : styles.unavailableText,
                      ]}
                    >
                      {product.isActive ? "Disponible" : "Agotado"}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "100%",
                      gap: 8,
                      marginTop: 12,
                    }}
                  >
                    <Text style={styles.label}>
                      {product.isVisibleInCatalog
                        ? "Visible en catálogo"
                        : "Oculto del catálogo"}
                    </Text>

                    <Pressable
                      onPress={() =>
                        void handleToggleCatalogVisibility(
                          product.id,
                          product.isVisibleInCatalog,
                        )
                      }
                      disabled={isMutating || !isCatalogReady}
                      accessibilityRole="button"
                      accessibilityState={{
                        disabled: isMutating || !isCatalogReady,
                      }}
                      style={({ pressed }) => [
                        styles.primaryButton,
                        {
                          backgroundColor: product.isVisibleInCatalog
                            ? "#F1E5D8"
                            : "#245536",
                          opacity:
                            isMutating || !isCatalogReady || pressed ? 0.7 : 1,
                        },
                      ]}
                    >
                      {isUpdating ? (
                        <ActivityIndicator
                          color={
                            product.isVisibleInCatalog ? "#245536" : "#FFFFFF"
                          }
                        />
                      ) : (
                        <Text
                          style={[
                            styles.primaryButtonText,
                            {
                              color: product.isVisibleInCatalog
                                ? "#245536"
                                : "#FFFFFF",
                            },
                          ]}
                        >
                          {product.isVisibleInCatalog
                            ? "Ocultar del catálogo"
                            : "Publicar en catálogo"}
                        </Text>
                      )}
                    </Pressable>
                  </View>
                </View>
              );
            })
          )}
        </>
      )}
    </>
  );
}
