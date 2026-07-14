import { ConfirmDialog } from "../../../components/ui";

const EnableBranchModal = ({ open, onClose, onConfirm, branch }) => {
  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      variant="success"
      title="¿Habilitar sede?"
      message={`La sede "${branch?.nombre ?? ""}" será habilitada y visible para los usuarios nuevamente.`}
      confirmText="Habilitar"
      cancelText="Cancelar"
    />
  );
};

export default EnableBranchModal;