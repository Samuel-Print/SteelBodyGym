import { getModalClass } from './modalVariants';

const Modal = ({
  isOpen,
  onClose,
  children,
  variant = 'default',
  size = 'md',
  className = '',
  showClose = true,
  closeOnOverlay = true,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-[rgba(17,24,39,.45)] backdrop-blur-sm flex items-center justify-center p-5"
      onClick={handleOverlayClick}
    >
      <div className={`w-full ${getModalClass(variant, size)} overflow-hidden ${className}`}>
        {children}
      </div>
    </div>
  );
};

export const ModalHeader = ({ children, className = '', icon = null, ...props }) => {
  return (
    <div className={`p-[22px_24px] border-b border-[var(--border)] flex items-center gap-3.5 ${className}`} {...props}>
      {icon && (
        <span className="w-[44px] h-[44px] rounded-[12px] bg-[linear-gradient(135deg,var(--primary),var(--primary-light))] text-white flex items-center justify-center">
          {icon}
        </span>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export const ModalBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 grid gap-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const ModalFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`px-6 py-[18px] border-t border-[var(--border)] flex justify-end gap-2.5 bg-[var(--surface-2)] ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Modal;