export type BusinessRole =
  | "OWNER"
  | "ADMIN"
  | "WAITER"
  | "KITCHEN"
  | "RECEPTION"
  | "CLEANING";

export type BusinessType = "RESTAURANT" | "HOTEL" | "SALON" | "OTHER";

export type WorkspaceDestination =
  | "/negocios/(tabs)"
  | "/negocios/mesero"
  | "/negocios/cocina"
  | "/negocios/recepcion"
  | "/negocios/limpieza";
