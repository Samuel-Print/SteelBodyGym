import { getStatsCardClass } from './statsCardVariants';

const StatsCard = ({
  value,
  label,
  icon = null,
  variant = 'default',
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] p-[18px_20px] shadow-sm flex items-center gap-4 hover:border-[var(--primary-light)] hover:shadow-md transition-all duration-300 cursor-default ${className}`}
      {...props}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getStatsCardClass(variant)}`}
      >
        {icon || (
          <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
            <path d="m15 5 4 4M13.5 3.5 21 11l-9 9-7.5-.5L4 12z"/>
          </svg>
        )}
      </div>
      <div>
        <div className="text-[22px] font-extrabold leading-[1.1] text-[var(--text)]">
          {value}
        </div>
        <div className="text-[12.5px] text-[var(--muted)] font-semibold">
          {label}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;