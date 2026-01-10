/**
 * Typography Plugin
 *
 * Beautiful typographic defaults for prose content.
 * Similar to @tailwindcss/typography but with CoralCSS styling.
 *
 * @module plugins/optional/typography
 */

import type { Plugin, Rule, PluginContext } from '../../types'

/**
 * Typography plugin options
 */
export interface TypographyPluginOptions {
  /**
   * Class name for prose container (default: 'prose')
   */
  className?: string

  /**
   * Default theme (light/dark)
   */
  defaultTheme?: 'light' | 'dark' | 'auto'

  /**
   * Include CJK (Chinese, Japanese, Korean) optimizations
   */
  cjk?: boolean
}

/**
 * Prose size configurations
 */
const proseSizes = {
  sm: {
    fontSize: '0.875rem',
    lineHeight: '1.714',
    p: { marginTop: '1em', marginBottom: '1em' },
    h1: { fontSize: '2.143em', marginTop: '0', marginBottom: '0.857em', lineHeight: '1.2' },
    h2: { fontSize: '1.714em', marginTop: '1.6em', marginBottom: '0.8em', lineHeight: '1.333' },
    h3: { fontSize: '1.286em', marginTop: '1.556em', marginBottom: '0.667em', lineHeight: '1.556' },
    h4: { fontSize: '1em', marginTop: '1.5em', marginBottom: '0.5em', lineHeight: '1.5' },
    blockquote: { marginTop: '1.333em', marginBottom: '1.333em', paddingLeft: '1.111em' },
    code: { fontSize: '0.857em' },
    pre: { fontSize: '0.857em', lineHeight: '1.667', marginTop: '1.667em', marginBottom: '1.667em', borderRadius: '0.375rem', padding: '0.857em 1.143em' },
    ol: { marginTop: '1.143em', marginBottom: '1.143em', paddingLeft: '1.571em' },
    ul: { marginTop: '1.143em', marginBottom: '1.143em', paddingLeft: '1.571em' },
    li: { marginTop: '0.286em', marginBottom: '0.286em' },
    hr: { marginTop: '2.857em', marginBottom: '2.857em' },
    figure: { marginTop: '1.714em', marginBottom: '1.714em' },
    figcaption: { fontSize: '0.857em', lineHeight: '1.333', marginTop: '0.667em' },
  },
  base: {
    fontSize: '1rem',
    lineHeight: '1.75',
    p: { marginTop: '1.25em', marginBottom: '1.25em' },
    h1: { fontSize: '2.25em', marginTop: '0', marginBottom: '0.889em', lineHeight: '1.111' },
    h2: { fontSize: '1.5em', marginTop: '2em', marginBottom: '1em', lineHeight: '1.333' },
    h3: { fontSize: '1.25em', marginTop: '1.6em', marginBottom: '0.6em', lineHeight: '1.6' },
    h4: { fontSize: '1em', marginTop: '1.5em', marginBottom: '0.5em', lineHeight: '1.5' },
    blockquote: { marginTop: '1.6em', marginBottom: '1.6em', paddingLeft: '1em' },
    code: { fontSize: '0.875em' },
    pre: { fontSize: '0.875em', lineHeight: '1.714', marginTop: '1.714em', marginBottom: '1.714em', borderRadius: '0.5rem', padding: '1em 1.25em' },
    ol: { marginTop: '1.25em', marginBottom: '1.25em', paddingLeft: '1.625em' },
    ul: { marginTop: '1.25em', marginBottom: '1.25em', paddingLeft: '1.625em' },
    li: { marginTop: '0.5em', marginBottom: '0.5em' },
    hr: { marginTop: '3em', marginBottom: '3em' },
    figure: { marginTop: '2em', marginBottom: '2em' },
    figcaption: { fontSize: '0.875em', lineHeight: '1.429', marginTop: '0.857em' },
  },
  lg: {
    fontSize: '1.125rem',
    lineHeight: '1.778',
    p: { marginTop: '1.333em', marginBottom: '1.333em' },
    h1: { fontSize: '2.667em', marginTop: '0', marginBottom: '0.833em', lineHeight: '1' },
    h2: { fontSize: '1.667em', marginTop: '1.867em', marginBottom: '1.067em', lineHeight: '1.333' },
    h3: { fontSize: '1.333em', marginTop: '1.667em', marginBottom: '0.667em', lineHeight: '1.5' },
    h4: { fontSize: '1em', marginTop: '1.778em', marginBottom: '0.444em', lineHeight: '1.556' },
    blockquote: { marginTop: '1.667em', marginBottom: '1.667em', paddingLeft: '1.111em' },
    code: { fontSize: '0.889em' },
    pre: { fontSize: '0.889em', lineHeight: '1.75', marginTop: '2em', marginBottom: '2em', borderRadius: '0.5rem', padding: '1.111em 1.333em' },
    ol: { marginTop: '1.333em', marginBottom: '1.333em', paddingLeft: '1.556em' },
    ul: { marginTop: '1.333em', marginBottom: '1.333em', paddingLeft: '1.556em' },
    li: { marginTop: '0.556em', marginBottom: '0.556em' },
    hr: { marginTop: '3.111em', marginBottom: '3.111em' },
    figure: { marginTop: '1.778em', marginBottom: '1.778em' },
    figcaption: { fontSize: '0.889em', lineHeight: '1.5', marginTop: '1em' },
  },
  xl: {
    fontSize: '1.25rem',
    lineHeight: '1.8',
    p: { marginTop: '1.2em', marginBottom: '1.2em' },
    h1: { fontSize: '2.8em', marginTop: '0', marginBottom: '0.857em', lineHeight: '1' },
    h2: { fontSize: '1.8em', marginTop: '1.556em', marginBottom: '0.889em', lineHeight: '1.111' },
    h3: { fontSize: '1.5em', marginTop: '1.6em', marginBottom: '0.667em', lineHeight: '1.333' },
    h4: { fontSize: '1em', marginTop: '1.8em', marginBottom: '0.6em', lineHeight: '1.6' },
    blockquote: { marginTop: '1.6em', marginBottom: '1.6em', paddingLeft: '1.067em' },
    code: { fontSize: '0.9em' },
    pre: { fontSize: '0.9em', lineHeight: '1.778', marginTop: '2em', marginBottom: '2em', borderRadius: '0.625rem', padding: '1.2em 1.6em' },
    ol: { marginTop: '1.2em', marginBottom: '1.2em', paddingLeft: '1.6em' },
    ul: { marginTop: '1.2em', marginBottom: '1.2em', paddingLeft: '1.6em' },
    li: { marginTop: '0.6em', marginBottom: '0.6em' },
    hr: { marginTop: '2.8em', marginBottom: '2.8em' },
    figure: { marginTop: '2em', marginBottom: '2em' },
    figcaption: { fontSize: '0.9em', lineHeight: '1.556', marginTop: '1em' },
  },
  '2xl': {
    fontSize: '1.5rem',
    lineHeight: '1.667',
    p: { marginTop: '1.333em', marginBottom: '1.333em' },
    h1: { fontSize: '2.667em', marginTop: '0', marginBottom: '0.875em', lineHeight: '1.083' },
    h2: { fontSize: '2em', marginTop: '1.5em', marginBottom: '0.833em', lineHeight: '1.083' },
    h3: { fontSize: '1.5em', marginTop: '1.556em', marginBottom: '0.667em', lineHeight: '1.222' },
    h4: { fontSize: '1em', marginTop: '1.667em', marginBottom: '0.5em', lineHeight: '1.5' },
    blockquote: { marginTop: '1.667em', marginBottom: '1.667em', paddingLeft: '1.111em' },
    code: { fontSize: '0.917em' },
    pre: { fontSize: '0.917em', lineHeight: '1.636', marginTop: '2em', marginBottom: '2em', borderRadius: '0.75rem', padding: '1.333em 1.667em' },
    ol: { marginTop: '1.333em', marginBottom: '1.333em', paddingLeft: '1.583em' },
    ul: { marginTop: '1.333em', marginBottom: '1.333em', paddingLeft: '1.583em' },
    li: { marginTop: '0.5em', marginBottom: '0.5em' },
    hr: { marginTop: '3em', marginBottom: '3em' },
    figure: { marginTop: '2em', marginBottom: '2em' },
    figcaption: { fontSize: '0.917em', lineHeight: '1.455', marginTop: '1em' },
  },
}

