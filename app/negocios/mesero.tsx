import RoleWorkspaceScreen from "@/components/negocios/RoleWorkspaceScreen";

export default function MeseroScreen() {
  return (
    <RoleWorkspaceScreen
      requiredRole="WAITER"
      title="Atención de mesas"
      description="Gestiona las mesas y envía los pedidos de los clientes."
      icon="restaurant-outline"
      firstCardTitle="Mesas"
      firstCardDescription="Aquí mostraremos las mesas disponibles, ocupadas y pendientes de atención."
      secondCardTitle="Pedidos"
      secondCardDescription="Podrás registrar pedidos, agregar observaciones y enviarlos a cocina."
    />
  );
}
