import { getSelectClass } from './selectVariants';

const Select = ({
  variant = 'default',
  size = 'md',
  className = '',
  options = [],
  placeholder = 'Seleccionar...',
  value,
  onChange,
  ...props
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`rounded-[var(--radius-sm)] outline-none transition-all duration-300 text-[var(--text)] font-medium cursor-pointer ${getSelectClass(variant, size)} ${className}`}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;