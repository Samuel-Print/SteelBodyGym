import { getConfirmDialogClass } from './confirmDialogVariants';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = '¿Eliminar este registro?',
  message = 'Esta acción no se puede deshacer. El registro se eliminará permanentemente del sistema.',
  confirmText = 'Sí, eliminar',
  cancelText = 'Cancelar',
  variant = 'danger',
  icon = null,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[rgba(17,24,39,.45)] backdrop-blur-sm flex items-center justify-center p-5">
      <div className="bg-[var(--card)] rounded-[18px] w-full max-w-[420px] shadow-lg overflow-hidden text-center">
        <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto mt-6 bg-[var(--info-bg)] ${getConfirmDialogClass(variant)}`}>
          {icon || (
            <svg className="w-[30px] h-[30px] stroke-[var(--primary)] fill-none stroke-2 stroke-linecap-round stroke-linejoin-round " viewBox="0 0 24 24">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          )}
        </div>
        <h3 className="text-[19px] font-head font-bold text-[var(--text)] mt-4">{title}</h3>
        <p className="text-[var(--muted)] text-sm mx-8 mb-6">{message}</p>
        <div className="px-6 py-[18px] border-t border-[var(--border)] flex justify-center gap-2.5 bg-transparent">
          <button
            onClick={onClose}
            className="flex items-center gap-2 border border-[var(--border)] rounded-[var(--radius-sm)] px-4 py-2 text-sm font-semibold bg-[var(--card)] text-[var(--text)] hover:bg-[var(--surface-2)] transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 bg-[var(--primary)] text-white rounded-[var(--radius-sm)] px-4 py-2 text-sm font-semibold hover:brightness-105 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;