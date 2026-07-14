import { ConfirmDialog } from "../../../components/ui";

const EnableClassModal = ({ open, onClose, onConfirm, classData }) => {
  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      variant="success"
      title="¿Habilitar clase?"
      message={`La clase "${classData?.nombre ?? ""}" será habilitada y visible para los usuarios nuevamente.`}
      confirmText="Habilitar"
      cancelText="Cancelar"
    />
  );
};

export default EnableClassModal;