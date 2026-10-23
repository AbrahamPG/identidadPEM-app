import type {
    BusinessRole,
    WorkspaceDestination,
} from "@/src/types/negocios-access";

export function getWorkspaceDestination(
  role: BusinessRole,
): WorkspaceDestination {
  switch (role) {
    case "OWNER":
    case "ADMIN":
      return "/negocios/(tabs)";

    case "WAITER":
      return "/negocios/mesero";

    case "KITCHEN":
      return "/negocios/cocina";

    case "RECEPTION":
      return "/negocios/recepcion";

    case "CLEANING":
      return "/negocios/limpieza";
  }
}
