import RoleWorkspaceScreen from "@/components/negocios/RoleWorkspaceScreen";

export default function CocinaScreen() {
  return (
    <RoleWorkspaceScreen
      requiredRole="KITCHEN"
      title="Panel de cocina"
      description="Consulta los pedidos enviados por el equipo de atención."
      icon="flame-outline"
      firstCardTitle="Pedidos pendientes"
      firstCardDescription="Aquí aparecerán los pedidos que esperan preparación."
      secondCardTitle="En preparación"
      secondCardDescription="Podrás avanzar los pedidos a listo cuando termines de prepararlos."
    />
  );
}
