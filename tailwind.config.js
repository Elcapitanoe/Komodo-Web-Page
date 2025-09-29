/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#f7f9fc',
        'custom-card': '#fff',
        'custom-text': '#0f172a',
        'custom-muted': '#64748b',
        'custom-accent': '#2563eb',
        'custom-border': '#e5e7eb',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Ubuntu', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'skeleton': 'skeleton 1.2s infinite',
      },
      keyframes: {
        skeleton: {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '200% 0' },
        },
      },
    },
  },
  plugins: [],
}