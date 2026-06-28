export const modalVariants = {
  default: 'bg-[var(--card)] rounded-[18px] shadow-lg',
  primary: 'bg-[var(--card)] rounded-[18px] shadow-lg border border-[var(--primary-light)]',
  surface: 'bg-[var(--surface)] rounded-[18px] shadow-lg',
};

export const modalSizes = {
  sm: 'max-w-[420px]',
  md: 'max-w-[520px]',
  lg: 'max-w-[680px]',
  xl: 'max-w-[880px]',
  full: 'max-w-[95vw]',
};

export const getModalClass = (variant = 'default', size = 'md') => {
  return `${modalVariants[variant] || modalVariants.default} ${modalSizes[size] || modalSizes.md}`;
};