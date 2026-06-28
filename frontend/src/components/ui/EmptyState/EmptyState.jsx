import { getEmptyStateClass } from './emptyStateVariants';

const EmptyState = ({
  title = 'No hay datos disponibles',
  description = 'No se encontraron registros para mostrar.',
  icon = null,
  action = null,
  variant = 'default',
  className = '',
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className={`text-5xl mb-4 ${getEmptyStateClass(variant)}`}>
        {icon || (
          <svg className="w-16 h-16 mx-auto stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 8h8M8 12h6M8 16h4"/>
          </svg>
        )}
      </div>
      <h3 className="text-xl font-head font-bold text-[var(--text)]">{title}</h3>
      <p className="text-[var(--muted)] mt-2">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;