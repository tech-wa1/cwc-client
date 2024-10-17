/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "colorPrimary": "#49A59A",
        "colorInfo": "#49A59A",
        "colorSuccess": "#6B7AFE",
        "colorText": "#34475D",
        "colorBg": "#FFFFFF",
        "colorBg2": "#F5F5F5",
        "errorText": "#E23636"
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'feedback': "url('bg.jgp')",
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

