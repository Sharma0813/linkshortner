/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1800px', // optional, for ultra-wide screens
      },
      animation: {
        gradient: "gradient 15s ease infinite",
      },
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      boxShadow: {
        soft: "0 12px 41px -11px rgba(199,199,199,0.4)",
      },
      colors: {
        purpleLight: "#8a53fe",
        cyanLight: "#19a89d",
        errorRed: "#f00",
      },
    },
  },
  plugins: [],
};
