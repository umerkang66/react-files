/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // In the theme we override it, if we want to extend it, we have to add it in the extend tab.
    fontFamily: {
      // 'sans' is the default value, if we change this, every font in the document will be changed
      sans: 'Roboto Mono, monospace',
    },
    extend: {
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
