/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        surface: '#080810',
        panel:   '#0d0d18',
        accent:  '#c4a46b',
        dim:     '#8a8070',
      },
      backgroundImage: {
        'radial-accent': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(196,164,107,0.13) 0%, transparent 70%)',
        'radial-mid':    'radial-gradient(ellipse 60% 50% at 80% 60%, rgba(196,164,107,0.07) 0%, transparent 60%)',
      },
      animation: {
        'marquee':  'marquee 32s linear infinite',
        'marquee2': 'marquee2 32s linear infinite',
        'fadein':   'fadein 0.7s ease both',
        'float':    'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        marquee:  { '0%': { transform: 'translateX(0%)' },   '100%': { transform: 'translateX(-50%)' } },
        marquee2: { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0%)' } },
        fadein:   { from: { opacity: 0, transform: 'translateY(18px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        float:    { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
  plugins: [],
}
