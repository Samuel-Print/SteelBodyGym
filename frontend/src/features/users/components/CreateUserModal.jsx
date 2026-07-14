import { useState } from "react";
import toast from "react-hot-toast";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../components/ui";
import { PASSWORD_RULES, getFailingPasswordRules, isValidEmail } from "@/features/auth/utils/passwordRules";

const initialUser = {
  nombre: "",
  email: "",
  telefono: "",
  password: "",
};

const CreateUserModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState(initialUser);

  const toastStyle = {
    background: "var(--background)",
    color: "var(--text)",
    border: "1px solid var(--border)",
  };

  const infoToastClassName =
    "rounded-custom shadow-custom dark:shadow-custom-dark px-4 py-3 text-sm font-medium";

  const InfoIcon = (
    <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const failingRules = getFailingPasswordRules(formData.password);

  const validate = () => {
    const isNombreEmpty = !formData.nombre.trim();
    const isEmailEmpty = !formData.email.trim();
    const isEmailInvalida = formData.email.trim() !== "" && !isValidEmail(formData.email);

    if (isNombreEmpty || isEmailEmpty) {
      toast(
        isNombreEmpty
          ? "Falta ingresar el nombre del usuario."
          : "Falta ingresar el correo.",
        { icon: InfoIcon, className: infoToastClassName, style: toastStyle }
      );
      return false;
    }

    if (isEmailInvalida) {
      toast("El correo ingresado no es válido.", {
        icon: InfoIcon, className: infoToastClassName, style: toastStyle,
      });
      return false;
    }

    if (failingRules.length > 0) {
      toast("La contraseña no cumple los requisitos de seguridad.", {
        icon: InfoIcon, className: infoToastClassName, style: toastStyle,
      });
      return false;
    }

    return true;
  };

  const handleClose = () => {
    setFormData(initialUser);
    onClose();
  };

  const handleSave = async () => {
    if (!validate()) return;

    const dataToSend = {
      nombre: formData.nombre.trim(),
      email: formData.email.trim(),
      telefono: formData.telefono.trim() || null,
      password: formData.password,
    };

    try {
      await toast.promise(
        Promise.resolve(onSave(dataToSend)),
        {
          loading: "Creando usuario...",
          success: "Usuario creado correctamente.",
          error: "No se pudo crear el usuario. Intenta de nuevo.",
        },
        {
          className: infoToastClassName,
          style: toastStyle,
          loading: { style: toastStyle, iconTheme: { primary: "#3696e5", secondary: "var(--background)" } },
          success: { style: toastStyle, iconTheme: { primary: "#3696e5", secondary: "var(--background)" } },
          error: { style: toastStyle },
        }
      );
      handleClose();
    } catch (error) {
      // El error ya se muestra vía toast.promise; se conserva el modal abierto.
    }
  };

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalHeader
        icon={
          <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        }
      >
        <h3 className="text-[18px] font-head font-bold text-[var(--text)]">Nuevo usuario</h3>
        <p className="text-[13px] text-[var(--muted)]">Registra un nuevo miembro en el gimnasio.</p>
      </ModalHeader>

      <ModalBody>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <label className="text-[13px] font-bold text-[var(--text)]">Nombre</label>
            <Input
              name="nombre"
              placeholder="Ej: Carlos Martínez"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-[13px] font-bold text-[var(--text)]">Correo</label>
            <Input
              type="email"
              name="email"
              placeholder="ejemplo@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-[13px] font-bold text-[var(--text)]">
              Teléfono <span className="text-[var(--muted)] font-normal">(opcional)</span>
            </label>
            <Input
              type="tel"
              name="telefono"
              placeholder="+57 300 123 4567"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-[13px] font-bold text-[var(--text)]">Contraseña</label>
            <Input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
            />
            <ul className="mt-1 space-y-0.5">
              {PASSWORD_RULES.map((rule) => {
                const passed = rule.test(formData.password);
                return (
                  <li
                    key={rule.label}
                    className={`text-xs flex items-center gap-1.5 ${
                      passed ? "text-green-600" : "text-[var(--muted)]"
                    }`}
                  >
                    <span>{passed ? "✓" : "○"}</span>
                    {rule.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={handleClose} className="text-[var(--text)] hover:bg-[var(--hover)]">
          Cancelar
        </Button>
        <Button onClick={handleSave}>
          Crear usuario
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateUserModal;