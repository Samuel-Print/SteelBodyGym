import { useState, useEffect } from 'react';
import { Icon } from './Icons';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 grid place-items-center rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-200 cursor-pointer"
      title="Cambiar tema"
      aria-label="Cambiar tema"
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  );
};

export default ThemeToggle;