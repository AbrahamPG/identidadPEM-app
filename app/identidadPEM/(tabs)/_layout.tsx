import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";

import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: "house.fill",
                android: "home",
                web: "house",
              }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: "Explorar",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: "safari.fill",
                android: "explore",
                web: "search",
              }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="three"
        options={{
          title: "Guardados",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: "heart.fill",
                android: "favorite",
                web: "favorite",
              }}
              tintColor={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
