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

const initialPromotion = {
  nombre: "",
  descripcion: "",
  fecha_caducacion: "",
  hora_caducacion: "",
  imagen: null,
  imagen_preview: null,
};

const CreatePromotionModal = ({ open, onClose, onSave }) => {
  const [promotion, setPromotion] = useState(initialPromotion);
  const [isDragActive, setIsDragActive] = useState(false);
  const [hora, setHora] = useState("12");
  const [minuto, setMinuto] = useState("00");
  const [periodo, setPeriodo] = useState("AM");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const processImage = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPromotion((prev) => ({
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
    if (file) {
      processImage(file);
    }
  };

  const handleRemoveImage = () => {
    setPromotion((prev) => ({
      ...prev,
      imagen: null,
      imagen_preview: null,
    }));
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
    if (file) {
      processImage(file);
    }
  };

  const convertTo24h = () => {
    let h = parseInt(hora, 10);

    if (periodo === "PM" && h !== 12) {
      h += 12;
    }

    if (periodo === "AM" && h === 12) {
      h = 0;
    }

    return `${String(h).padStart(2, "0")}:${minuto}:00`;
  };

  // Arma un objeto Date real a partir de la fecha (input date) + hora
  // seleccionadas. Como el navegador interpreta el string
  // "YYYY-MM-DDTHH:mm:ss" (sin zona) como hora LOCAL del usuario, este
  // Date ya representa el instante correcto. A partir de aquí siempre
  // se debe usar .toISOString() para mandar la fecha al backend, nunca
  // el string local a secas, porque ese string no lleva información de
  // zona horaria y el backend no tiene forma de saber a qué huso
  // horario corresponde.
  const buildFechaCaducacion = () => {
    return new Date(`${promotion.fecha_caducacion}T${convertTo24h()}`);
  };

  const handleClose = () => {
    setPromotion(initialPromotion);
    setHora("12");
    setMinuto("00");
    setPeriodo("AM");
    onClose();
  };

  // El color del toast se pasa como `style` (no className), porque
  // react-hot-toast aplica un `style` inline por defecto que gana sobre
  // las clases Tailwind. Usamos las variables CSS del proyecto para que
  // el navegador resuelva el color correcto según el tema activo, sin
  // tener que detectar "modo oscuro" desde JS.
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

  const validate = () => {
    const isNombreEmpty = !promotion.nombre.trim();
    const isFechaEmpty = !promotion.fecha_caducacion;
    const emptyCount = [isNombreEmpty, isFechaEmpty].filter(Boolean).length;

    if (emptyCount === 2) {
      toast("Debes completar todos los campos obligatorios.", {
        icon: InfoIcon,
        className: infoToastClassName,
        style: toastStyle,
      });
      return false;
    }

    if (emptyCount === 1) {
      toast(
        isNombreEmpty
          ? "Falta ingresar el nombre de la promoción."
          : "Falta seleccionar la fecha de caducidad.",
        {
          icon: InfoIcon,
          className: infoToastClassName,
          style: toastStyle,
        }
      );
      return false;
    }

    const fechaCompleta = buildFechaCaducacion();
    if (fechaCompleta.getTime() <= Date.now()) {
      toast("La fecha y hora de caducidad deben ser futuras.", {
        icon: InfoIcon,
        className: infoToastClassName,
        style: toastStyle,
      });
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    // TODO: cuando el backend tenga Multer listo, volver a incluir la imagen
    // y cambiar promotionService.create para enviar FormData en vez de JSON.
    //
    // FIX zona horaria: antes se mandaba el string local a secas
    // ("2026-07-19T20:00:00"), sin indicar la zona horaria. El backend
    // no tiene forma de saber si esas 20:00 son en Bogotá, UTC, etc.,
    // y terminaba aplicando un offset incorrecto (o doble) al guardar.
    // Con .toISOString() convertimos explícitamente a UTC antes de
    // enviarlo (ej: "2026-07-20T01:00:00.000Z"), eliminando la ambigüedad.
    const dataToSend = {
      nombre: promotion.nombre,
      descripcion: promotion.descripcion,
      fecha_caducacion: buildFechaCaducacion().toISOString(),
    };

    try {
      await toast.promise(
        Promise.resolve(onSave(dataToSend)),
        {
          loading: "Creando promoción...",
          success: "Promoción creada correctamente.",
          error: "No se pudo crear la promoción. Intenta de nuevo.",
        },
        {
          className: infoToastClassName,
          style: toastStyle,
          loading: {
            style: toastStyle,
            iconTheme: {
              primary: "#3696e5",
              secondary: "var(--background)",
            },
          },
          success: {
            style: toastStyle,
            iconTheme: {
              primary: "#3696e5",
              secondary: "var(--background)",
            },
          },
          error: {
            style: toastStyle,
          },
        }
      );
      handleClose();
    } catch (error) {
      // El error ya se muestra vía toast.promise; se conserva el modal
      // abierto para que el usuario pueda corregir o reintentar.
    }
  };

  const truncateFileName = (name, maxLength = 30) => {
    if (name.length <= maxLength) return name;
    const extension = name.split('.').pop();
    const nameWithoutExt = name.slice(0, name.lastIndexOf('.'));
    const truncated = nameWithoutExt.slice(0, maxLength - 3 - extension.length);
    return `${truncated}...${extension}`;
  };

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalHeader
        icon={
          <svg
            className="w-6 h-6 stroke-current fill-none stroke-[2.2]"
            viewBox="0 0 24 24"
          >
            <path d="m15 5 4 4M13.5 3.5 21 11l-9 9-7.5-.5L4 12z" />
          </svg>
        }
      >
        <h3 className="text-[18px] font-head font-bold text-[var(--text)]">
          Nueva promoción
        </h3>
        <p className="text-[13px] text-[var(--muted)]">
          Crea una nueva promoción.
        </p>
      </ModalHeader>

      <ModalBody>
        <div className="space-y-4">
          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
              Imagen de la promoción
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
                  {promotion.imagen_preview ? (
                    <>
                      <img
                        src={promotion.imagen_preview}
                        alt="Preview"
                        className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                      />
                      <span className="text-sm text-[var(--text)] truncate flex-1">
                        {truncateFileName(promotion.imagen?.name || "Imagen")}
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
              La subida de imagen aún no está disponible; por ahora la promoción se crea sin imagen.
            </p>
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
              Nombre
            </label>
            <Input
              name="nombre"
              value={promotion.nombre}
              onChange={handleChange}
              placeholder="Ej: 2x1 Plan Mensual"
              className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
            />
          </div>

          {/* Fecha y Hora - SIMPLIFICADO */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
                Fecha de caducidad
              </label>
              <Input
                type="date"
                name="fecha_caducacion"
                value={promotion.fecha_caducacion}
                onChange={handleChange}
                className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] [color-scheme:dark]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
                Hora de caducidad
              </label>
              <div className="flex gap-2">

                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="flex-1 px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const value = String(i + 1).padStart(2, "0");
                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </select>

                <span className="self-center text-[var(--text)] font-semibold">:</span>

                <select
                  value={minuto}
                  onChange={(e) => setMinuto(e.target.value)}
                  className="flex-1 px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {Array.from({ length: 60 }, (_, i) => {
                    const value = String(i).padStart(2, "0");
                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </select>

                <select
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  className="px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>

              </div>
              <p className="text-xs text-[var(--muted)] mt-1">
                Formato 12 horas (ej: 02:30 PM)
              </p>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
              Descripción
            </label>
            <Textarea
              name="descripcion"
              value={promotion.descripcion}
              onChange={handleChange}
              placeholder="Describe la promoción..."
              rows={3}
              className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)] resize-none"
            />
          </div>
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
          Crear promoción
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreatePromotionModal;