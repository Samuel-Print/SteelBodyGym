import { getButtonClass } from './buttonVariants';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  icon = null,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-semibold transition-all duration-150 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${getButtonClass(variant, size)} ${className}`}
      {...props}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;