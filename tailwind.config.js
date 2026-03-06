/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          500: "#5B6CFF",
          600: "#4C5BFF",
          700: "#3B4BFF"
        }
      },
      boxShadow: {
        card: "0 12px 30px rgba(17, 24, 39, 0.10)"
      }
    }
  },
  plugins: []
};

