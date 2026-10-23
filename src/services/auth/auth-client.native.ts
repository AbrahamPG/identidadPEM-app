console.log("[AUTH] Cliente NATIVO cargado");
import { expoClient } from "@better-auth/expo/client";
import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.1.39:3000";

export const authClient = createAuthClient({
  baseURL: API_BASE_URL,
  plugins: [
    expoClient({
      storagePrefix: "identidadpem",
      storage: SecureStore,
    }),
    organizationClient(),
  ],
});
