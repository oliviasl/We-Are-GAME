const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          50: "#FAF7EB",
          100: "#F3EED2",
          200: "#E8DDA6",
          300: "#D8C669",
          400: "#C6AE33",
          500: "#A28E2A",
          600: "#928026",
          700: "#7E6E21",
          800: "#695C1B",
          900: "#494013",
        },
        semantic: {
          'danger': '#7B2525',
          'warning': '#A3902B',
          'success': '#468C49',
          'info': '#465E8C',
        },
        brand: {
          'gray-20': '#333333',
          'gray-75': '#D9D9D9',
          'gray-90': '#E6E6E6',
          'gray-95': '#F3F3F3',
          'green-45': '#577347',
          'green-90': '#D2E5C7',
          'blue-90': '#AAC3E5',
          'blue-95': '#D1DFF2',
          'white': '#FFFFFF',
          'black': '#1A1A1A',
        },
      },
      fontFamily: {
        'grotesk': ['Schibsted Grotesk', 'sans-serif'],
        'circular-std': ['Circular Std', 'sans-serif'],
      },
      borderWidth: {
        '1': '1px',
      },
      padding: {
        '0.5': '0.125rem',
      },
      height: {
        '25': '8.5rem',
      },
    },
  },
  plugins: [],
})

