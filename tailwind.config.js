/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}", // must use this line to compile and generate our RizzUI components style
  ],
  theme: {
    extend: {
      animation: {
        blink: "blink 1.4s infinite both;",
        "scale-up": "scaleUp 500ms infinite alternate",
        "spin-slow": "spin 4s linear infinite",
        popup: "popup 500ms var(--popup-delay, 0ms) linear 1",
        skeleton: "skeletonWave 1.6s linear 0.5s infinite",
        "spinner-ease-spin": "spinnerSpin 0.8s ease infinite",
        "spinner-linear-spin": "spinnerSpin 0.8s linear infinite",
      },
    },
  },
  plugins: [],
};
