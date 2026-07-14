import { ConfirmDialog } from "../../../components/ui";

const DisableBranchModal = ({ open, onClose, onConfirm, branch }) => {
  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      variant="warning"
      title="¿Deshabilitar sede?"
      message={`La sede "${branch?.nombre ?? ""}" será desactivada y ya no será visible para los usuarios.`}
      confirmText="Deshabilitar"
      cancelText="Cancelar"
    />
  );
};

export default DisableBranchModal;