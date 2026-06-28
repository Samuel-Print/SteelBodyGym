import { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../components/ui";

const CreateClassModal = ({ open, onClose, onSave, classData }) => {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = () => {
    const newClass = {
      name,
      datetime,
      duration: parseInt(duration),
      location: 'Sin asignar',
      status: 'Activa',
      badge: 'green',
    };
    if (onSave) onSave(newClass);
    setName('');
    setDatetime('');
    setDuration('');
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
          Nueva clase
        </h3>
        <p className="text-[13px] text-[var(--muted)]">
          Programa una nueva clase dirigida.
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
          Crear clase
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateClassModal;