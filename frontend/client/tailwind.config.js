/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        DNFBitBitv2: ["DNFBitBitv2"],
        Maplestory: ["Maplestory"]
      },
      backgroundColor: {
        'custom-opacity': 'rgba(0, 0, 0, 0.7)',
        'custom-opacity2': 'rgba(62, 50, 50, 0.7)',
      },
    },
    backgroundImage: {
      "gold-medal" : 'url(./assets/img/ranking/gold-medal.png)',
      "silver-medal" : 'url(./assets/img/ranking/silver-medal.png)',
      "bronze-medal" : 'url(./assets/img/ranking/bronze-medal.png)',
      "main-logo" : 'url(./assets/img/main-logo.png)',
      "ranking-bg" : 'url(./assets/img/ranking/ranking-bg.png)',
      "login-bg" : 'url(./assets/img/bg.png)',
      "lobby-bg" : 'url(./assets/img/bg.png)',
      "play-bg" : 'url(./assets/img/3.png)',
    },
  },
  plugins: [require("flowbite/plugin")],
};
