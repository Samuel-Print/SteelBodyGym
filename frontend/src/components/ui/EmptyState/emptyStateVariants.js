export const emptyStateVariants = {
  default: 'text-[var(--muted)]',
  primary: 'text-[var(--primary-light)]',
  accent: 'text-[var(--accent)]',
};

export const emptyStateBgVariants = {
  default: 'bg-[var(--surface-2)]',
  primary: 'bg-[var(--info-bg)]',
  accent: 'bg-[var(--info-bg)]',
};

export const getEmptyStateClass = (variant = 'default') => {
  return emptyStateVariants[variant] || emptyStateVariants.default;
};

export const getEmptyStateBgClass = (variant = 'default') => {
  return emptyStateBgVariants[variant] || emptyStateBgVariants.default;
};