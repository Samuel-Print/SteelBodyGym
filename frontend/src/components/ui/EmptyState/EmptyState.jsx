import { getEmptyStateClass, getEmptyStateBgClass } from './emptyStateVariants';

const EmptyState = ({
  title = 'No hay datos disponibles',
  description = 'No se encontraron registros para mostrar.',
  icon = null,
  action = null,
  variant = 'default',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}>
      <div
        className={`w-[72px] h-[72px] rounded-full flex items-center justify-center mb-5 ${getEmptyStateBgClass(variant)} ${getEmptyStateClass(variant)}`}
      >
        {icon || (
          <svg
            className="w-8 h-8 stroke-current fill-none stroke-2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        )}
      </div>
      <h3 className="text-[18px] font-head font-bold text-[var(--text)] mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-[var(--muted)] leading-relaxed max-w-[340px]">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default EmptyState;