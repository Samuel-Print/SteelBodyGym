import { useState } from "react";
import toast from "react-hot-toast";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "../../../components/ui";

const initialPlan = {
  nombre: "",
  tiempo_meses: "",
  costo: "",
  descripcion: "",
  destacado: false,
  imagen: null,
  imagen_preview: null,
};

const CreatePlansModal = ({ open, onClose, onSave }) => {
  const [plan, setPlan] = useState(initialPlan);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlan((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toastStyle = {
    background: "var(--background)",
    color: "var(--text)",
    border: "1px solid var(--border)",
  };

  const infoToastClassName =
    "rounded-custom shadow-custom dark:shadow-custom-dark px-4 py-3 text-sm font-medium";

  const InfoIcon = (
    <svg
      className="w-5 h-5 text-accent flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const processImage = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPlan((prev) => ({
          ...prev,
          imagen: file,
          imagen_preview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else if (file) {
      toast.error("El archivo seleccionado no es una imagen válida.", {
        style: toastStyle,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) processImage(file);
  };

  const handleRemoveImage = () => {
    setPlan((prev) => ({ ...prev, imagen: null, imagen_preview: null }));
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) processImage(file);
  };

  const truncateFileName = (name, maxLength = 30) => {
    if (name.length <= maxLength) return name;
    const extension = name.split('.').pop();
    const nameWithoutExt = name.slice(0, name.lastIndexOf('.'));
    const truncated = nameWithoutExt.slice(0, maxLength - 3 - extension.length);
    return `${truncated}...${extension}`;
  };

  const validate = () => {
    const isNombreEmpty = !plan.nombre.trim();
    const isTiempoInvalido = !plan.tiempo_meses || Number(plan.tiempo_meses) <= 0;
    const isCostoInvalido = !plan.costo || Number(plan.costo) <= 0;
    const emptyCount = [isNombreEmpty, isTiempoInvalido, isCostoInvalido].filter(Boolean).length;

    if (emptyCount > 0) {
      toast(
        isNombreEmpty
          ? "Falta ingresar el nombre del plan."
          : isTiempoInvalido
          ? "Ingresa un tiempo válido en meses."
          : "Ingresa un costo válido.",
        {
          icon: InfoIcon,
          className: infoToastClassName,
          style: toastStyle,
        }
      );
      return false;
    }

    return true;
  };

  const handleClose = () => {
    setPlan(initialPlan);
    onClose();
  };

  const handleSave = async () => {
    if (!validate()) return;

    // TODO: cuando el backend tenga Multer listo, incluir la imagen
    // y cambiar plans.service.create para enviar FormData en vez de JSON.
    const dataToSend = {
      nombre: plan.nombre.trim(),
      tiempo_meses: Number(plan.tiempo_meses),
      costo: Number(plan.costo),
      descripcion: plan.descripcion.trim(),
      destacado: plan.destacado,
    };

    try {
      await toast.promise(
        Promise.resolve(onSave(dataToSend)),
        {
          loading: "Creando plan...",
          success: "Plan creado correctamente.",
          error: "No se pudo crear el plan. Intenta de nuevo.",
        },
        {
          className: infoToastClassName,
          style: toastStyle,
          loading: {
            style: toastStyle,
            iconTheme: { primary: "#3696e5", secondary: "var(--background)" },
          },
          success: {
            style: toastStyle,
            iconTheme: { primary: "#3696e5", secondary: "var(--background)" },
          },
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
          Nuevo plan
        </h3>
        <p className="text-[13px] text-[var(--muted)]">
          Crea un nuevo plan de membresía.
        </p>
      </ModalHeader>

      <ModalBody>
        <div className="space-y-4">
          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
              Imagen del plan
            </label>

            <div
              className={`relative transition-all duration-200 ${
                isDragActive ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[var(--background)] rounded-lg" : ""
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <label className="block cursor-pointer">
                <div
                  className={`flex items-center gap-3 px-4 py-2.5 border rounded-lg transition-all duration-200 ${
                    isDragActive
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-[var(--border)] hover:border-blue-400"
                  } bg-[var(--background)] min-h-[48px]`}
                >
                  {plan.imagen_preview ? (
                    <>
                      <img
                        src={plan.imagen_preview}
                        alt="Preview"
                        className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                      />
                      <span className="text-sm text-[var(--text)] truncate flex-1">
                        {truncateFileName(plan.imagen?.name || "Imagen")}
                      </span>
                      <span className="text-blue-500 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveImage();
                        }}
                        className="p-1 text-blue-400 hover:text-white hover:bg-blue-500 rounded-md transition-all duration-200 flex-shrink-0 ml-1"
                        title="Eliminar imagen"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <svg
                        className={`w-5 h-5 flex-shrink-0 transition-colors ${
                          isDragActive ? "text-blue-500" : "text-[var(--muted)]"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm text-[var(--text)] flex-1">
                        {isDragActive
                          ? "Suelta la imagen aquí"
                          : "Seleccionar o arrastrar imagen"}
                      </span>
                      <span className="text-xs text-[var(--muted)] flex-shrink-0">
                        PNG, JPG, WEBP
                      </span>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {isDragActive && (
                <div className="absolute inset-0 bg-blue-500/5 rounded-lg pointer-events-none" />
              )}
            </div>
            <p className="text-xs text-amber-500 mt-1.5">
              La subida de imagen aún no está disponible; por ahora el plan se crea sin imagen.
            </p>
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
              Nombre
            </label>
            <Input
              name="nombre"
              value={plan.nombre}
              onChange={handleChange}
              placeholder="Ej: Plan Mensual"
              className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
            />
          </div>

          {/* Tiempo y Costo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
                Tiempo (meses)
              </label>
              <Input
                type="number"
                name="tiempo_meses"
                value={plan.tiempo_meses}
                onChange={handleChange}
                placeholder="Ej: 1"
                className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
                Costo (COP)
              </label>
              <Input
                type="number"
                name="costo"
                value={plan.costo}
                onChange={handleChange}
                placeholder="Ej: 45000"
                className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
              Descripción
            </label>
            <Textarea
              name="descripcion"
              value={plan.descripcion}
              onChange={handleChange}
              placeholder="Describe el plan..."
              rows={3}
              className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)] resize-none"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-[var(--text)]">
            <input
              type="checkbox"
              name="destacado"
              checked={plan.destacado}
              onChange={handleChange}
              className="w-4 h-4"
            />
            Marcar como destacado
          </label>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button
          variant="ghost"
          onClick={handleClose}
          className="text-[var(--text)] hover:bg-[var(--hover)]"
        >
          Cancelar
        </Button>
        <Button onClick={handleSave}>
          Crear plan
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreatePlansModal;