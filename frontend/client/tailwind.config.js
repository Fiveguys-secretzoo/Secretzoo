/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily:{
        'DNFBitBitv2':['DNFBitBitv2']
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}