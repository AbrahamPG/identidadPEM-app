import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

const FAVORITES_KEY = "@identidadpem/favorites";

type FavoritesContextValue = {
  favorites: string[];
  ready: boolean;
  isFavorite: (businessId: string) => boolean;
  toggleFavorite: (businessId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadFavorites() {
      try {
        const stored = await AsyncStorage.getItem(FAVORITES_KEY);

        if (stored) {
          const parsed: unknown = JSON.parse(stored);

          if (
            Array.isArray(parsed) &&
            parsed.every((id) => typeof id === "string")
          ) {
            if (active) setFavorites(parsed);
          }
        }
      } catch (error) {
        console.error("No se pudieron cargar los favoritos", error);
      } finally {
        if (active) setReady(true);
      }
    }

    void loadFavorites();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)).catch(
      (error) => console.error("No se pudieron guardar los favoritos", error),
    );
  }, [favorites, ready]);

  const toggleFavorite = useCallback((businessId: string) => {
    setFavorites((current) =>
      current.includes(businessId)
        ? current.filter((id) => id !== businessId)
        : [...current, businessId],
    );
  }, []);

  const isFavorite = useCallback(
    (businessId: string) => favorites.includes(businessId),
    [favorites],
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, ready, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites debe utilizarse dentro de FavoritesProvider");
  }

  return context;
}
