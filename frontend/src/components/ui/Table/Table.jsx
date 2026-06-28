import { getTableClass, thClass, tdClass, trClass } from './tableVariants';

const Table = ({ children, variant = 'default', className = '', ...props }) => {
  return (
    <div className={`${getTableClass(variant)} ${className}`} {...props}>
      <table className="w-full border-collapse">
        {children}
      </table>
    </div>
  );
};

export const TableHead = ({ children, className = '', ...props }) => {
  return <thead className={className} {...props}>{children}</thead>;
};

export const TableBody = ({ children, className = '', ...props }) => {
  return <tbody className={className} {...props}>{children}</tbody>;
};

export const TableRow = ({ children, className = '', hover = true, ...props }) => {
  return (
    <tr className={`${hover ? trClass : ''} ${className}`} {...props}>
      {children}
    </tr>
  );
};

export const TableHeader = ({ children, className = '', ...props }) => {
  return (
    <th className={`${thClass} ${className}`} {...props}>
      {children}
    </th>
  );
};

export const TableCell = ({ children, className = '', align = 'left', ...props }) => {
  return (
    <td className={`${tdClass} ${align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'} ${className}`} {...props}>
      {children}
    </td>
  );
};

export default Table;