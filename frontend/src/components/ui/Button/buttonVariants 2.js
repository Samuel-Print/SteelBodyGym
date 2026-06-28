export const buttonVariants = {
  primary: 'bg-[var(--primary)] text-white hover:bg-[var(--primary-light)] hover:-translate-y-0.5 hover:shadow-md',
  accent: 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] hover:-translate-y-0.5 hover:shadow-md',
  ghost: 'bg-[var(--card)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface-2)]',
  danger: 'bg-[var(--danger)] text-white hover:brightness-105 hover:-translate-y-0.5 hover:shadow-md',
  outline: 'border border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-[var(--surface-2)]',
  success: 'bg-[var(--success)] text-white hover:brightness-105 hover:-translate-y-0.5 hover:shadow-md',
};

export const buttonSizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const getButtonClass = (variant = 'primary', size = 'md') => {
  return `${buttonVariants[variant] || buttonVariants.primary} ${buttonSizes[size] || buttonSizes.md}`;
};