import { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../components/ui";

const EditBranchModal = ({ open, onClose, onSave, branch }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [schedule, setSchedule] = useState('');

  useEffect(() => {
    if (branch) {
      setName(branch.name || '');
      setCity(branch.city || '');
      setLocation(branch.location || '');
      setSchedule(branch.schedule || '');
    }
  }, [branch, open]);

  const handleSubmit = () => {
    const updatedBranch = {
      ...branch,
      name,
      city,
      location,
      schedule,
    };
    if (onSave) onSave(updatedBranch);
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalHeader
        icon={
          <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        }
      >
        <h3 className="text-[18px] font-head font-bold text-[var(--text)]">
          Editar sede
        </h3>
        <p className="text-[13px] text-[var(--muted)]">
          Actualiza los datos de la sede.
        </p>
      </ModalHeader>

      <ModalBody>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <label className="text-[13px] font-bold text-[var(--text)]">
              Nombre
            </label>
            <Input
              placeholder="Ej: Sede Centro"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <label className="text-[13px] font-bold text-[var(--text)]">
              Ciudad
            </label>
            <Input
              placeholder="Ej: Bogotá"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <label className="text-[13px] font-bold text-[var(--text)]">
              Ubicación geográfica
            </label>
            <Input
              placeholder="Ej: Cra. 7 #45-12, Chapinero"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <label className="text-[13px] font-bold text-[var(--text)]">
              Horario de atención
            </label>
            <Input
              placeholder="Ej: Lun–Sáb · 5:00 AM – 10:00 PM"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
            />
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

export default EditBranchModal;