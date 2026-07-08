import { ConfirmDialog } from "../../../components/ui";

const DeletePromotionDialog = ({
  open,
  onClose,
  onConfirm,
  promotion,
}) => {
  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      variant="danger"
      title="¿Eliminar promoción?"
      message={`La promoción "${promotion?.name ?? ""}" será eliminada permanentemente.`}
      confirmText="Eliminar"
      cancelText="Cancelar"
    />
  );
};

export default DeletePromotionDialog;