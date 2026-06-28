export const confirmDialogVariants = {
  danger: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  warning: 'bg-[var(--warning-bg)] text-[var(--warning)]',
  info: 'bg-[var(--info-bg)] text-[var(--primary-light)]',
};

export const getConfirmDialogClass = (variant = 'danger') => {
  return confirmDialogVariants[variant] || confirmDialogVariants.danger;
};