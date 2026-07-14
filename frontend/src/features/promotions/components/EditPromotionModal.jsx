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

const EditPromotionModal = ({
  open,
  onClose,
  promotion,
  onSave,
}) => {
  // Estado para los datos de la promoción
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha_caducacion: "",
    imagen: null,
    imagen_preview: null,
  });

  // Estado para la hora
  const [hora, setHora] = useState("12");
  const [minuto, setMinuto] = useState("00");
  const [periodo, setPeriodo] = useState("AM");
  const [isDragActive, setIsDragActive] = useState(false);

  // Snapshot de los valores originales, para detectar si hubo cambios
  const [initialData, setInitialData] = useState(null);

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

  // EFECTO PARA ACTUALIZAR LOS DATOS CUANDO CAMBIA LA PROP 'promotion'
  useEffect(() => {
    if (promotion) {
      const nombreInicial = promotion.nombre || "";
      const descripcionInicial = promotion.descripcion || "";
      const fechaInicial = promotion.fecha_caducacion
        ? promotion.fecha_caducacion.split('T')[0]
        : "";

      // Actualizar formData
      setFormData({
        nombre: nombreInicial,
        descripcion: descripcionInicial,
        fecha_caducacion: fechaInicial,
        imagen: null,
        imagen_preview: promotion.imagen || null,
      });

      // Extraer y actualizar hora
      let horaInicial = "12";
      let minutoInicial = "00";
      let periodoInicial = "AM";

      if (promotion.fecha_caducacion) {
        const time = promotion.fecha_caducacion.split('T')[1]?.split(':') || [];
        let h = parseInt(time[0] || 0);
        const m = time[1] || '00';
        let periodoValue = 'AM';
        
        if (h >= 12) {
          periodoValue = 'PM';
          if (h > 12) h -= 12;
        }
        if (h === 0) h = 12;
        
        horaInicial = String(h).padStart(2, '0');
        minutoInicial = m;
        periodoInicial = periodoValue;

        setHora(horaInicial);
        setMinuto(minutoInicial);
        setPeriodo(periodoInicial);
      } else {
        setHora("12");
        setMinuto("00");
        setPeriodo("AM");
      }

      // Guardamos el snapshot original para poder comparar más adelante
      setInitialData({
        nombre: nombreInicial,
        descripcion: descripcionInicial,
        fecha_caducacion: fechaInicial,
        hora: horaInicial,
        minuto: minutoInicial,
        periodo: periodoInicial,
      });
    } else {
      // Resetear si no hay promoción
      setFormData({
        nombre: "",
        descripcion: "",
        fecha_caducacion: "",
        imagen: null,
        imagen_preview: null,
      });
      setHora("12");
      setMinuto("00");
      setPeriodo("AM");
      setInitialData(null);
    }
  }, [promotion]); // Dependencia: se ejecuta cuando 'promotion' cambia

  // Función para convertir a formato 24h
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

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Procesar imagen
  const processImage = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imagen: file,
          imagen_preview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else if (file) {
      toast("El archivo seleccionado no es una imagen válida.", {
        icon: InfoIcon,
        className: infoToastClassName,
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
    setFormData((prev) => ({
      ...prev,
      imagen: null,
      imagen_preview: null,
    }));
  };

  // Drag and drop handlers
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

  // Truncar nombre de archivo
  const truncateFileName = (name, maxLength = 30) => {
    if (name.length <= maxLength) return name;
    const extension = name.split('.').pop();
    const nameWithoutExt = name.slice(0, name.lastIndexOf('.'));
    const truncated = nameWithoutExt.slice(0, maxLength - 3 - extension.length);
    return `${truncated}...${extension}`;
  };

  // ¿El usuario modificó algo respecto a los datos originales?
  const hasChanges = () => {
    if (!initialData) return true;

    return (
      formData.nombre.trim() !== initialData.nombre.trim() ||
      formData.descripcion.trim() !== initialData.descripcion.trim() ||
      formData.fecha_caducacion !== initialData.fecha_caducacion ||
      hora !== initialData.hora ||
      minuto !== initialData.minuto ||
      periodo !== initialData.periodo ||
      formData.imagen !== null // se seleccionó una imagen nueva
    );
  };

  const validate = () => {
    const isNombreEmpty = !formData.nombre.trim();
    const isFechaEmpty = !formData.fecha_caducacion;
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

    const fechaCompleta = new Date(
      `${formData.fecha_caducacion}T${convertTo24h()}`
    );
    if (fechaCompleta.getTime() <= Date.now()) {
      toast("La fecha y hora de caducidad deben ser futuras.", {
        icon: InfoIcon,
        className: infoToastClassName,
        style: toastStyle,
      });
      return false;
    }

    if (!hasChanges()) {
      toast("No has realizado ningún cambio en la promoción.", {
        icon: InfoIcon,
        className: infoToastClassName,
        style: toastStyle,
      });
      return false;
    }

    return true;
  };

  // Manejar guardado
  const handleSave = async () => {
    if (!validate()) return;

    // TODO: cuando el backend tenga Multer listo, volver a incluir la imagen
    // y cambiar promotionService.update para enviar FormData en vez de JSON.
    const dataToSend = {
      id_promocion: promotion?.id_promocion, // Mantener el ID de la promoción
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      fecha_caducacion: `${formData.fecha_caducacion}T${convertTo24h()}`,
    };

    try {
      await toast.promise(
        Promise.resolve(onSave(dataToSend)),
        {
          loading: "Guardando cambios...",
          success: "Promoción actualizada correctamente.",
          error: "No se pudo actualizar la promoción. Intenta de nuevo.",
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
      onClose();
    } catch (error) {
      // El error ya se muestra vía toast.promise; se conserva el modal
      // abierto para que el usuario pueda corregir o reintentar.
    }
  };

  // Manejar cierre
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalHeader
        icon={
          <svg
            className="w-[22px] h-[22px] stroke-current fill-none stroke-2"
            viewBox="0 0 24 24"
          >
            <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
          </svg>
        }
      >
        <h3 className="text-[18px] font-head font-bold text-[var(--text)]">
          Editar promoción
        </h3>

        <p className="text-[13px] text-[var(--muted)]">
          Modifica la información de la promoción.
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
                  {formData.imagen_preview ? (
                    <>
                      <img
                        src={formData.imagen_preview}
                        alt="Preview"
                        className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                      />
                      <span className="text-sm text-[var(--text)] truncate flex-1">
                        {truncateFileName(formData.imagen?.name || "Imagen")}
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
              La subida de imagen aún no está disponible; por ahora los cambios se guardan sin imagen.
            </p>
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
              Nombre
            </label>
            <Input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: 2x1 Plan Mensual"
              className="w-full bg-[var(--background)] border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)]"
            />
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
                Fecha de caducidad
              </label>
              <Input
                type="date"
                name="fecha_caducacion"
                value={formData.fecha_caducacion}
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
              value={formData.descripcion}
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
          Guardar cambios
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditPromotionModal;