import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getProducts, type PosProduct } from "../src/services/api/products.api";

export default function ApiTestScreen() {
  const [products, setProducts] = useState<PosProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function testConnection() {
      try {
        const result = await getProducts();

        if (active) {
          setProducts(result);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Error desconocido");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void testConnection();

    return () => {
      active = false;
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>POSbro × IdentidadPEM</Text>
      <Text>Endpoint: GET /products</Text>

      {loading ? (
        <View style={styles.status}>
          <ActivityIndicator />
          <Text>Consultando el backend...</Text>
        </View>
      ) : error ? (
        <View style={styles.error}>
          <Text style={styles.heading}>Falló la conexión</Text>
          <Text selectable>{error}</Text>
        </View>
      ) : (
        <View style={styles.success}>
          <Text style={styles.heading}>Respuesta recibida</Text>
          <Text>Productos encontrados: {products.length}</Text>

          {products.map((product) => (
            <View key={product.id} style={styles.product}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text>Precio: S/ {(product.priceCents / 100).toFixed(2)}</Text>
              <Text>
                Categoría: {product.category?.name ?? "Sin categoría"}
              </Text>
              <Text>Agotado: {product.agotado ? "Sí" : "No"}</Text>
              <Text selectable>ID: {product.id}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  status: {
    padding: 16,
    gap: 12,
  },
  success: {
    padding: 16,
    gap: 12,
    backgroundColor: "#e8f5e9",
    borderRadius: 8,
  },
  error: {
    padding: 16,
    gap: 12,
    backgroundColor: "#ffebee",
    borderRadius: 8,
  },
  heading: {
    fontSize: 17,
    fontWeight: "700",
  },
  product: {
    padding: 12,
    gap: 4,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
  },
});
