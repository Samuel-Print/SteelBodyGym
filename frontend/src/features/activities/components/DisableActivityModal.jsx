import { ConfirmDialog } from "../../../components/ui";

const DisableActivityModal = ({ open, onClose, onConfirm, activityData }) => {
  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      variant="warning"
      title="¿Deshabilitar actividad?"
      message={`La actividad "${activityData?.nombre ?? ""}" será desactivada y ya no será visible para los usuarios.`}
      confirmText="Deshabilitar"
      cancelText="Cancelar"
    />
  );
};

export default DisableActivityModal;