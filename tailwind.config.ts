// @ts-ignore
import tailwindMdBase from '@geoffcodesthings/tailwind-md-base';
import tailwindScrollbar from 'tailwind-scrollbar';
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      green: colors.green['500'],
      red: colors.red['500'],
      transparent: colors.transparent,
      primary: '#137987',
      paper: '#1A1A1B',
      button: {
        bg: '#393939',
        bgHover: '#5e5e5e',
      },
      scroll: {
        item: '#1A1A1B',
        bg: '#5e5e5e',
      },
      tab: {
        borderActive: '#8B8B8B',
        borderHover: '#656464',
      },
    },
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    markdownBase: {
      wrapperClass: 'markdown',
      summary: {
        fontSize: '1.5rem',
      },
      h1: {
        borderBottom: '1px solid #1A1A1B',
      },
      li: {
        '> p': {
          display: 'inline',
        },
      },
      a: {
        color: '#137987',
        textDecoration: 'none',
        '&:hover': {
          color: '#137987',
          textDecoration: 'underline',
        },
      },
      code: {
        backgroundColor: '#1A1A1B',
        fontSize: '1rem',
      },
      pre: {
        backgroundColor: '#1A1A1B',
        marginBottom: defaultTheme.spacing[10],
        borderRadius: defaultTheme.borderRadius['md'],
        overflow: 'hidden',
        '& > div > pre': {
          marginBottom: defaultTheme.spacing[0],
        },
        '& code': {
          backgroundColor: 'transparent',
          margin: 0,
          padding: 0,
          overflow: 'auto',
        },
      },
    },
    extend: {
      fontFamily: {
        zp: ['var(--font-zp)'],
        hisqaida: ['var(--font-hisqaida)'],
      },
    },
  },
  plugins: [tailwindMdBase(), tailwindScrollbar({})],
};
export default config;
