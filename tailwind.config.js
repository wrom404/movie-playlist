/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        semiDark: '#121212',
        dark: '#1c1c21'
      },
      screens: {
        'xs': '375px',
        'xxs': '320px'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

