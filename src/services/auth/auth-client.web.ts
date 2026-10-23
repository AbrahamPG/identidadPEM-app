console.log("[AUTH] Cliente WEB cargado");
import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL_WEB ?? "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: API_BASE_URL,
  plugins: [organizationClient()],
});
