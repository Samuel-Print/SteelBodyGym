import { getTextareaClass } from './textareaVariants';

const Textarea = ({
  variant = 'default',
  size = 'md',
  className = '',
  rows = 4,
  ...props
}) => {
  const baseStyles = 'w-full rounded-[var(--radius-sm)] outline-none resize-y min-h-[86px] transition-all duration-300 text-[var(--text)] placeholder:text-[var(--muted)]';

  return (
    <textarea
      rows={rows}
      className={`${baseStyles} ${getTextareaClass(variant, size)} ${className}`}
      {...props}
    />
  );
};

export default Textarea;