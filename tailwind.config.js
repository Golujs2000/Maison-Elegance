/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A1918',
          hover: '#2E2B29',
          light: '#3C3835',
        },
        gold: {
          50: '#FBF8F3',
          100: '#F5EFE4',
          200: '#EADEC9',
          300: '#DCB779',
          400: '#D4B886',
          DEFAULT: '#C5A880',
          dark: '#A6885E',
          600: '#8E714B',
        },
        cream: {
          50: '#FCFBF9',
          DEFAULT: '#FAF7F2',
          100: '#F5EFE6',
          200: '#EDE4D5',
          300: '#E1D3BF',
        },
        sand: {
          DEFAULT: '#E7DFD3',
          dark: '#D4C9BA',
        },
        charcoal: {
          DEFAULT: '#262422',
          light: '#423F3C',
          muted: '#736E69',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(197, 168, 128, 0.15)',
        'luxury-hover': '0 20px 40px -15px rgba(26, 25, 24, 0.12)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(197, 168, 128, 0.08)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.95' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2.5s infinite ease-in-out',
      }
    },
  },
  plugins: [],
}
