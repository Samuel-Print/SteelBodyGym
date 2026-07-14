import { ConfirmDialog } from "../../../components/ui";

const DisablePromotionModal = ({
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
      variant="warning"
      title="Disable promotion?"
      message={`La promoción "${promotion?.nombre ?? ""}" será desactivada y ya no será visible para los usuarios.`}
      confirmText="Desactivar"
      cancelText="Cancelar"
    />
  );
};

export default DisablePromotionModal;