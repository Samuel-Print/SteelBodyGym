import { ConfirmDialog } from "../../../components/ui";

const EnableActivityModal = ({ open, onClose, onConfirm, activityData }) => {
  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      variant="success"
      title="¿Habilitar actividad?"
      message={`La actividad "${activityData?.nombre ?? ""}" será habilitada y visible para los usuarios nuevamente.`}
      confirmText="Habilitar"
      cancelText="Cancelar"
    />
  );
};

export default EnableActivityModal;