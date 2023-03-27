/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
        screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
       colors: {
        lightGrey: 'rgba(0, 0, 0, 0.056)',
        veryLightBlack: 'rgba(50, 43, 46, 0.737)',
        lightBlack: 'rgba(50, 43, 46, 0.937)',
        superLightBlack: 'rgba(50, 43, 46, 0.237)'
      },
      spacing: {
        "3px":'1px'
      }
    },
  },
  plugins: [],
};
