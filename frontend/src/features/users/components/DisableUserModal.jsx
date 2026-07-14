import { ConfirmDialog } from "../../../components/ui";

const DisableUserModal = ({ open, onClose, onConfirm, user }) => {
  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      variant="warning"
      title="¿Deshabilitar usuario?"
      message={`El usuario "${user?.nombre ?? ""}" será desactivado y no podrá acceder al sistema.`}
      confirmText="Deshabilitar"
      cancelText="Cancelar"
    />
  );
};

export default DisableUserModal;