/**
 * Color themes for prose
 */
const proseColors = {
  // Default (slate)
  DEFAULT: {
    body: '#374151',
    headings: '#111827',
    lead: '#4b5563',
    links: '#111827',
    bold: '#111827',
    counters: '#6b7280',
    bullets: '#d1d5db',
    hr: '#e5e7eb',
    quotes: '#111827',
    quoteBorders: '#e5e7eb',
    captions: '#6b7280',
    code: '#111827',
    preCode: '#e5e7eb',
    preBg: '#1f2937',
    thBorders: '#d1d5db',
    tdBorders: '#e5e7eb',
  },
  // Gray theme
  gray: {
    body: '#374151',
    headings: '#111827',
    lead: '#4b5563',
    links: '#111827',
    bold: '#111827',
    counters: '#6b7280',
    bullets: '#d1d5db',
    hr: '#e5e7eb',
    quotes: '#111827',
    quoteBorders: '#e5e7eb',
    captions: '#6b7280',
    code: '#111827',
    preCode: '#e5e7eb',
    preBg: '#1f2937',
    thBorders: '#d1d5db',
    tdBorders: '#e5e7eb',
  },
  // Slate theme (default)
  slate: {
    body: '#334155',
    headings: '#0f172a',
    lead: '#475569',
    links: '#0f172a',
    bold: '#0f172a',
    counters: '#64748b',
    bullets: '#cbd5e1',
    hr: '#e2e8f0',
    quotes: '#0f172a',
    quoteBorders: '#e2e8f0',
    captions: '#64748b',
    code: '#0f172a',
    preCode: '#e2e8f0',
    preBg: '#1e293b',
    thBorders: '#cbd5e1',
    tdBorders: '#e2e8f0',
  },
  // Zinc theme
  zinc: {
    body: '#3f3f46',
    headings: '#18181b',
    lead: '#52525b',
    links: '#18181b',
    bold: '#18181b',
    counters: '#71717a',
    bullets: '#d4d4d8',
    hr: '#e4e4e7',
    quotes: '#18181b',
    quoteBorders: '#e4e4e7',
    captions: '#71717a',
    code: '#18181b',
    preCode: '#e4e4e7',
    preBg: '#27272a',
    thBorders: '#d4d4d8',
    tdBorders: '#e4e4e7',
  },
  // Neutral theme
  neutral: {
    body: '#404040',
    headings: '#171717',
    lead: '#525252',
    links: '#171717',
    bold: '#171717',
    counters: '#737373',
    bullets: '#d4d4d4',
    hr: '#e5e5e5',
    quotes: '#171717',
    quoteBorders: '#e5e5e5',
    captions: '#737373',
    code: '#171717',
    preCode: '#e5e5e5',
    preBg: '#262626',
    thBorders: '#d4d4d4',
    tdBorders: '#e5e5e5',
  },
  // Stone theme
  stone: {
    body: '#44403c',
    headings: '#1c1917',
    lead: '#57534e',
    links: '#1c1917',
    bold: '#1c1917',
    counters: '#78716c',
    bullets: '#d6d3d1',
    hr: '#e7e5e4',
    quotes: '#1c1917',
    quoteBorders: '#e7e5e4',
    captions: '#78716c',
    code: '#1c1917',
    preCode: '#e7e5e4',
    preBg: '#292524',
    thBorders: '#d6d3d1',
    tdBorders: '#e7e5e4',
  },
  // Coral theme (brand)
  coral: {
    body: '#475569',
    headings: '#0f172a',
    lead: '#64748b',
    links: '#ff6b6b',
    bold: '#0f172a',
    counters: '#94a3b8',
    bullets: '#ff6b6b',
    hr: '#e2e8f0',
    quotes: '#0f172a',
    quoteBorders: '#ff6b6b',
    captions: '#64748b',
    code: '#ff6b6b',
    preCode: '#ffc9bf',
    preBg: '#1e293b',
    thBorders: '#cbd5e1',
    tdBorders: '#e2e8f0',
  },
}

