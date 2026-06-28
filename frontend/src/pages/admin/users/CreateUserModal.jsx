import { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../components/ui";

const CreateUserModal = ({ open, onClose, onSave, user }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    const newUser = {
      name,
      email,
      phone,
      status: 'Activo',
      badge: 'green',
    };
    if (onSave) onSave(newUser);
    setName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalHeader
        icon={
          <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        }
      >
        <h3 className="text-[18px] font-head font-bold text-[var(--text)]">
          Nuevo usuario
        </h3>
        <p className="text-[13px] text-[var(--muted)]">
          Registra un nuevo miembro en el gimnasio.
        </p>
      </ModalHeader>

      <ModalBody>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <label className="text-[13px] font-bold text-[var(--text)]">
              Nombre
            </label>
            <Input
              placeholder="Ej: Carlos Martínez"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <label className="text-[13px] font-bold text-[var(--text)]">
              Correo
            </label>
            <Input
              type="email"
              placeholder="ejemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <label className="text-[13px] font-bold text-[var(--text)]">
              Teléfono
            </label>
            <Input
              type="tel"
              placeholder="+57 300 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>
          Crear usuario
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateUserModal;