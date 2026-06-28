import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "../../../components/ui";

const EditPromotionModal = ({
  open,
  onClose,
  promotion,
  onSave,
}) => {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
    >
      <ModalHeader
        icon={
          <svg
            className="w-[22px] h-[22px] stroke-current fill-none stroke-2"
            viewBox="0 0 24 24"
          >
            <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
          </svg>
        }
      >
        <h3 className="text-[18px] font-head font-bold text-[var(--text)]">
          Editar promoción
        </h3>

        <p className="text-[13px] text-[var(--muted)]">
          Modifica la información de la promoción.
        </p>
      </ModalHeader>

      <ModalBody>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <label>Nombre</label>

            <Input
              defaultValue={promotion?.name}
            />
          </div>

          <div className="grid gap-1">
            <label>Fecha de caducidad</label>

            <Input
              type="date"
              defaultValue={promotion?.expiration}
            />
          </div>

          <div className="grid gap-1">
            <label>Descripción</label>

            <Textarea
              defaultValue={promotion?.description}
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
          Guardar cambios
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditPromotionModal;