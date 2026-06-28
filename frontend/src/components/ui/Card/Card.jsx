import { getCardClass } from './cardVariants';

const Card = ({ children, variant = 'default', className = '', ...props }) => {
  return (
    <div className={`${getCardClass(variant)} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-[22px_24px] border-b border-[var(--border)] flex items-center gap-3.5 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 grid gap-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`px-6 py-[18px] border-t border-[var(--border)] flex justify-end gap-2.5 bg-[var(--surface-2)] ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;