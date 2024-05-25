import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      letterSpacing: {
        4: '-0.4px',
        32: '-0.32px',
        112: '-1.12px',
        28: ' -0.28px',
        128: '-1.28px',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: '#00C7FF',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: '#00C7FF',
        grey500: '#808080',
        secondaryBtnBg: '#F6F6F6',
        secondaryBtnText: '#D8D8D8',
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        arial: ['var(--font-arial)'],
      },
      fontSize: {
        '3xl': '28px',
      },
      boxShadow: {
        light:
          '0px 0px 1px 0px rgba(0, 199, 255, 0.50) inset, 0px 8px 16px 0px rgba(0, 199, 255, 0.15)',
        inner:
          '0px 0px 1px 0px rgba(0, 199, 255, 0.50) inset, 2px 2px 4px 0px rgba(0, 199, 255, 0.25) inset',
        inner2: '0px 0px 1px 0px rgba(0, 199, 255, 0.50) inset',
        primary: '0px 2px 2px 0px rgba(0, 199, 255, 0.25)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')],
} satisfies Config;

export default config;
