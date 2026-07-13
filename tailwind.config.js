/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
      colors: {
        // Muted, "engineering marker" palette for sticky-note accents.
        marker: {
          blue: '#1d4ed8',
          teal: '#0f766e',
          amber: '#b45309',
          violet: '#6d28d9',
          rose: '#be123c',
          green: '#15803d',
        },
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'card-hover': '0 8px 24px -8px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
}
