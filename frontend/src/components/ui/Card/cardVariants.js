export const cardVariants = {
  default: 'bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] shadow-sm',
  hover: 'bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] shadow-sm hover:border-[var(--primary-light)] hover:shadow-md transition-all duration-300',
  primary: 'bg-[var(--card)] border border-[var(--primary-light)] rounded-[var(--radius)] shadow-md',
  surface: 'bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] shadow-sm',
};

export const getCardClass = (variant = 'default') => {
  return cardVariants[variant] || cardVariants.default;
};