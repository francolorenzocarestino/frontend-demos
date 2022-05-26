const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'orange-primary': {
          DEFAULT: '#ff5100'
        },
        'orange-darkMode': {
          DEFAULT: '#ff7433'
        },
        'payne-primary': {
          DEFAULT: '#323e48'
        },
        'silver-primary': {
          DEFAULT: '#f5f7fa'
        },
        'gray-darkMode': {
          DEFAULT: '#29292e'
        },
        'white-darkMode': {
          DEFAULT: '#e0e0e0'
        },
        'black-darkMode': {
          DEFAULT: '#1c1c1c'
        },
        'gray-primary': {
          DEFAULT: '#f5f5f7'
        },
        'gray-secondary': {
          DEFAULT: '#a9aeb3'
        },
        'green-ok': {
          DEFAULT: '#32d048'
        },
        'red-error': {
          DEFAULT: '#b7262c'
        },
        'gray-tertiary': {
          DEFAULT: '#e9e9e9'
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans]
      },
      screens: {
        mobile: { max: '1023px' },
        xld: '1200px',
        desktop: '1023px',
        xs: '321px',
        lmd: '400px',
        ml: '500px',
        tablet: '980px',
        ...defaultTheme.screens
      }
    }
  },
  plugins: []
}
