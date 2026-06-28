export const statsCardVariants = {
  default: 'bg-[var(--info-bg)] text-[var(--primary-light)]',
  success: 'bg-[var(--success-bg)] text-[var(--success)]',
  warning: 'bg-[var(--warning-bg)] text-[var(--warning)]',
  danger: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  violet: 'bg-[var(--violet-bg)] text-[var(--violet)]',
};

export const getStatsCardClass = (variant = 'default') => {
  return statsCardVariants[variant] || statsCardVariants.default;
};