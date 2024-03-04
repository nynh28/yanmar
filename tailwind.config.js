module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  important: true,
  // prefix: 'tw-',
//   corePlugins: {
//     preflight: false
//   },
  theme: {
    fontFamily: {
      'pop': ['Poppins', 'sans-serif']
    },
    extend: {
        boxShadow: {
            '2xl' : '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)'
        },
      colors: {
        0: "#F0F2F5",
        50: "252D3F",
        100: "0D162A",
        primary: {
          100: "#1e88e519",
          200: "#1e88e533",
          300: "#1e88e54d",
          400: "#1e88e566",
          500: "#1e88e580",
          600: "#1e88e599",
          700: "#1e88e5b3",
          800: "#1e88e5cc",
          900: "#187bd1",
        },
      },
      margin: {
        13: "3.25rem",
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        8: "repeat(8, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
