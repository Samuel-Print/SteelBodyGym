import { ConfirmDialog } from "../../../components/ui";

const DeleteUserDialog = ({ open, onClose, onConfirm, user }) => {
  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      variant="danger"
      title="¿Eliminar este usuario?"
      message={`El usuario "${user?.name ?? ''}" será eliminado permanentemente.`}
      confirmText="Sí, eliminar"
      cancelText="Cancelar"
    />
  );
};

export default DeleteUserDialog;