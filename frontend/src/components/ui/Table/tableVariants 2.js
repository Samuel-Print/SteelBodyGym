export const tableVariants = {
  default: 'bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] shadow-sm overflow-hidden',
  striped: 'bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] shadow-sm overflow-hidden',
  hover: 'bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] shadow-sm overflow-hidden',
};

export const getTableClass = (variant = 'default') => {
  return tableVariants[variant] || tableVariants.default;
};

export const thClass = 'text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]';

export const tdClass = 'px-5 py-[15px] border-b border-[var(--border)] text-sm text-[var(--text)]';

export const trClass = 'hover:bg-[var(--surface-2)] transition';