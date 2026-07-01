import React from 'react';
import { Icon } from '../common/Icons';
import { CLASSES, ACTIVITIES, fmtDateTime } from '../../data/data';

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const HOURS = ['06:00', '07:00', '08:00', '17:00', '18:00', '19:00'];

// ================= FUNCIÓN PARA FORMATEAR HORA A AM/PM =================
const formatHour = (hour) => {
  const [h, m] = hour.split(':');
  const hora = parseInt(h);
  const ampm = hora >= 12 ? 'PM' : 'AM';
  const hora12 = hora === 0 ? 12 : hora > 12 ? hora - 12 : hora;
  return `${hora12}:${m} ${ampm}`;
};

const Classes = () => {
  return (
    <section id="clases" className="py-[60px] md:py-[84px] bg-[var(--surface)]">
      <div className="container-custom">
        <div className="section-head max-w-[760px] mx-auto text-center mb-16">
          <span className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[var(--badge-bg)]
              px-[14px]
              py-[6px]
              text-[0.76rem]
              font-bold
              uppercase
              tracking-[2px]
              text-[#3696E5]
            ">
            <Icon name="calendar" className="w-4 h-4" />
            Horarios de clases
          </span>
          <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.1] font-extrabold font-head">Clases y actividades</h2>
          <p className="mt-5 max-w-[640px] mx-auto text-[1.12rem] text-[var(--muted)] leading-8">Reserva tu lugar en nuestras clases dirigidas semanales.</p>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
          {/* ================= TABLA DE CLASES ================= */}
          <div>
            {/* Título de la tabla */}
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              Clases
            </h3>

            <div className="overflow-x-auto rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)]">
              <div className="grid grid-cols-7 text-center">
                {/* Encabezado: Hora */}
                <div className="p-4 font-bold border-b border-r border-[var(--border)]">
                  Hora
                </div>

                {/* Encabezado: Días */}
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="p-4 font-bold border-b border-r last:border-r-0 border-[var(--border)]"
                  >
                    {day}
                  </div>
                ))}

                {/* Filas de horas */}
                {HOURS.map((hour) => (
                  <React.Fragment key={hour}>
                    {/* Columna de la hora */}
                    <div
                      className="border-r border-b border-[var(--border)] p-4 font-semibold text-[var(--accent)]"
                    >
                      {formatHour(hour)}
                    </div>

                    {/* Celdas para cada día */}
                    {DAYS.map((day) => {
                      const clase = CLASSES.find((c) => {
                        const fecha = new Date(c.horario);

                        const dias = [
                          'Dom',
                          'Lun',
                          'Mar',
                          'Mié',
                          'Jue',
                          'Vie',
                          'Sáb',
                        ];

                        const hora =
                          fecha.getHours().toString().padStart(2, '0') +
                          ':00';

                        return dias[fecha.getDay()] === day && hora === hour;
                      });

                      return (
                        <div
                          key={day + hour}
                          className="border-r last:border-r-0 border-b border-[var(--border)] min-h-[78px] p-2 flex items-center justify-center"
                        >
                          {clase && (
                            <div className="w-full rounded-xl bg-[var(--accent-soft)] p-2 text-center">
                              <div className="font-semibold text-sm">
                                {clase.nombre}
                              </div>
                              <div className="text-xs text-[var(--muted)] mt-1">
                                {clase.duracion}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* ================= ACTIVIDADES ================= */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Icon name="star" className="w-5 h-5 text-[var(--accent)]" />
              Actividades
            </h3>

            {ACTIVITIES.map((activity, index) => (
              <div
                key={index}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <Icon name="calendar" className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <div className="font-semibold">
                      {activity.nombre}
                    </div>

                    <div className="mt-2.5 flex items-center gap-2 text-sm text-[var(--muted)]">
                      <Icon name="map-pin" className="w-4 h-4 text-[var(--accent)]" />
                      <span>{activity.sede}</span>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm text-[var(--muted)]">
                      <Icon name="clock" className="w-4 h-4 text-[var(--accent)]" />
                      <span>{fmtDateTime(activity.horario)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Classes;