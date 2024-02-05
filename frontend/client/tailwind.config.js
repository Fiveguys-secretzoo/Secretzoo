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
      },
    },
    backgroundImage: {
      "rankingbackground": 'url("./assets/img/rankingbackground.png")',
      "mainlogo": 'url("./assets/img/login/logo2.png")',
    },
  },
  plugins: [require("flowbite/plugin")],
};
