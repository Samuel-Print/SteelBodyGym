import { ConfirmDialog } from "../../../components/ui";

const DeleteClassDialog = ({ open, onClose, onConfirm, classData }) => {
  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      variant="danger"
      title="¿Eliminar esta clase?"
      message={`La clase "${classData?.name ?? ''}" será eliminada permanentemente.`}
      confirmText="Sí, eliminar"
      cancelText="Cancelar"
    />
  );
};

export default DeleteClassDialog;