/**
 * Invert colors for dark mode
 */
const proseInvertColors = {
  body: '#d1d5db',
  headings: '#ffffff',
  lead: '#9ca3af',
  links: '#ffffff',
  bold: '#ffffff',
  counters: '#9ca3af',
  bullets: '#4b5563',
  hr: '#374151',
  quotes: '#f3f4f6',
  quoteBorders: '#374151',
  captions: '#9ca3af',
  code: '#ffffff',
  preCode: '#d1d5db',
  preBg: '#0f172a',
  thBorders: '#4b5563',
  tdBorders: '#374151',
}

/**
 * Generate prose CSS for a specific size
 */
function generateProseCSS(
  selector: string,
  size: keyof typeof proseSizes,
  colors: typeof proseColors.DEFAULT
): string {
  const config = proseSizes[size]
  const css: string[] = []

  css.push(`${selector} {
  color: ${colors.body};
  max-width: 65ch;
  font-size: ${config.fontSize};
  line-height: ${config.lineHeight};
}`)

  css.push(`${selector} [class~="lead"] {
  color: ${colors.lead};
  font-size: 1.25em;
  line-height: 1.6;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
}`)

  css.push(`${selector} a {
  color: ${colors.links};
  text-decoration: underline;
  font-weight: 500;
}`)

  css.push(`${selector} a:hover {
  color: ${colors.links};
  opacity: 0.8;
}`)

  css.push(`${selector} strong {
  color: ${colors.bold};
  font-weight: 600;
}`)

  css.push(`${selector} a strong, ${selector} blockquote strong, ${selector} thead th strong {
  color: inherit;
}`)

  css.push(`${selector} ol {
  list-style-type: decimal;
  margin-top: ${config.ol.marginTop};
  margin-bottom: ${config.ol.marginBottom};
  padding-left: ${config.ol.paddingLeft};
}`)

  css.push(`${selector} ol[type="A"] { list-style-type: upper-alpha; }`)
  css.push(`${selector} ol[type="a"] { list-style-type: lower-alpha; }`)
  css.push(`${selector} ol[type="I"] { list-style-type: upper-roman; }`)
  css.push(`${selector} ol[type="i"] { list-style-type: lower-roman; }`)
  css.push(`${selector} ol[type="1"] { list-style-type: decimal; }`)

  css.push(`${selector} ul {
  list-style-type: disc;
  margin-top: ${config.ul.marginTop};
  margin-bottom: ${config.ul.marginBottom};
  padding-left: ${config.ul.paddingLeft};
}`)

  css.push(`${selector} li {
  margin-top: ${config.li.marginTop};
  margin-bottom: ${config.li.marginBottom};
}`)

  css.push(`${selector} ol > li::marker {
  font-weight: 400;
  color: ${colors.counters};
}`)

  css.push(`${selector} ul > li::marker {
  color: ${colors.bullets};
}`)

  css.push(`${selector} > ul > li p {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}`)

  css.push(`${selector} > ol > li > *:first-child,
${selector} > ul > li > *:first-child {
  margin-top: 1.25em;
}`)

  css.push(`${selector} > ol > li > *:last-child,
${selector} > ul > li > *:last-child {
  margin-bottom: 1.25em;
}`)

  css.push(`${selector} ul ul, ${selector} ul ol, ${selector} ol ul, ${selector} ol ol {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}`)

  css.push(`${selector} dl {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}`)

  css.push(`${selector} dt {
  color: ${colors.headings};
  font-weight: 600;
  margin-top: 1.25em;
}`)

  css.push(`${selector} dd {
  margin-top: 0.5em;
  padding-left: 1.625em;
}`)

  css.push(`${selector} hr {
  border-color: ${colors.hr};
  border-top-width: 1px;
  margin-top: ${config.hr.marginTop};
  margin-bottom: ${config.hr.marginBottom};
}`)

  css.push(`${selector} blockquote {
  font-weight: 500;
  font-style: italic;
  color: ${colors.quotes};
  border-left-width: 0.25rem;
  border-left-color: ${colors.quoteBorders};
  quotes: "\\201C""\\201D""\\2018""\\2019";
  margin-top: ${config.blockquote.marginTop};
  margin-bottom: ${config.blockquote.marginBottom};
  padding-left: ${config.blockquote.paddingLeft};
}`)

  css.push(`${selector} blockquote p:first-of-type::before {
  content: open-quote;
}`)

  css.push(`${selector} blockquote p:last-of-type::after {
  content: close-quote;
}`)

  css.push(`${selector} h1 {
  color: ${colors.headings};
  font-weight: 800;
  font-size: ${config.h1.fontSize};
  margin-top: ${config.h1.marginTop};
  margin-bottom: ${config.h1.marginBottom};
  line-height: ${config.h1.lineHeight};
}`)

  css.push(`${selector} h1 strong {
  font-weight: 900;
  color: inherit;
}`)

  css.push(`${selector} h2 {
  color: ${colors.headings};
  font-weight: 700;
  font-size: ${config.h2.fontSize};
  margin-top: ${config.h2.marginTop};
  margin-bottom: ${config.h2.marginBottom};
  line-height: ${config.h2.lineHeight};
}`)

  css.push(`${selector} h2 strong {
  font-weight: 800;
  color: inherit;
}`)

  css.push(`${selector} h3 {
  color: ${colors.headings};
  font-weight: 600;
  font-size: ${config.h3.fontSize};
  margin-top: ${config.h3.marginTop};
  margin-bottom: ${config.h3.marginBottom};
  line-height: ${config.h3.lineHeight};
}`)

  css.push(`${selector} h3 strong {
  font-weight: 700;
  color: inherit;
}`)

  css.push(`${selector} h4 {
  color: ${colors.headings};
  font-weight: 600;
  font-size: ${config.h4.fontSize};
  margin-top: ${config.h4.marginTop};
  margin-bottom: ${config.h4.marginBottom};
  line-height: ${config.h4.lineHeight};
}`)

  css.push(`${selector} h4 strong {
  font-weight: 700;
  color: inherit;
}`)

  css.push(`${selector} img {
  margin-top: 2em;
  margin-bottom: 2em;
}`)

  css.push(`${selector} picture {
  display: block;
  margin-top: 2em;
  margin-bottom: 2em;
}`)

  css.push(`${selector} picture > img {
  margin-top: 0;
  margin-bottom: 0;
}`)

  css.push(`${selector} video {
  margin-top: 2em;
  margin-bottom: 2em;
}`)

  css.push(`${selector} kbd {
  font-weight: 500;
  font-family: inherit;
  color: ${colors.code};
  font-size: ${config.code.fontSize};
  background-color: ${colors.hr};
  border-radius: 0.25rem;
  padding: 0.1875em 0.375em;
}`)

  css.push(`${selector} code {
  color: ${colors.code};
  font-weight: 600;
  font-size: ${config.code.fontSize};
}`)

  css.push(`${selector} code::before {
  content: "\`";
}`)

  css.push(`${selector} code::after {
  content: "\`";
}`)

  css.push(`${selector} a code {
  color: inherit;
}`)

  css.push(`${selector} h1 code,
${selector} h2 code,
${selector} h3 code,
${selector} h4 code {
  color: inherit;
}`)

  css.push(`${selector} pre {
  color: ${colors.preCode};
  background-color: ${colors.preBg};
  overflow-x: auto;
  font-weight: 400;
  font-size: ${config.pre.fontSize};
  line-height: ${config.pre.lineHeight};
  margin-top: ${config.pre.marginTop};
  margin-bottom: ${config.pre.marginBottom};
  border-radius: ${config.pre.borderRadius};
  padding: ${config.pre.padding};
}`)

  css.push(`${selector} pre code {
  background-color: transparent;
  border-width: 0;
  border-radius: 0;
  padding: 0;
  font-weight: inherit;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}`)

  css.push(`${selector} pre code::before,
${selector} pre code::after {
  content: none;
}`)

  css.push(`${selector} table {
  width: 100%;
  table-layout: auto;
  text-align: left;
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 0.875em;
  line-height: 1.714;
}`)

  css.push(`${selector} thead {
  border-bottom-width: 1px;
  border-bottom-color: ${colors.thBorders};
}`)

  css.push(`${selector} thead th {
  color: ${colors.headings};
  font-weight: 600;
  vertical-align: bottom;
  padding-right: 0.571em;
  padding-bottom: 0.571em;
  padding-left: 0.571em;
}`)

  css.push(`${selector} thead th:first-child {
  padding-left: 0;
}`)

  css.push(`${selector} thead th:last-child {
  padding-right: 0;
}`)

  css.push(`${selector} tbody tr {
  border-bottom-width: 1px;
  border-bottom-color: ${colors.tdBorders};
}`)

  css.push(`${selector} tbody tr:last-child {
  border-bottom-width: 0;
}`)

  css.push(`${selector} tbody td {
  vertical-align: baseline;
}`)

  css.push(`${selector} tfoot {
  border-top-width: 1px;
  border-top-color: ${colors.thBorders};
}`)

  css.push(`${selector} tfoot td {
  vertical-align: top;
}`)

  css.push(`${selector} figure {
  margin-top: ${config.figure.marginTop};
  margin-bottom: ${config.figure.marginBottom};
}`)

  css.push(`${selector} figure > * {
  margin-top: 0;
  margin-bottom: 0;
}`)

  css.push(`${selector} figcaption {
  color: ${colors.captions};
  font-size: ${config.figcaption.fontSize};
  line-height: ${config.figcaption.lineHeight};
  margin-top: ${config.figcaption.marginTop};
}`)

  css.push(`${selector} p {
  margin-top: ${config.p.marginTop};
  margin-bottom: ${config.p.marginBottom};
}`)

  // First and last child margins
  css.push(`${selector} > :first-child {
  margin-top: 0;
}`)

  css.push(`${selector} > :last-child {
  margin-bottom: 0;
}`)

  return css.join('\n\n')
}

