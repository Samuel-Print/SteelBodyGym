import { ConfirmDialog } from "../../../components/ui";

const DisableClassModal = ({ open, onClose, onConfirm, classData }) => {
  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      variant="warning"
      title="¿Deshabilitar clase?"
      message={`La clase "${classData?.nombre ?? ""}" será desactivada y ya no será visible para los usuarios.`}
      confirmText="Deshabilitar"
      cancelText="Cancelar"
    />
  );
};

export default DisableClassModal;