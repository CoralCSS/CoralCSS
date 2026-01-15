# CoralCSS Starter Kits

Official starter templates for CoralCSS with popular frameworks.

## Available Templates

| Template | Framework | Build Tool | Description |
|----------|-----------|------------|-------------|
| [react-vite](./react-vite) | React 18 | Vite | React + TypeScript + Vite |
| [nextjs](./nextjs) | Next.js 14 | Next.js | App Router + TypeScript |
| [vue-vite](./vue-vite) | Vue 3 | Vite | Composition API + TypeScript |
| [html-basic](./html-basic) | None | CDN | Simple HTML + CSS only |
| [astro](./astro) | Astro | Astro | Static site generation |

## Quick Start

### Using degit (recommended)

```bash
# React + Vite
npx degit coralcss/core/starter-kits/react-vite my-app
cd my-app
npm install
npm run dev

# Next.js
npx degit coralcss/core/starter-kits/nextjs my-app
cd my-app
npm install
npm run dev

# Vue + Vite
npx degit coralcss/core/starter-kits/vue-vite my-app
cd my-app
npm install
npm run dev
```

### Manual Setup

1. Copy the desired starter kit directory
2. Run `npm install`
3. Run `npm run dev`

## Template Features

### React + Vite

- React 18 with TypeScript
- Vite for fast development
- Dark mode toggle
- Example components
- Hot Module Replacement

### Next.js

- Next.js 14 with App Router
- TypeScript
- PostCSS configuration
- Server components ready
- SEO optimized

### Vue + Vite

- Vue 3 Composition API
- TypeScript support
- Vite for fast development
- Reactive state management

### HTML Basic

- No build tools required
- CDN-based CoralCSS
- Perfect for prototyping
- Copy and paste ready

## Configuration

All templates include:

- **coral.config.ts** or **postcss.config.mjs** - CoralCSS configuration
- Dark mode support (`class` strategy)
- Responsive breakpoints
- Semantic color tokens

### Customizing Theme

Edit the config file to customize your theme:

```typescript
// coral.config.ts
export default createCoral({
  plugins: coralPreset({
    darkMode: 'class',
  }),
  theme: {
    colors: {
      primary: '#your-color',
    },
  },
})
```

## CSS Directives

All templates use the CoralCSS directives:

```css
@coral base;       /* Reset and base styles */
@coral components; /* Component classes */
@coral utilities;  /* Utility classes */
```

## Need Help?

- [Documentation](https://coralcss.dev/docs)
- [Playground](https://coralcss.dev/playground)
- [GitHub Issues](https://github.com/coralcss/core/issues)

## License

MIT License - feel free to use these templates in your projects!
