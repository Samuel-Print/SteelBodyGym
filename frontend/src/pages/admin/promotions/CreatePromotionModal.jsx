import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "../../../components/ui";

const CreatePromotionModal = ({ open, onClose, onSave }) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalHeader
        icon={
          <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
            <path d="m15 5 4 4M13.5 3.5 21 11l-9 9-7.5-.5L4 12z"/>
          </svg>
        }
      >
        <h3 className="text-[18px] font-head font-bold text-[var(--text)]">
          Nueva promoción
        </h3>

        <p className="text-[13px] text-[var(--muted)]">
          Crea una nueva promoción.
        </p>
      </ModalHeader>

      <ModalBody>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <label>Nombre</label>

            <Input
              placeholder="Ej: 2x1 Plan Mensual"
            />
          </div>

          <div className="grid gap-1">
            <label>Fecha de caducidad</label>

            <Input
              type="date"
            />
          </div>

          <div className="grid gap-1">
            <label>Descripción</label>

            <Textarea
              placeholder="Describe la promoción..."
            />
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button
          variant="ghost"
          onClick={onClose}
        >
          Cancelar
        </Button>

        <Button
          onClick={onSave}
        >
          Crear promoción
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreatePromotionModal;