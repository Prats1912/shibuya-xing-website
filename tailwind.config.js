/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff2d2d',      // Bright red
        secondary: '#b91c1c',    // Deep red
        black: '#000000',        // Pure black
        white: '#ffffff',
      },
      fontFamily: {
        'heading': ['AsianHiro', 'Shibuya Zone', 'system-ui', 'sans-serif'],
        'shibuya': ['Shibuya Zone', 'system-ui', 'sans-serif'],
        'japanese': ['Noto Sans JP', 'sans-serif'],
      },
      backgroundImage: {
        'classy-gradient': 'linear-gradient(90deg, #000 0%, #ff2d2d 50%, #000 100%)',
      },
    },
  },
  plugins: [],
};
