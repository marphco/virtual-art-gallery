/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      ssm: "375px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1024px",
      xxl: "1440px",
    },
    extend: {
      height: {
        '400': '400px',
      },
    },
  },
  plugins: [],
};
