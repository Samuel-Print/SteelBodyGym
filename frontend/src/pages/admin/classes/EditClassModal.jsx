import { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../components/ui";

const EditClassModal = ({ open, onClose, onSave, classData }) => {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (classData) {
      setName(classData.name || '');
      setDatetime(classData.datetime || '');
      setDuration(classData.duration?.toString() || '');
    }
  }, [classData, open]);

  const handleSubmit = () => {
    const updatedClass = {
      ...classData,
      name,
      datetime,
      duration: parseInt(duration),
    };
    if (onSave) onSave(updatedClass);
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalHeader
        icon={
          <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        }
      >
        <h3 className="text-[18px] font-head font-bold text-[var(--text)]">
          Editar clase
        </h3>
        <p className="text-[13px] text-[var(--muted)]">
          Actualiza los datos de la clase.
        </p>
      </ModalHeader>

      <ModalBody>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <label className="text-[13px] font-bold text-[var(--text)]">
              Nombre
            </label>
            <Input
              placeholder="Ej: Spinning"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <label className="text-[13px] font-bold text-[var(--text)]">
                Fecha y hora
              </label>
              <Input
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
              />
            </div>

            <div className="grid gap-1">
              <label className="text-[13px] font-bold text-[var(--text)]">
                Duración (min)
              </label>
              <Input
                type="number"
                placeholder="Ej: 45"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>
          Guardar cambios
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditClassModal;