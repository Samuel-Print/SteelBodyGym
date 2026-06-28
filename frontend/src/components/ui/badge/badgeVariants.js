export const badgeVariants = {
  green: 'bg-[var(--success-bg)] text-[var(--success)]',
  amber: 'bg-[var(--warning-bg)] text-[var(--warning)]',
  red: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  blue: 'bg-[var(--info-bg)] text-[var(--primary-light)]',
  gray: 'bg-[var(--surface-2)] text-[var(--muted)]',
  purple: 'bg-[var(--violet-bg)] text-[var(--violet)]',
};


export const getBadgeClass = (variant = 'blue') => {
  return badgeVariants[variant] || badgeVariants.blue;
};