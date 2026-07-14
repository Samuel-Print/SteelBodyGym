import { getPaginationClass } from './paginationVariants';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showItems = true,
  itemsCount = 0,
  totalItems = 0,
  label = "registros",
  className = '',
}) => {
  if (totalPages <= 1) return null;
  
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 3;
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    if (currentPage <= 2) end = Math.min(totalPages, maxVisible);
    if (currentPage >= totalPages - 1) start = Math.max(1, totalPages - maxVisible + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className={`flex items-center justify-between text-[13px] text-[var(--muted)] ${className}`}>
      {showItems && <span> Mostrando {itemsCount} de {totalItems} {label} </span>}
      <div className="flex gap-1.5 ml-auto">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`min-w-[34px] h-[34px] rounded-[9px] border font-semibold text-[13px] ${getPaginationClass(currentPage === 1 ? 'disabled' : 'default')}`}
        >
          ‹
        </button>
        {renderPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`min-w-[34px] h-[34px] rounded-[9px] border font-semibold text-[13px] ${getPaginationClass(page === currentPage ? 'active' : 'default')}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`min-w-[34px] h-[34px] rounded-[9px] border font-semibold text-[13px] ${getPaginationClass(currentPage === totalPages ? 'disabled' : 'default')}`}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Pagination;