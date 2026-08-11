/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        app: {
          text: '#000000',
          'text-secondary': '#60646C',
          bg: '#ffffff',
          element: '#F0F0F3',
          selected: '#E0E1E6',
        },
        'app-dark': {
          text: '#ffffff',
          'text-secondary': '#B0B4BA',
          bg: '#000000',
          element: '#212225',
          selected: '#2E3135',
        },
        yellow: 'var(--color-yellow)',
        red: 'var(--color-red)',
        blue: 'var(--color-blue)',
        vanilla: 'var(--color-vanilla)',
        white: 'var(--color-white)',
      },
    },
  },
  plugins: [],
};
