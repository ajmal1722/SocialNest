/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
				'primary-light': '#F7F8FC',
				'secondary-light': '#e50914',
				'ternary-light': '#D3D3D3',

				'primary-dark': '#0e1113',
				'secondary-dark': '#444e53',
				'ternary-dark': '#0D2438',
			},
    },
  },
  plugins: [],
}