export const selectVariants = {
  default: 'border-[var(--border)] bg-[var(--card)] focus:border-[var(--primary-light)] focus:ring-2 focus:ring-[var(--accent-soft)]',
  primary: 'border-[var(--primary-light)] bg-[var(--card)] focus:border-[var(--primary-light)] focus:ring-2 focus:ring-[var(--accent-soft)]',
  surface: 'border-[var(--border)] bg-[var(--surface)] focus:border-[var(--primary-light)] focus:ring-2 focus:ring-[var(--accent-soft)]',
};

export const selectSizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-[14px] py-[11px] text-sm',
  lg: 'px-4 py-3 text-base',
};

export const getSelectClass = (variant = 'default', size = 'md') => {
  return `${selectVariants[variant] || selectVariants.default} ${selectSizes[size] || selectSizes.md}`;
};