/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',  // Ensures all React files are scanned
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
