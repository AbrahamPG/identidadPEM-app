import RoleWorkspaceScreen from "@/components/negocios/RoleWorkspaceScreen";

export default function RecepcionScreen() {
  return (
    <RoleWorkspaceScreen
      requiredRole="RECEPTION"
      title="Recepción"
      description="Espacio de trabajo para gestionar las operaciones del hotel."
      icon="bed-outline"
      firstCardTitle="Habitaciones"
      firstCardDescription="Aquí mostraremos la disponibilidad y el estado de las habitaciones."
      secondCardTitle="Huéspedes"
      secondCardDescription="Aquí prepararemos las funciones de recepción y registro de huéspedes."
    />
  );
}
