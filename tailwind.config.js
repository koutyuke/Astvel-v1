/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    extend: {
      colors: {
        black: {
          DEFAULT: "#000000",
          1: "#171717",
          2: "#232323",
          3: "#323232",
        },
      },
    },
  },
  plugins: [],
};
