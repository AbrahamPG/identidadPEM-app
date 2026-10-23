import RoleWorkspaceScreen from "@/components/negocios/RoleWorkspaceScreen";

export default function LimpiezaScreen() {
  return (
    <RoleWorkspaceScreen
      requiredRole="CLEANING"
      title="Panel de limpieza"
      description="Consulta las tareas de limpieza asignadas al equipo."
      icon="sparkles-outline"
      firstCardTitle="Tareas pendientes"
      firstCardDescription="Aquí aparecerán las habitaciones y áreas que necesitan limpieza."
      secondCardTitle="Tareas completadas"
      secondCardDescription="Más adelante podrás actualizar el estado de cada tarea."
    />
  );
}
