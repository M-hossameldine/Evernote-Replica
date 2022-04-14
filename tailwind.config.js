module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          550: '#00a82d',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
