import { ConfirmDialog } from "../../../components/ui";

const EnablePlanModal = ({ open, onClose, onConfirm, plan }) => {
  return (
    <ConfirmDialog
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      variant="success"
      title="¿Habilitar plan?"
      message={`El plan "${plan?.nombre ?? ""}" será habilitado y visible para los usuarios nuevamente.`}
      confirmText="Habilitar"
      cancelText="Cancelar"
    />
  );
};

export default EnablePlanModal;