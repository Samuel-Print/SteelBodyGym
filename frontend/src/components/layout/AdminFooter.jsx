const AdminFooter = () => {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--card)] py-5 mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <p className="text-sm text-[var(--muted)] font-medium">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-[var(--text)]">
            ProGangster
          </span>
          . Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default AdminFooter;