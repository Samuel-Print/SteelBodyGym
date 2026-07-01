export const BENEFITS = [
  { ico: 'target', title: 'Entrenamiento Semipersonalizado', text: 'Rutinas diseñadas a tu medida según tus metas, nivel y disponibilidad.' },
  { ico: 'dumbbell', title: 'Equipamiento profesional', text: 'Máquinas de última generación y peso libre para todos los niveles.' },
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
  { nombre: 'Plan mensual', tiempo: '1 mes', costo: 85000 },
  { nombre: 'Plan 15 días', tiempo: '15 días', costo: 60000 },
  { nombre: 'Plan estudiante', tiempo: '1 mes', costo: 70000 },
  { nombre: 'Plan amigos/pareja', tiempo: '1 mes', costo: 75000 },
  { nombre: 'Plan trimestre', tiempo: '3 meses', costo: 240000 },
  { nombre: 'Plan semestral', tiempo: '6 meses', costo: 450000 },
  { nombre: 'Plan año', tiempo: '12 meses', costo: 840000 },
  { nombre: 'Valor Clase', tiempo: '1 día', costo: 14000 }
];

export const SEDES = [
  {
    nombre: 'Steel Body Gym',
    ubicacion: 'Cl. 37 #8 - 24, Dosquebradas, Risaralda',
    horario: {
      principal: 'Lunes a Jueves: 5:00 AM - 10:00 PM',
      completo: [
        'Lunes a Jueves: 5:00 AM - 10:00 PM',
        'Viernes: 5:00 AM - 9:00 PM',
        'Sábados y Festivos: 7:00 AM - 4:00 PM',
        'Domingos: 8:00 AM - 1:00 PM',
      ],
    },
  },

  {
    nombre: 'Proximamente',
  },
];

export const CLASSES = [
  {
    nombre: 'Clase Funcional',
    horario: '2026-07-01T07:00',
    duracion: '60 min'
  },
  {
    nombre: 'Clase Funcional',
    horario: '2026-07-01T19:00',
    duracion: '60 min'
  },
  {
    nombre: 'Clase Rumba',
    horario: '2026-06-30T07:00',
    duracion: '60 min'
  },
  {
    nombre: 'Clase Rumba',
    horario: '2026-07-02T19:00',
    duracion: '60 min'
  },
  {
    nombre: 'Clase Rumba',
    horario: '2026-07-04T09:00',
    duracion: '60 min'
  }
];

export const ACTIVITIES = [
  {
    nombre: 'Reto 30 días',
    sede: 'Steel Body Gym',
    horario: '2026-07-10T18:30'
  },

  {
    nombre: 'Master Class Funcional',
    sede: 'Steel Body Gym',
    horario: '2026-07-18T09:00'
  },

  {
    nombre: 'Competencia de Peso Muerto',
    sede: 'Steel Body Gym',
    horario: '2026-08-02T16:00'
  }
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