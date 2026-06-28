import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../components/ui";

const PlanEditModal = ({
  open,
  onClose,
  plan,
  onSave,
}) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalHeader
        icon={
          <svg
            className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 10h18" />
          </svg>
        }
      >
        <h3 className="text-[18px] font-head font-bold text-[var(--text)]">
          Editar plan
        </h3>

        <p className="text-[13px] text-[var(--muted)]">
          Actualiza el plan de membresía.
        </p>
      </ModalHeader>

      <ModalBody>
        <div className="grid gap-4">
          {/* Nombre - Ocupa toda la fila */}
          <div className="grid gap-1">
            <label className="text-[13px] font-bold text-[var(--text)]">
              Nombre
            </label>
            <Input
              placeholder="Ej: Plan Mensual"
              defaultValue={plan?.name || ''}
            />
          </div>

          {/* Tiempo y Costo en el mismo renglón */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <label className="text-[13px] font-bold text-[var(--text)]">
                Tiempo (meses)
              </label>
              <Input
                type="number"
                placeholder="Ej: 1"
                defaultValue={plan?.time || ''}
              />
            </div>

            <div className="grid gap-1">
              <label className="text-[13px] font-bold text-[var(--text)]">
                Costo (COP)
              </label>
              <Input
                type="number"
                placeholder="Ej: 45000"
                defaultValue={plan?.cost || ''}
              />
            </div>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>

        <Button onClick={onSave}>
          Guardar cambios
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PlanEditModal;