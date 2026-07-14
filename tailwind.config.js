/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',

  theme: {
    extend: {
      /* ================= CORE SHADCN TOKENS ================= */
      colors: {
        border: 'rgba(255, 255, 255, 0.08)',
        input: 'rgba(255, 255, 255, 0.08)',
        ring: '#38bdf8', // Planet Glow

        background: '#000000', // تحويل الخلفية لـ Absolute Black الفضاء الحقيقي
        foreground: '#e0f2fe', // Starlight

        primary: {
          DEFAULT: '#38bdf8', // Planet Glow
          foreground: '#e0f2fe',
        },

        secondary: {
          DEFAULT: '#312e81', // Nebula Purple
          foreground: '#e0f2fe',
        },

        /* ================= COSMIC DESIGN SYSTEM PALETTE ================= */
        dark: {
          50: '#f0f9ff',
          100: '#e0f2fe', // Starlight
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8', // Planet Glow
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#1e40af', // Galaxy Blue
          850: '#312e81', // Nebula Purple
          900: '#000000', // Cosmic Black
          950: '#020617', // Deep Space
        },

        cosmicBlue: '#1e40af', // Galaxy Blue
        starlight: '#e0f2fe', // Starlight
        planetGlow: '#38bdf8', // Planet Glow
        deepSpace: '#020617', // Deep Space
        cosmicBlack: '#000000', // Cosmic Black
        nebulaPurple: '#312e81', // Nebula Purple
        cyberCyan: '#06b6d4',   // لون لوحات التحكم المستقبلي المضاف

        success: { 500: '#10b981' },
        warning: { 500: '#f59e0b' },
        error: { 500: '#ef4444' },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      },

      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spinSlow 140s linear infinite', // أنيميشن دوران الكوكب الغازي ببطء شديد
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' }, // إضافة دوران خفيف جداً مع الطفو ليعطي طابع انعدام جاذبية حقيقي
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },

      backdropBlur: {
        xs: '2px',
      },

      boxShadow: {
        glass: '0 8px 32px 0 rgba(2, 6, 23, 0.5)',
        glow: '0 0 25px rgba(56, 189, 248, 0.25)',
        cyber: '0 0 35px rgba(6, 182, 212, 0.3)', // هالة التوهج السيانية الجديدة للاتصالات الكونية
      },

      borderRadius: {
        '4xl': '2rem',
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),

    function ({ addUtilities }) {
      addUtilities({
        '.glass': {
          background: 'rgba(2, 6, 23, 0.3)', // تقليل التعتيم لزيادة وضوح النجوم المتحركة بالخلفية
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.03)',
        },
        '.text-glow-cyan': {
          'text-shadow': '0 0 10px rgba(6, 182, 212, 0.6)', // تأثير جعل الخطوط البرمجية مضيئة كالهولوغرام
        }
      });
    },
  ],
};