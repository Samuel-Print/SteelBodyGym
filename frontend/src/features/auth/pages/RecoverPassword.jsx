import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { Button, Input } from "@/components/ui";
import useAuth from "@/features/auth/hooks/useAuth";
import { isValidEmail } from "@/features/auth/utils/passwordRules";

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

const RecoverPassword = () => {
  const { solicitarRecuperacion } = useAuth();

  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const validate = () => {
    const isEmailEmpty = !email.trim();
    const isEmailInvalida = email.trim() !== "" && !isValidEmail(email);

    if (isEmailEmpty) {
      toast("Falta ingresar tu correo.", {
        icon: InfoIcon, className: infoToastClassName, style: toastStyle,
      });
      return false;
    }

    if (isEmailInvalida) {
      toast("El correo ingresado no es válido.", {
        icon: InfoIcon, className: infoToastClassName, style: toastStyle,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await toast.promise(
        solicitarRecuperacion(email.trim()),
        {
          loading: "Enviando enlace de recuperación...",
          success: "Si el correo existe, te enviamos un enlace de recuperación.",
          error: "No se pudo enviar el enlace. Intenta de nuevo.",
        },
        {
          className: infoToastClassName,
          style: toastStyle,
          loading: { style: toastStyle, iconTheme: { primary: "#3696e5", secondary: "var(--background)" } },
          success: { style: toastStyle, iconTheme: { primary: "#3696e5", secondary: "var(--background)" } },
          error: { style: toastStyle },
        }
      );
      setEnviado(true);
    } catch (error) {
      // El error ya se muestra vía toast.promise
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(rgba(0,0,1,.55), rgba(0,0,1,.78)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80") center/cover fixed'
        }}
      />

      <div className="w-full max-w-[420px] bg-[var(--bg)] border border-[var(--border)] rounded-[var(--radius)] shadow-[var(--shadow)] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
          <div className="flex items-center gap-3 font-head font-extrabold text-[1.15rem]">
            <span className="w-[38px] h-[38px] rounded-[11px] bg-[var(--accent)] grid place-items-center text-white">
              <svg className="w-[22px] h-[22px] stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                <rect width="18" height="11" x="3" y="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            Recuperar contraseña
          </div>
          <Link
            to="/login"
            className="w-[38px] h-[38px] grid place-items-center rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-200"
            title="Volver al login"
          >
            <svg className="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </Link>
        </div>

        <div className="p-6">
          {enviado ? (
            <p className="text-[var(--muted)] text-[0.94rem]">
              Revisa tu correo. Si la dirección está registrada, recibirás un enlace para restablecer tu contraseña (válido por 1 hora).
            </p>
          ) : (
            <>
              <p className="text-[var(--muted)] text-[0.94rem] mb-6">
                Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
              </p>

              <div className="mb-4">
                <label className="block text-[0.86rem] font-semibold mb-[7px]">
                  Correo
                </label>
                <div className="relative flex items-center">
                  <svg className="absolute left-3 w-[18px] h-[18px] text-[var(--muted)] stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-[var(--border)] rounded-[var(--radius-sm)] bg-[var(--surface)] text-[var(--text)] font-body text-[0.95rem]"
                    placeholder="admin@steelbody.com"
                  />
                </div>
              </div>

              <Button onClick={handleSubmit} className="w-full">
                Enviar enlace
              </Button>
            </>
          )}
        </div>

        <div className="px-6 pb-6 text-center">
          <Link to="/login" className="text-[var(--muted)] text-[0.86rem] hover:text-[var(--accent)] transition">
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;