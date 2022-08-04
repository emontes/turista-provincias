/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      roboto: ['Roboto, helvetica'],
      helvetica: ['"Helvetica Neue", Helvetica, Arial, san-serif'],
    },
    extend: {},
  },
  plugins: [],
}
