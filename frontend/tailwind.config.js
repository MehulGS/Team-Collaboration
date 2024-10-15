// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        background: '#000000',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
