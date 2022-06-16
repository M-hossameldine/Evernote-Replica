module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
      colors: {
        green: {
          450: '#14cc45',
          550: '#00a82d',
        },
      },
      boxShadow: {
        'even-1': '0 0 3px 2px rgba(0, 0, 0, 0.05)',
        'even-2': '0 0 4px 2px rgba(0, 0, 0, 0.2)',
        'even-3': '0 0 14px 1px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage: {},
      spacing: {
        '1/10': '10%',
        '1//20': '5%',
      },
      content: {
        'arrow-angle-up':
          'url("/src/assets/images/tw-icons/tw-expand-arrow.svg")',
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
};
