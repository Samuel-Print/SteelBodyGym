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

const initialActivity = {
  nombre: "",
  sede: "",
  horario: "",
  descripcion: "",
  imagen: null,
  imagen_preview: null,
};

const CreateActivityModal = ({ open, onClose, onSave }) => {
  const [activityInfo, setActivityInfo] = useState(initialActivity);
  const [isDragActive, setIsDragActive] = useState(false);

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
    setActivityInfo((prev) => ({ ...prev, [name]: value }));
  };

  const processImage = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setActivityInfo((prev) => ({ ...prev, imagen: file, imagen_preview: reader.result }));
      };
      reader.readAsDataURL(file);
    } else if (file) {
      toast.error("El archivo seleccionado no es una imagen válida.", { style: toastStyle });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) processImage(file);
  };

  const handleRemoveImage = () => {
    setActivityInfo((prev) => ({ ...prev, imagen: null, imagen_preview: null }));
  };

  const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragActive(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragActive(false); };
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragActive(true); };
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
    if (!activityInfo.nombre.trim()) {
      toast("Falta ingresar el nombre de la actividad.", {
        icon: InfoIcon, className: infoToastClassName, style: toastStyle,
      });
      return false;
    }

    if (!activityInfo.sede.trim()) {
      toast("Falta ingresar la sede de la actividad.", {
        icon: InfoIcon, className: infoToastClassName, style: toastStyle,
      });
      return false;
    }

    if (!activityInfo.horario) {
      toast("Falta seleccionar la fecha y hora de la actividad.", {
        icon: InfoIcon, className: infoToastClassName, style: toastStyle,
      });
      return false;
    }

    return true;
  };

  const handleClose = () => {
    setActivityInfo(initialActivity);
    onClose();
  };

  const handleSave = async () => {
    if (!validate()) return;

    // TODO: cuando el backend tenga Multer listo, incluir la imagen.
    const dataToSend = {
      nombre: activityInfo.nombre.trim(),
      sede: activityInfo.sede.trim(),
      horario: new Date(activityInfo.horario).toISOString(),
      descripcion: activityInfo.descripcion.trim(),
    };

    try {
      await toast.promise(
        Promise.resolve(onSave(dataToSend)),
        {
          loading: "Creando actividad...",
          success: "Actividad creada correctamente.",
          error: "No se pudo crear la actividad. Intenta de nuevo.",
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
            <path d="m12 2 2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21.4 8 14 2 9.4h7.6z" />
          </svg>
        }
      >
        <h3 className="text-[18px] font-head font-bold text-[var(--text)]">Nueva actividad</h3>
        <p className="text-[13px] text-[var(--muted)]">Crea una nueva actividad del gimnasio.</p>
      </ModalHeader>

      <ModalBody>
        <div className="space-y-4">
          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
              Imagen de la actividad
            </label>
            <div
              className={`relative transition-all duration-200 ${isDragActive ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[var(--background)] rounded-lg" : ""}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <label className="block cursor-pointer">
                <div className={`flex items-center gap-3 px-4 py-2.5 border rounded-lg transition-all duration-200 ${isDragActive ? "border-blue-500 bg-blue-500/10" : "border-[var(--border)] hover:border-blue-400"} bg-[var(--background)] min-h-[48px]`}>
                  {activityInfo.imagen_preview ? (
                    <>
                      <img src={activityInfo.imagen_preview} alt="Preview" className="w-10 h-10 object-cover rounded-md flex-shrink-0" />
                      <span className="text-sm text-[var(--text)] truncate flex-1">
                        {truncateFileName(activityInfo.imagen?.name || "Imagen")}
                      </span>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRemoveImage(); }}
                        className="p-1 text-blue-400 hover:text-white hover:bg-blue-500 rounded-md transition-all duration-200 flex-shrink-0 ml-1"
                        title="Eliminar imagen"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <svg className={`w-5 h-5 flex-shrink-0 transition-colors ${isDragActive ? "text-blue-500" : "text-[var(--muted)]"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-[var(--text)] flex-1">
                        {isDragActive ? "Suelta la imagen aquí" : "Seleccionar o arrastrar imagen"}
                      </span>
                      <span className="text-xs text-[var(--muted)] flex-shrink-0">PNG, JPG, WEBP</span>
                    </>
                  )}
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <p className="text-xs text-amber-500 mt-1.5">
              La subida de imagen aún no está disponible; por ahora la actividad se crea sin imagen.
            </p>
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Nombre</label>
            <Input
              name="nombre"
              value={activityInfo.nombre}
              onChange={handleChange}
              placeholder="Ej: Torneo de crossfit"
              className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
            />
          </div>

          {/* Sede */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Sede</label>
            <Input
              name="sede"
              value={activityInfo.sede}
              onChange={handleChange}
              placeholder="Ej: Sede Centro"
              className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
            />
          </div>

          {/* Fecha y hora */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Fecha y hora</label>
            <input
              type="datetime-local"
              name="horario"
              value={activityInfo.horario}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text)] text-sm [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Descripción</label>
            <Textarea
              name="descripcion"
              value={activityInfo.descripcion}
              onChange={handleChange}
              placeholder="Describe la actividad..."
              rows={3}
              className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)] resize-none"
            />
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={handleClose} className="text-[var(--text)] hover:bg-[var(--hover)]">
          Cancelar
        </Button>
        <Button onClick={handleSave}>
          Crear actividad
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateActivityModal;