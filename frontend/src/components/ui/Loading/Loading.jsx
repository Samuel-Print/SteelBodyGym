import { getLoadingClass } from './loadingVariants';

const Loading = ({
  variant = 'primary',
  size = 'md',
  className = '',
  text = 'Cargando...',
  showText = false,
  ...props
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`rounded-full border-t-transparent animate-spin ${getLoadingClass(variant, size)} ${className}`}
        {...props}
      />
      {showText && <span className="text-sm text-[var(--muted)]">{text}</span>}
    </div>
  );
};

export default Loading;