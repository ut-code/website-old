module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        // https://www.tailwindshades.com/
        primary: {
          main: "#00D372",
          50: "#8CFFCA",
          100: "#77FFC1",
          200: "#4EFFAE",
          300: "#26FF9B",
          400: "#00FC88",
          500: "#00D372",
          600: "#009B54",
          700: "#006335",
          800: "#002B17",
          900: "#000000",
        },
        secondary: {
          main: "#0000AA",
          50: "#6363FF",
          100: "#4E4EFF",
          200: "#2525FF",
          300: "#0000FC",
          400: "#0000D3",
          500: "#0000AA",
          600: "#000072",
          700: "#00003A",
          800: "#000002",
          900: "#000000",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