/**
 * Typography plugin for beautiful prose content
 *
 * @example
 * ```html
 * <article class="prose prose-lg prose-coral dark:prose-invert">
 *   <h1>Article Title</h1>
 *   <p class="lead">Introduction paragraph...</p>
 *   <p>Content...</p>
 * </article>
 * ```
 */
export function typographyPlugin(options: TypographyPluginOptions = {}): Plugin {
  const { className = 'prose' } = options

  return {
    name: 'typography',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Base prose class (handled via CSS generation)
      rules.push({
        name: className,
        pattern: className,
        properties: {
          '--coral-prose': '1',
          color: 'var(--coral-prose-body, #374151)',
          'max-width': '65ch',
        },
      })

      // Prose sizes
      rules.push({
        name: `${className}-sm`,
        pattern: `${className}-sm`,
        properties: { 'font-size': '0.875rem', 'line-height': '1.714' },
      })

      rules.push({
        name: `${className}-base`,
        pattern: `${className}-base`,
        properties: { 'font-size': '1rem', 'line-height': '1.75' },
      })

      rules.push({
        name: `${className}-lg`,
        pattern: `${className}-lg`,
        properties: { 'font-size': '1.125rem', 'line-height': '1.778' },
      })

      rules.push({
        name: `${className}-xl`,
        pattern: `${className}-xl`,
        properties: { 'font-size': '1.25rem', 'line-height': '1.8' },
      })

      rules.push({
        name: `${className}-2xl`,
        pattern: `${className}-2xl`,
        properties: { 'font-size': '1.5rem', 'line-height': '1.667' },
      })

      // Color themes
      for (const [colorName, colors] of Object.entries(proseColors)) {
        const ruleName = colorName === 'DEFAULT' ? className : `${className}-${colorName}`
        rules.push({
          name: ruleName,
          pattern: ruleName,
          properties: {
            '--coral-prose-body': colors.body,
            '--coral-prose-headings': colors.headings,
            '--coral-prose-lead': colors.lead,
            '--coral-prose-links': colors.links,
            '--coral-prose-bold': colors.bold,
            '--coral-prose-counters': colors.counters,
            '--coral-prose-bullets': colors.bullets,
            '--coral-prose-hr': colors.hr,
            '--coral-prose-quotes': colors.quotes,
            '--coral-prose-quote-borders': colors.quoteBorders,
            '--coral-prose-captions': colors.captions,
            '--coral-prose-code': colors.code,
            '--coral-prose-pre-code': colors.preCode,
            '--coral-prose-pre-bg': colors.preBg,
            '--coral-prose-th-borders': colors.thBorders,
            '--coral-prose-td-borders': colors.tdBorders,
          },
        })
      }

      // Invert for dark mode
      rules.push({
        name: `${className}-invert`,
        pattern: `${className}-invert`,
        properties: {
          '--coral-prose-body': proseInvertColors.body,
          '--coral-prose-headings': proseInvertColors.headings,
          '--coral-prose-lead': proseInvertColors.lead,
          '--coral-prose-links': proseInvertColors.links,
          '--coral-prose-bold': proseInvertColors.bold,
          '--coral-prose-counters': proseInvertColors.counters,
          '--coral-prose-bullets': proseInvertColors.bullets,
          '--coral-prose-hr': proseInvertColors.hr,
          '--coral-prose-quotes': proseInvertColors.quotes,
          '--coral-prose-quote-borders': proseInvertColors.quoteBorders,
          '--coral-prose-captions': proseInvertColors.captions,
          '--coral-prose-code': proseInvertColors.code,
          '--coral-prose-pre-code': proseInvertColors.preCode,
          '--coral-prose-pre-bg': proseInvertColors.preBg,
          '--coral-prose-th-borders': proseInvertColors.thBorders,
          '--coral-prose-td-borders': proseInvertColors.tdBorders,
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

/**
 * Get complete prose CSS for standalone usage
 */
export function getProseCSS(options: {
  className?: string
  size?: keyof typeof proseSizes
  theme?: keyof typeof proseColors
  includeInvert?: boolean
} = {}): string {
  const {
    className = 'prose',
    size = 'base',
    theme = 'DEFAULT',
    includeInvert = true,
  } = options

  const colors = proseColors[theme] || proseColors.DEFAULT
  const css: string[] = []

  // Base prose
  css.push(generateProseCSS(`.${className}`, size, colors))

  // Invert for dark mode
  if (includeInvert) {
    css.push(generateProseCSS(`.${className}-invert`, size, proseInvertColors))
  }

  return css.join('\n\n')
}

/**
 * Get all prose size variants CSS
 */
export function getAllProseSizesCSS(className = 'prose'): string {
  const css: string[] = []

  for (const size of Object.keys(proseSizes) as (keyof typeof proseSizes)[]) {
    css.push(generateProseCSS(`.${className}-${size}`, size, proseColors.DEFAULT))
  }

  return css.join('\n\n')
}

export default typographyPlugin
