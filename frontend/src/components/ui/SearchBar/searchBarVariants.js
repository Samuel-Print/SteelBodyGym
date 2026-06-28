export const searchBarVariants = {
  default: 'border-[var(--border)] bg-[var(--card)] focus-within:border-[var(--primary-light)] focus-within:ring-2 focus-within:ring-[var(--accent-soft)]',
  primary: 'border-[var(--primary-light)] bg-[var(--card)] focus-within:border-[var(--primary-light)] focus-within:ring-2 focus-within:ring-[var(--accent-soft)]',
  surface: 'border-[var(--border)] bg-[var(--surface)] focus-within:border-[var(--primary-light)] focus-within:ring-2 focus-within:ring-[var(--accent-soft)]',
};

export const searchBarSizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2.5 text-base',
};

export const getSearchBarClass = (variant = 'default', size = 'md') => {
  return `${searchBarVariants[variant] || searchBarVariants.default} ${searchBarSizes[size] || searchBarSizes.md}`;
};