import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Sans"', 'sans-serif'],
        body:    ['"Plus Jakarta Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg: {
          base:     'var(--bg-base)',
          surface:  'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
        },
        theme: 'var(--text-primary)',
        violet: {
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
        },
        blue: {
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        indigo: {
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
      },
      // borderColor via variables CSS pour s'adapter au thème
      borderColor: {
        subtle:  'var(--border-subtle)',
        default: 'var(--border-default)',
        strong:  'var(--border-strong)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #a78bfa, #6366f1, #60a5fa)',
        'gradient-title': 'linear-gradient(135deg, #c4b5fd 0%, #93c5fd 50%, #818cf8 100%)',
        'gradient-btn':   'linear-gradient(135deg, #7c3aed, #4f46e5)',
      },
      animation: {
        'fade-up':    'fadeInUp 0.6s ease both',
        'float':      'float 8s ease-in-out infinite',
        'shimmer':    'shimmer 5s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow':  'spin 18s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 16px rgba(139,92,246,0.18)' },
          '50%':      { boxShadow: '0 0 32px rgba(139,92,246,0.40)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config