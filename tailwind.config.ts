import * as flowbite from 'flowbite-react/tailwind';
import { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'selector',
  content: ['./src/**/*.tsx', flowbite.content()],
  plugins: [flowbite.plugin()],
  theme: {
    extend: {
      screens: {
        desktop: '1282px',
      },
      animation: {
        marquee: 'marquee var(--duration) linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(calc(-100% - 0.5rem))' },
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'var(--font-mplus)',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      rotate: {
        '0.03': '0.03deg',
      },
      transitionDelay: {
        2000: '2000ms',
      },
      zIndex: {
        99: '99',
      },
    }
  }
};

export default config;
