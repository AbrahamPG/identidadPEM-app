import { useFonts } from "expo-font";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
  Stack,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import Colors from "@/constants/Colors";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import {
  ThemeProvider as AppThemeProvider,
  useAppTheme,
} from "@/contexts/ThemeContext";
import { PlanProvider } from "@/contexts/plan-context";
import { ProductsProvider } from "@/contexts/products-context";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AppThemeProvider>
      <RootLayoutNav />
    </AppThemeProvider>
  );
}

function RootLayoutNav() {
  const { theme } = useAppTheme();
  const isDark = theme === "dark";

  const baseTheme = isDark ? DarkTheme : DefaultTheme;
  const appColors = Colors[theme];

  const navigationTheme = {
    ...baseTheme,
    dark: isDark,
    colors: {
      ...baseTheme.colors,
      primary: appColors.tint,
      background: appColors.background,
      card: appColors.background,
      text: appColors.text,
      border: isDark ? "#294535" : "#E2E6DD",
      notification: appColors.tint,
    },
  };

  return (
    <PlanProvider>
      <ProductsProvider>
        <FavoritesProvider>
          <NavigationThemeProvider value={navigationTheme}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="identidadPEM/onboarding"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="identidadPEM/(tabs)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="business/[id]"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="negocios/index"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="negocios/login"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="negocios/register"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="negocios/(tabs)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="negocios/sin-negocio"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="negocios/crear"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="negocios/invitaciones"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="negocios/configurar"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="negocios/organizaciones"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="negocios/mesero"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="negocios/cocina"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="negocios/recepcion"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="negocios/limpieza"
                options={{ headerShown: false }}
              />

              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            </Stack>
          </NavigationThemeProvider>
        </FavoritesProvider>
      </ProductsProvider>
    </PlanProvider>
  );
}
