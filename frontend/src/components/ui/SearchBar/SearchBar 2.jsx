import { getSearchBarClass } from './searchBarVariants';

const SearchBar = ({
  variant = 'default',
  size = 'md',
  className = '',
  placeholder = 'Buscar...',
  value,
  onChange,
  onSearch,
  ...props
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`relative flex-1 min-w-[220px] ${className}`}>
      <svg
        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[var(--muted)] stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`w-full pl-[42px] rounded-[var(--radius-sm)] outline-none transition-all duration-300 text-[var(--text)] placeholder:text-[var(--muted)] ${getSearchBarClass(variant, size)}`}
        {...props}
      />
    </div>
  );
};

export default SearchBar;