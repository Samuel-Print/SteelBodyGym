const PageHeader = ({
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">

      <div>
        <h1 className="text-[26px] font-head font-extrabold text-[var(--text)]">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-[var(--muted)]">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}

    </div>
  );
};

export default PageHeader;