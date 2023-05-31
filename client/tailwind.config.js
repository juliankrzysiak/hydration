/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-calendar/dist/*.css",
  ],
  //   safelist: [".react-calendar__tile"],
  theme: {
    extend: {},
  },
  plugins: [],
};
