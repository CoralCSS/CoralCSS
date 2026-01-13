/**
 * CoralCSS Configuration
 */

import { createCoral, coralPreset } from '@coral-css/core'

export default createCoral({
  plugins: coralPreset({
    darkMode: 'class',
  }),
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    // Add your custom theme overrides here
  },
})
