import { ConfirmDialog } from "../../../components/ui";

const EnableUserModal = ({ open, onClose, onConfirm, user }) => {
  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      variant="success"
      title="¿Habilitar usuario?"
      message={`El usuario "${user?.nombre ?? ""}" será habilitado y podrá acceder nuevamente.`}
      confirmText="Habilitar"
      cancelText="Cancelar"
    />
  );
};

export default EnableUserModal;