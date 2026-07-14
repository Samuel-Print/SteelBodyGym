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

const initialBranch = {
  nombre: "",
  direccion: "",
  latitud: "",
  longitud: "",
  horario_atencion: "",
  telefono: "",
  imagen: null,
  imagen_preview: null,
};

const CreateBranchModal = ({ open, onClose, onSave }) => {
  const [branch, setBranch] = useState(initialBranch);
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
    setBranch((prev) => ({ ...prev, [name]: value }));
  };

  const processImage = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBranch((prev) => ({ ...prev, imagen: file, imagen_preview: reader.result }));
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
    setBranch((prev) => ({ ...prev, imagen: null, imagen_preview: null }));
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
    const isNombreEmpty = !branch.nombre.trim();
    const isDireccionEmpty = !branch.direccion.trim();
    const isHorarioEmpty = !branch.horario_atencion.trim();

    const isLatInvalida = branch.latitud !== "" && (isNaN(Number(branch.latitud)) || Number(branch.latitud) < -90 || Number(branch.latitud) > 90);
    const isLngInvalida = branch.longitud !== "" && (isNaN(Number(branch.longitud)) || Number(branch.longitud) < -180 || Number(branch.longitud) > 180);

    if (isNombreEmpty || isDireccionEmpty || isHorarioEmpty) {
      toast(
        isNombreEmpty
          ? "Falta ingresar el nombre de la sede."
          : isDireccionEmpty
          ? "Falta ingresar la dirección."
          : "Falta ingresar el horario de atención.",
        { icon: InfoIcon, className: infoToastClassName, style: toastStyle }
      );
      return false;
    }

    if (isLatInvalida || isLngInvalida) {
      toast(
        isLatInvalida
          ? "La latitud debe estar entre -90 y 90."
          : "La longitud debe estar entre -180 y 180.",
        { icon: InfoIcon, className: infoToastClassName, style: toastStyle }
      );
      return false;
    }

    return true;
  };

  const handleClose = () => {
    setBranch(initialBranch);
    onClose();
  };

  const handleSave = async () => {
    if (!validate()) return;

    // TODO: cuando el backend tenga Multer listo, incluir la imagen
    // y cambiar branches.service.create para enviar FormData en vez de JSON.
    const dataToSend = {
      nombre: branch.nombre.trim(),
      direccion: branch.direccion.trim(),
      horario_atencion: branch.horario_atencion.trim(),
      telefono: branch.telefono.trim() || null,
      latitud: branch.latitud !== "" ? Number(branch.latitud) : null,
      longitud: branch.longitud !== "" ? Number(branch.longitud) : null,
    };

    try {
      await toast.promise(
        Promise.resolve(onSave(dataToSend)),
        {
          loading: "Creando sede...",
          success: "Sede creada correctamente.",
          error: "No se pudo crear la sede. Intenta de nuevo.",
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
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        }
      >
        <h3 className="text-[18px] font-head font-bold text-[var(--text)]">Nueva sede</h3>
        <p className="text-[13px] text-[var(--muted)]">Crea una nueva sede del gimnasio.</p>
      </ModalHeader>

      <ModalBody>
        <div className="max-h-[70vh] overflow-y-auto pr-1 space-y-4">
          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
              Imagen de la sede
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
                  {branch.imagen_preview ? (
                    <>
                      <img src={branch.imagen_preview} alt="Preview" className="w-10 h-10 object-cover rounded-md flex-shrink-0" />
                      <span className="text-sm text-[var(--text)] truncate flex-1">
                        {truncateFileName(branch.imagen?.name || "Imagen")}
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
              La subida de imagen aún no está disponible; por ahora la sede se crea sin imagen.
            </p>
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Nombre</label>
            <Input
              name="nombre"
              value={branch.nombre}
              onChange={handleChange}
              placeholder="Ej: Sede Centro"
              className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
            />
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Dirección</label>
            <Input
              name="direccion"
              value={branch.direccion}
              onChange={handleChange}
              placeholder="Ej: Cra. 7 #45-12, Chapinero, Bogotá"
              className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
            />
          </div>

          {/* Latitud y Longitud */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
                Latitud <span className="text-[var(--muted)] font-normal">(opcional)</span>
              </label>
              <Input
                type="number"
                step="any"
                name="latitud"
                value={branch.latitud}
                onChange={handleChange}
                placeholder="Ej: 4.60971"
                className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
                Longitud <span className="text-[var(--muted)] font-normal">(opcional)</span>
              </label>
              <Input
                type="number"
                step="any"
                name="longitud"
                value={branch.longitud}
                onChange={handleChange}
                placeholder="Ej: -74.08175"
                className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
              />
            </div>
          </div>

          {/* Horario de atención */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Horario de atención</label>
            <Input
              name="horario_atencion"
              value={branch.horario_atencion}
              onChange={handleChange}
              placeholder="Ej: Lun–Sáb · 5:00 AM – 10:00 PM"
              className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
              Teléfono <span className="text-[var(--muted)] font-normal">(opcional)</span>
            </label>
            <Input
              name="telefono"
              value={branch.telefono}
              onChange={handleChange}
              placeholder="Ej: 3001234567"
              className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
            />
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={handleClose} className="text-[var(--text)] hover:bg-[var(--hover)]">
          Cancelar
        </Button>
        <Button onClick={handleSave}>
          Crear sede
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateBranchModal;