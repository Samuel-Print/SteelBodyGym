import { getInputClass } from './inputVariants';

const Input = ({
  variant = 'default',
  size = 'md',
  className = '',
  icon = null,
  iconPosition = 'left',
  ...props
}) => {
  const baseStyles = 'w-full rounded-[var(--radius-sm)] outline-none transition-all duration-300 text-[var(--text)] placeholder:text-[var(--muted)]';

  return (
    <div className="relative">
      {icon && iconPosition === 'left' && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]">
          {icon}
        </span>
      )}
      <input
        className={`${baseStyles} ${getInputClass(variant, size)} ${icon && iconPosition === 'left' ? 'pl-10' : ''} ${icon && iconPosition === 'right' ? 'pr-10' : ''} ${className}`}
        {...props}
      />
      {icon && iconPosition === 'right' && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]">
          {icon}
        </span>
      )}
    </div>
  );
};

export default Input;