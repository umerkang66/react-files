import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-dark': '#1f1f1f',
        primary: '#ffffff',
        highlight: {
          dark: '#FFFFFF',
          light: '#1f1f1f',
        },
        secondary: {
          dark: '#707070',
          light: '#e6e6e6',
        },
        action: '#3B82F6',
      },
      transitionProperty: {
        width: 'width',
      },
    },
    backgroundImage: {
      'png-pattern': "url('/empty-bg.jpg')",
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
