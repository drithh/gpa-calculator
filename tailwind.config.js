module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    extend: {
      animation: {
        'height-enter': 'expand 0.5s linear',
        'height-exit': 'shrink 1s linear',
      },
      keyframes: {
        expand: {
          '0%': { height: '0px', opacity: 0 },
          '70%': { height: '72px' },
          '100%': { height: '64px', opacity: 1 },
        },
        shrink: {
          '0%': { height: '64px' },
          '40%': { height: '72px' },
          '70%, 100%': { height: '0px', opacity: 0 },
        },
      },
      fontFamily: {
        PT: ['PT Sans', 'sans-serif'],
        Josefin: ['Josefin Sans', 'sans-serif'],
        Source: ['Source Sans Pro', 'sans-serif'],
      },
      colors: {
        primary: '#424242',
        secondary: '#aaaaaa',
      },
      letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        widest: '.15em',
      },
    },
  },
  plugins: [],
};
