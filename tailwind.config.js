module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          550: '#00a82d',
        },
      },
      boxShadow: {
        'even-1': '0 0 3px 2px rgba(0, 0, 0, 0.05)',
        'even-2': '0 0 4px 2px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage: {},
    },
  },
  plugins: [],
};
