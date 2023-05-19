/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        'black': {
          'primary': '#ffffff',
          'primary-focus': '#ffffff',
          'primary-content': '#000000',

          'secondary': '#ffffff',
          'secondary-focus': '#ffffff',
          'secondary-content': '#000000',

          'accent': '#ffffff',
          'accent-focus': '#ffffff',
          'accent-content': '#000000',

          'neutral': '#333333',
          'neutral-focus': '#4d4d4d',
          'neutral-content': '#ffffff',

          'base-100': '#000000',
          'base-200': '#333333',
          'base-300': '#4d4d4d',
          'base-content': '#ffffff',

          'info': '#0000ff',
          'success': '#008000',
          'warning': '#ffff00',
          'error': '#ff0000',

          '--rounded-box': '0.5rem',
          '--rounded-btn': '0.5rem',
          '--rounded-badge': '0.5rem',

          '--animation-btn': '0',
          '--animation-input': '0.2s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '0.5rem',
          '--border-btn': '1px',
        },
      },
    ],
  },
}
