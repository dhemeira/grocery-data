/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=business]'],
          primary: '#eab308',
          '--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
          '--rounded-btn': '0.5rem', // border radius rounded-btn utility class, used in buttons and similar element
          '--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
        },
      },
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=bumblebee]'],
        },
      },
    ],
  },
};
