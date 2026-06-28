import { ConfirmDialog } from "../../../components/ui";

const PlanDeleteModal = ({
  open,
  onClose,
  onConfirm,
  plan,
}) => {
  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      variant="danger"
      title="¿Eliminar plan?"
      message={`El plan "${plan?.name ?? ""}" será eliminado permanentemente.`}
      confirmText="Eliminar"
      cancelText="Cancelar"
    />
  );
};

export default PlanDeleteModal;