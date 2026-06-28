export const loadingVariants = {
  primary: 'border-[var(--primary-light)]',
  accent: 'border-[var(--accent)]',
  white: 'border-white',
  muted: 'border-[var(--muted)]',
};

export const loadingSizes = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
  xl: 'w-16 h-16 border-4',
};

export const getLoadingClass = (variant = 'primary', size = 'md') => {
  return `${loadingVariants[variant] || loadingVariants.primary} ${loadingSizes[size] || loadingSizes.md}`;
};