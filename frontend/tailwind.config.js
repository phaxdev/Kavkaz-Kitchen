module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-yellow': '#FFD700',
        'light-yellow': '#FFF8DC',
        'dark-yellow': '#FFC107',
        'gold': '#DAA520',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'pulse-slow': 'pulse 2s infinite',
        'slide-in': 'slideIn 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}