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
      "ranking-background" : 'url("./assets/img/rankingbackground.png")',
      "ranking-bar" : 'url(./assets/img/rankingbar.png)',
      "ranking-banner" : 'url(./assets/img/rankingbanner.png)',
      "ranking-123" : 'url(./assets/img/ranking123.png)',
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}