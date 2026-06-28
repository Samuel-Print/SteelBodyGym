export const paginationVariants = {
  default: 'border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:bg-[var(--surface-2)]',
  active: 'border-[var(--primary)] bg-[var(--primary)] text-white',
  disabled: 'border-[var(--border)] bg-[var(--card)] text-[var(--text)] opacity-45 cursor-default',
};

export const getPaginationClass = (variant = 'default') => {
  return paginationVariants[variant] || paginationVariants.default;
};