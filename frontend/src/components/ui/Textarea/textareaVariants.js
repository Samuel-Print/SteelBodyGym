export const textareaVariants = {
  default: 'border-[var(--border)] bg-[var(--background)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]',
  primary: 'border-[var(--primary-light)] bg-[var(--background)] focus:border-[var(--primary-light)] focus:ring-2 focus:ring-[var(--accent-soft)]',
  error: 'border-[var(--danger)] bg-[var(--danger-bg)] focus:border-[var(--danger)] focus:ring-2 focus:ring-[var(--danger-bg)]',
  success: 'border-[var(--success)] bg-[var(--success-bg)] focus:border-[var(--success)] focus:ring-2 focus:ring-[var(--success-bg)]',
};

export const textareaSizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-[13px] py-[11px] text-sm',
  lg: 'px-4 py-3 text-base',
};

export const getTextareaClass = (variant = 'default', size = 'md') => {
  return `${textareaVariants[variant] || textareaVariants.default} ${textareaSizes[size] || textareaSizes.md}`;
};