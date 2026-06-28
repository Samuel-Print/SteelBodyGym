/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#3696e5',
          hover: '#2a7fc7',
          soft: 'rgba(54,150,229,.14)',
        },
        background: {
          DEFAULT: '#f9fafb',
          dark: '#000001',
        },
        foreground: {
          DEFAULT: '#111827',
          dark: '#ffffff',
        },
        surface: {
          DEFAULT: '#f5f7fa',
          dark: '#0b0e14',
          '2': '#eaeff5',
          '2-dark': '#141a24',
        },
        border: {
          DEFAULT: '#e5e7eb',
          dark: '#1f2733',
        },
        muted: {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
          dark: '#9aa6b6',
        },
        primary: {
          DEFAULT: '#0c4a6e',
          light: '#0284c7',
          lighter: '#38bdf8',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#111827',
          dark: '#0b0e14',
          'foreground-dark': '#ffffff',
        },
      },
      fontFamily: {
        head: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'custom': '14px',
        'custom-sm': '10px',
      },
      boxShadow: {
        'custom': '0 10px 30px rgba(0,0,0,.08)',
        'custom-dark': '0 10px 30px rgba(0,0,0,.5)',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Para manejar tema oscuro con clases
}