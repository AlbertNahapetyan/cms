/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
            350: "#4CAF50"
        },
      },
      width: {
        "table-width": "calc(80% - 16px)"
      },
      spacing: {
        "table-margin": "calc(20% + 8px)"
      },
      animation: {
        spin: "spin 1s linear infinite"
      },
      keyframes: {
        spin:  {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
      },
    },
  },
  plugins: [],
};
