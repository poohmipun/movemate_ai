/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        cyan: {
          50: "#f7f6ff",
          100: "#eeecfe",
          200: "#d5d1fd",
          300: "#bbb5fb",
          400: "#897df8",
          500: "#5645f5",
          600: "#4d3edd",
          700: "#4134b8",
          800: "#342993",
          900: "#2a2278",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
