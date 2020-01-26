require('dotenv').config();

module.exports = {
  theme: {
    extend: {
      width: {
        app: `${process.env.REACT_APP_APP_WIDTH}px`
      },
      colors: {
        primary: '#EEC643',
        secondary: '#FADF63',
        tertiary: '#2287BA'
      },
      height: {
        app: `${process.env.REACT_APP_APP_HEIGHT}px`
      },
      minWidth: {
        '50': '50px',
        '6rem': '6rem'
      },
      minHeight: {
        '450': '450px'
      },
      fontFamily: {
        header: ['Montserrat', 'Arial', 'sans-serif']
      },
      margin: {
        'app-top': `${process.env.REACT_APP_HEADER_HEIGHT}px`
      }
    }
  },
  variants: {},
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scroll-margin-header': {
          'scroll-margin': `${process.env.REACT_APP_HEADER_HEIGHT}px`
        }
      });
    }
  ]
};
