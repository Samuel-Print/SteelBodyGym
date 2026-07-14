import { ConfirmDialog } from "../../../components/ui";

const EnablePromotionModal = ({
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
      variant="success"
      title="Enable promotion?"
      message={`La promoción "${promotion?.nombre ?? ""}" será habilitada y visible para los usuarios nuevamente.`}
      confirmText="Habilitar"
      cancelText="Cancelar"
    />
  );
};

export default EnablePromotionModal;