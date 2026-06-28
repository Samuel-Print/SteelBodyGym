export const BENEFITS = [
  { ico: 'target', title: 'Entrenamiento Semipersonalizado', text: 'Rutinas diseñadas a tu medida según tus metas, nivel y disponibilidad.' },
  { ico: 'activity', title: 'Tecnología de seguimiento', text: 'Mide tu progreso con valoraciones periódicas y reportes de evolución.' },
  { ico: 'apple', title: 'Asesoría nutricional', text: 'Acompañamiento de profesionales para potenciar tus resultados.' },
  { ico: 'zap', title: 'Zona de fuerza y cardio', text: 'Áreas amplias con máquinas, peso libre y equipos de cardio de alta gama.' },
  { ico: 'heart-pulse', title: 'Clases dirigidas', text: 'Spinning, funcional, crossfit y yoga guiados por instructores certificados.' },
  { ico: 'shield', title: 'Espacio seguro y limpio', text: 'Instalaciones desinfectadas, ventiladas y con protocolos de seguridad.' }
];

export const PROMOS = [
  { nombre: 'Plan año', caducacion: '2026-12-31', descripcion: '2 meses gratis al pagar el plan anual.' },
  { nombre: 'Plan amigos/pareja', caducacion: '2026-08-30', descripcion: 'Trae a un amigo y obtén 20% de descuento.' },
  { nombre: 'Plan estudiante', caducacion: '2026-07-15', descripcion: 'Presenta tu carné y ahorra en tu mensualidad.' }
];

export const PLANS = [
  { nombre: 'Plan mensual', tiempo: '1 mes', costo: 90000 },
  { nombre: 'Plan 15 días', tiempo: '15 días', costo: 55000 },
  { nombre: 'Plan estudiante', tiempo: '1 mes', costo: 70000 },
  { nombre: 'Plan amigos/pareja', tiempo: '1 mes', costo: 160000 },
  { nombre: 'Plan trimestre', tiempo: '3 meses', costo: 240000 },
  { nombre: 'Plan semestral', tiempo: '6 meses', costo: 450000 },
  { nombre: 'Plan año', tiempo: '12 meses', costo: 800000 },
  { nombre: 'Valor día', tiempo: '1 día', costo: 8000 }
];

export const SEDES = [
  { nombre: 'Sede Centro', ubicacion: 'Calle 10 #5-20, Centro', horario: 'Lun-Sáb 5:00am - 10:00pm' },
  { nombre: 'Sede Norte', ubicacion: 'Av. Norte #45-12', horario: 'Lun-Vie 5:00am - 9:00pm' }
];

export const CLASSES = [
  { nombre: 'Spinning', horario: '2026-06-25T06:00', duracion: '45 min' },
  { nombre: 'Crossfit', horario: '2026-06-25T18:00', duracion: '60 min' },
  { nombre: 'Funcional', horario: '2026-06-26T07:00', duracion: '50 min' },
  { nombre: 'Yoga', horario: '2026-06-26T19:00', duracion: '60 min' }
];

export const IMGS = [
  'photo-1571902943202-507ec2618e8f',
  'photo-1534438327276-14e5300c3a48',
  'photo-1517836357463-d25dfeac3438',
  'photo-1581009146145-b5ef050c2e1e',
  'photo-1599058917212-d750089bc07e',
  'photo-1605296867304-46d5465a13f1',
  'photo-1574680096145-d05b474e2155',
  'photo-1540497077202-7c8a3999166f'
];

export const money = (n) => '$' + Number(n).toLocaleString('es-CO');
export const fmtDate = (d) => new Date(d).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
export const fmtDateTime = (d) => new Date(d).toLocaleString('es-CO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });