import { ConfirmDialog } from "../../../components/ui";

const DisablePlanModal = ({ open, onClose, onConfirm, plan }) => {
  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      variant="warning"
      title="¿Deshabilitar plan?"
      message={`El plan "${plan?.nombre ?? ""}" será desactivado y ya no será visible para los usuarios.`}
      confirmText="Deshabilitar"
      cancelText="Cancelar"
    />
  );
};

export default DisablePlanModal;