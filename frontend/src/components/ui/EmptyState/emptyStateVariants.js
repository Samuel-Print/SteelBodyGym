export const emptyStateVariants = {
  default: 'text-[var(--muted)]',
  primary: 'text-[var(--primary-light)]',
  accent: 'text-[var(--accent)]',
};

export const getEmptyStateClass = (variant = 'default') => {
  return emptyStateVariants[variant] || emptyStateVariants.default;
};