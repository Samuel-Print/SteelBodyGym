import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { Button, Input } from "@/components/ui";
import useAuth from "@/features/auth/hooks/useAuth";
import { PASSWORD_RULES, getFailingPasswordRules } from "@/features/auth/utils/passwordRules";

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

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const { verificarToken, resetearPassword } = useAuth();

  const [estado, setEstado] = useState("verificando"); // verificando | valido | invalido
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const verificar = async () => {
      if (!token) {
        setEstado("invalido");
        return;
      }
      try {
        const data = await verificarToken(token);
        setEmail(data.email);
        setEstado("valido");
      } catch (error) {
        setEstado("invalido");
      }
    };
    verificar();
  }, [token]);

  const failingRules = getFailingPasswordRules(password);

  const validate = () => {
    if (failingRules.length > 0) {
      toast("La contraseña no cumple los requisitos de seguridad.", {
        icon: InfoIcon, className: infoToastClassName, style: toastStyle,
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast("Las contraseñas no coinciden.", {
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
        resetearPassword(token, password),
        {
          loading: "Actualizando contraseña...",
          success: "Contraseña actualizada correctamente.",
          error: "No se pudo actualizar la contraseña. Intenta de nuevo.",
        },
        {
          className: infoToastClassName,
          style: toastStyle,
          loading: { style: toastStyle, iconTheme: { primary: "#3696e5", secondary: "var(--background)" } },
          success: { style: toastStyle, iconTheme: { primary: "#3696e5", secondary: "var(--background)" } },
          error: { style: toastStyle },
        }
      );
      navigate("/login");
    } catch (error) {
      // El error ya se muestra vía toast.promise
    }
  };

  if (estado === "verificando") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--muted)]">Verificando enlace...</p>
      </div>
    );
  }

  if (estado === "invalido") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: 'linear-gradient(rgba(0,0,1,.55), rgba(0,0,1,.78)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80") center/cover fixed'
          }}
        />
        <div className="w-full max-w-[420px] bg-[var(--bg)] border border-[var(--border)] rounded-[var(--radius)] shadow-[var(--shadow)] overflow-hidden p-6 text-center">
          <h3 className="font-head font-extrabold text-[1.1rem] mb-2">
            Enlace inválido o expirado
          </h3>
          <p className="text-[var(--muted)] text-[0.9rem] mb-5">
            Solicita un nuevo enlace de recuperación.
          </p>
          <Button onClick={() => navigate("/recuperar-password")} className="w-full">
            Solicitar nuevo enlace
          </Button>
          <div className="mt-4">
            <Link to="/login" className="text-[var(--muted)] text-[0.86rem] hover:text-[var(--accent)] transition">
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            Restablecer contraseña
          </div>
        </div>

        <div className="p-6">
          <p className="text-[var(--muted)] text-[0.94rem] mb-4">
            Cuenta: <span className="font-medium text-[var(--text)]">{email}</span>
          </p>

          <div className="mb-4">
            <label className="block text-[0.86rem] font-semibold mb-[7px]">
              Nueva contraseña
            </label>
            <div className="relative flex items-center">
              <svg className="absolute left-3 w-[18px] h-[18px] text-[var(--muted)] stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                <rect width="18" height="11" x="3" y="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[var(--border)] rounded-[var(--radius-sm)] bg-[var(--surface)] text-[var(--text)] font-body text-[0.95rem]"
                placeholder="••••••••"
              />
            </div>
            <ul className="mt-2 space-y-0.5">
              {PASSWORD_RULES.map((rule) => {
                const passed = rule.test(password);
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

          <div className="mb-5">
            <label className="block text-[0.86rem] font-semibold mb-[7px]">
              Confirmar contraseña
            </label>
            <div className="relative flex items-center">
              <svg className="absolute left-3 w-[18px] h-[18px] text-[var(--muted)] stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                <rect width="18" height="11" x="3" y="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[var(--border)] rounded-[var(--radius-sm)] bg-[var(--surface)] text-[var(--text)] font-body text-[0.95rem]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Restablecer contraseña
          </Button>
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

export default ResetPassword;