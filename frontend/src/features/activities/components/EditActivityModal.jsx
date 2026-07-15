import { useState, useEffect } from "react";
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

// Convierte un valor ISO (ej. "2026-07-14T22:00:00.000Z") al formato que
// espera <input type="datetime-local"> (ej. "2026-07-14T22:00").
const toDatetimeLocal = (isoValue) => {
  if (!isoValue) return "";
  const date = new Date(isoValue);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const EditActivityModal = ({ open, onClose, activityData, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    sede: "",
    horario: "",
    descripcion: "",
    imagen: null,
    imagen_preview: null,
  });

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

  useEffect(() => {
    if (activityData) {
      setFormData({
        nombre: activityData.nombre || "",
        sede: activityData.sede || "",
        horario: toDatetimeLocal(activityData.horario),
        descripcion: activityData.descripcion || "",
        imagen: null,
        imagen_preview: activityData.imagen_url || null,
      });
    } else {
      setFormData({ nombre: "", sede: "", horario: "", descripcion: "", imagen: null, imagen_preview: null });
    }
  }, [activityData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const processImage = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagen: file, imagen_preview: reader.result }));
      };
      reader.readAsDataURL(file);
    } else if (file) {
      toast("El archivo seleccionado no es una imagen válida.", {
        icon: InfoIcon, className: infoToastClassName, style: toastStyle,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) processImage(file);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, imagen: null, imagen_preview: null }));
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
    if (!formData.nombre.trim()) {
      toast("Falta ingresar el nombre de la actividad.", {
        icon: InfoIcon, className: infoToastClassName, style: toastStyle,
      });
      return false;
    }

    if (!formData.sede.trim()) {
      toast("Falta ingresar la sede de la actividad.", {
        icon: InfoIcon, className: infoToastClassName, style: toastStyle,
      });
      return false;
    }

    if (!formData.horario) {
      toast("Falta seleccionar la fecha y hora de la actividad.", {
        icon: InfoIcon, className: infoToastClassName, style: toastStyle,
      });
      return false;
    }

    return true;
  };

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    if (!validate()) return;

    // TODO: cuando el backend tenga Multer listo, incluir la imagen.
    const dataToSend = {
      id_actividad: activityData?.id_actividad,
      nombre: formData.nombre.trim(),
      sede: formData.sede.trim(),
      horario: new Date(formData.horario).toISOString(),
      descripcion: formData.descripcion.trim(),
    };

    try {
      await toast.promise(
        Promise.resolve(onSave(dataToSend)),
        {
          loading: "Guardando cambios...",
          success: "Actividad actualizada correctamente.",
          error: "No se pudo actualizar la actividad. Intenta de nuevo.",
        },
        {
          className: infoToastClassName,
          style: toastStyle,
          loading: { style: toastStyle, iconTheme: { primary: "#3696e5", secondary: "var(--background)" } },
          success: { style: toastStyle, iconTheme: { primary: "#3696e5", secondary: "var(--background)" } },
          error: { style: toastStyle },
        }
      );
      onClose();
    } catch (error) {
      // El error ya se muestra vía toast.promise; se conserva el modal abierto.
    }
  };

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalHeader
        icon={
          <svg className="w-[22px] h-[22px] stroke-current fill-none stroke-2" viewBox="0 0 24 24">
            <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
          </svg>
        }
      >
        <h3 className="text-[18px] font-head font-bold text-[var(--text)]">Editar actividad</h3>
        <p className="text-[13px] text-[var(--muted)]">Modifica la información de la actividad.</p>
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
                  {formData.imagen_preview ? (
                    <>
                      <img src={formData.imagen_preview} alt="Preview" className="w-10 h-10 object-cover rounded-md flex-shrink-0" />
                      <span className="text-sm text-[var(--text)] truncate flex-1">
                        {truncateFileName(formData.imagen?.name || "Imagen")}
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
              La subida de imagen aún no está disponible; por ahora los cambios se guardan sin imagen.
            </p>
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Nombre</label>
            <Input
              name="nombre"
              value={formData.nombre}
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
              value={formData.sede}
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
              value={formData.horario}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text)] text-sm [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Descripción</label>
            <Textarea
              name="descripcion"
              value={formData.descripcion}
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
          Guardar cambios
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditActivityModal;