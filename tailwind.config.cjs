/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch', // add required value here
          }
        }
      }
    },
  },
  plugins: [
    require("tailwindcss-all"),
    require('@tailwindcss/typography'),
  ],
}
