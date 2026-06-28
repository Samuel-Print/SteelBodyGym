import { ConfirmDialog } from "../../../components/ui";

const DeleteBranchDialog = ({ open, onClose, onConfirm, branch }) => {
  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      variant="danger"
      title="¿Eliminar esta sede?"
      message={`La sede "${branch?.name ?? ''}" será eliminada permanentemente.`}
      confirmText="Sí, eliminar"
      cancelText="Cancelar"
    />
  );
};

export default DeleteBranchDialog;