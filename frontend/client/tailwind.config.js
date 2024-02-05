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
    backgroundImage: {
      "rankingbackground" : 'url("./assets/img/rankingbackground.png")',
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}