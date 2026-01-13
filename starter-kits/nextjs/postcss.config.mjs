/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@coral-css/postcss': {
      content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
    },
  },
}

export default config
