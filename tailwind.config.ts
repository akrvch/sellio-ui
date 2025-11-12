import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        indigo: {
          600: '#7574FF',
          500: '#818BFC',
          300: '#BBC0FF',
          100: '#DDE0FF',
          50: '#E6E8FA',
        },
        green: {
          400: '#34C58F',
          300: '#76DEB8',
          200: '#B3F7DE',
          100: '#CCFAE9',
          50: '#E5FDF4',
        },
        lilac: {
          500: '#A686F5',
          400: '#BEA1FE',
          200: '#E0D0FF',
          100: '#F3EBFF',
          50: '#F9F5FF',
        },
        yellow: {
          400: '#F9D147',
          300: '#FFDE6A',
          200: '#FFEBA4',
          100: '#FFF3C7',
          50: '#FFF9E3',
        },
        red: {
          600: '#E85B67',
          500: '#FF7279',
          300: '#FEAAA9',
          100: '#FFDAD9',
          50: '#FFECEC',
        },
        gray: {
          600: '#C4C4C4',
          500: '#DBDBDB',
          300: '#E3E3E3',
          100: '#F2F2F1',
          50: '#FAFAFA',
        },
        'brand-black': '#1B1A1A',
        'brand-gray': '#959595',
      },
    },
  },
  plugins: [],
} satisfies Config


