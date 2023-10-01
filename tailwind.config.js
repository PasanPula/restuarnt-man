/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
        pattern: /bg-./,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FCF9EF", //background
        headingColor: "#2e2e2e",
        cartNumBg: "#e80013",
        textColor: "#515151",
        cardOverlay: "rgba(256, 256, 256, 0.4)",
        btnOverlay: "rgba(255, 255, 255, 0.8)",
        lightGray: "#9ca0ab",
        containerbg: "rgba(255, 131, 0, 0.04)", //card bg
        cartBg: "#282a2c",
        cartItem: "#2e3033",
        cartTotal: "#343739",
        primeGold: '#9B804E', //primary colour
        primeGoldDark: '#645332',
        sideBarGold: '#e6d6ac', //sidebar colour
        sideBarGoldActive:'#947628', //sidebar btn active
        orderCardBg: '#ffffff', //order card bg
        btnColor: '#FCF9EF' //btn bg
      },
      display: ["group-hover"]
    },
  },
  plugins: [],
}