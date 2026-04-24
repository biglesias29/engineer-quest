/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Press Start 2P"', 'monospace'],
        body: ['"Share Tech Mono"', 'monospace'],
      },
      colors: {
        void: '#050810',
        panel: '#0c1220',
        border: '#1a2840',
        neon: {
          cyan: '#00f5ff',
          green: '#39ff14',
          amber: '#ffb700',
          red: '#ff2d55',
          purple: '#bf5fff',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 4s ease-in-out infinite',
        'xp-fill': 'xpFill 1s ease-out forwards',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glow: {
          '0%': { textShadow: '0 0 4px currentColor' },
          '100%': { textShadow: '0 0 16px currentColor, 0 0 32px currentColor' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        xpFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--xp-width)' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 8px #00f5ff, 0 0 24px #00f5ff44',
        'neon-green': '0 0 8px #39ff14, 0 0 24px #39ff1444',
        'neon-amber': '0 0 8px #ffb700, 0 0 24px #ffb70044',
        'panel': 'inset 0 0 60px #00f5ff08, 0 0 0 1px #1a2840',
      },
    },
  },
  plugins: [],
}
