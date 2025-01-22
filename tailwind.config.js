/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      sans: ['ui-sans-serif', 'system-ui'],
    },
    extend: {
      colors: {
        darkBlue: '#021526',
      },
    },
  },
  plugins: [],
};
