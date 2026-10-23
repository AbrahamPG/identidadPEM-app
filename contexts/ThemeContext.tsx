import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { useColorScheme as useDeviceColorScheme } from "react-native";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "@identidadpem/theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const deviceTheme = useDeviceColorScheme();
  const [theme, setThemeState] = useState<ThemeMode>(
    deviceTheme === "dark" ? "dark" : "light",
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedTheme === "light" || savedTheme === "dark") {
          setThemeState(savedTheme);
        }
      } catch (error) {
        console.warn("No se pudo cargar el tema guardado:", error);
      } finally {
        setLoaded(true);
      }
    }

    loadTheme();
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);

    AsyncStorage.setItem(STORAGE_KEY, newTheme).catch((error) => {
      console.warn("No se pudo guardar el tema:", error);
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!loaded) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "dark",
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme debe utilizarse dentro de ThemeProvider");
  }

  return context;
}
