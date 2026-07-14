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
<div
  className={`flex justify-center mb-5 ${getEmptyStateClass(variant)}`}
>
  {icon || (
    <svg
      className="w-16 h-16 stroke-current fill-none stroke-2"
      viewBox="0 0 24 24"
    >
      ...
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