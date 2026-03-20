import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        red: {
          main: '#C41230',
          dark: '#9B0F26',
          darker: '#6e0819',
          light: '#e01535',
        },
        dark: {
          primary: '#0f0f0f',
          secondary: '#171717',
          tertiary: '#1f1f1f',
          border: '#272727',
        },
      },
      fontFamily: {
        heading: ['Barlow Condensed', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
