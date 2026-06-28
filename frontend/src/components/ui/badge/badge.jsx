import { getBadgeClass } from './badgeVariants';

const Badge = ({ 
  children, 
  variant = 'blue', 
  className = '', 
  dot = true,
  ...props 
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${getBadgeClass(variant)} ${className}`}
      {...props}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
};

export default Badge;