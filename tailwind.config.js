/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CJC Brand palette — Deep Navy + Warm Antique Gold
        cjc: {
          navy:       '#0d1b2a',   // deepest navy — hero, footer, CTA sections
          blue:       '#163052',   // medium navy — hover, secondary dark
          blue2:      '#1e4080',   // lighter navy — subtle accents
          gold:       '#c8972a',   // antique gold — buttons, icons, badges
          'gold-mid': '#d4a843',   // lighter gold — hover state
          'gold-pale':'#fef3c7',   // pale gold — tag backgrounds
          cream:      '#faf6f0',   // warm off-white — alternating sections
          text:       '#1a1a2e',   // rich dark text
        },
        // Keep existing for backward compat (admin pages etc.)
        primary: {
          50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd',
          300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9',
          600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e',
        },
        secondary: {
          50: '#fefce8', 100: '#fef9c3', 200: '#fef08a',
          300: '#fde047', 400: '#facc15', 500: '#eab308',
          600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12',
        },
        navy: {
          50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0',
          300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b',
          600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a',
        }
      },
      fontFamily: {
        serif:  ['Playfair Display', 'Georgia', 'serif'],
        sans:   ['Inter', 'system-ui', 'sans-serif'],
        script: ['Crimson Text', 'Georgia', 'serif'],
      },
      spacing: { '18': '4.5rem', '88': '22rem', '128': '32rem' },
      animation: {
        'fade-in':       'fadeIn 0.5s ease-in-out',
        'slide-up':      'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn:       { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:      { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        bounceGentle: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
