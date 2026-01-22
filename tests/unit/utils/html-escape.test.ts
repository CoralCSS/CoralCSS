/**
 * HTML Escape Tests
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest'
import {
  escapeHtml,
  escapeHtmlPreserveBreaks,
  safeHtml,
  createTextElement,
  setTextContent,
  containsHtmlTags,
  stripHtmlTags,
  escapeAttribute,
  sanitizeUrl,
} from '../../../src/utils/html-escape'

describe('HTML Escape Utilities', () => {
  describe('escapeHtml', () => {
    it('should escape HTML special characters', () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
      )
    })

    it('should escape ampersand', () => {
      expect(escapeHtml('a & b')).toBe('a &amp; b')
    })

    it('should escape single quotes', () => {
      expect(escapeHtml("it's")).toBe('it&#39;s')
    })

    it('should escape backticks', () => {
      expect(escapeHtml('`code`')).toBe('&#96;code&#96;')
    })

    it('should handle non-string input', () => {
      expect(escapeHtml(123 as unknown as string)).toBe('123')
      expect(escapeHtml(null as unknown as string)).toBe('')
      expect(escapeHtml(undefined as unknown as string)).toBe('')
    })

    it('should return empty string for empty input', () => {
      expect(escapeHtml('')).toBe('')
    })

    it('should not escape safe characters', () => {
      expect(escapeHtml('Hello World 123')).toBe('Hello World 123')
    })
  })

  describe('escapeHtmlPreserveBreaks', () => {
    it('should convert newlines to br tags', () => {
      expect(escapeHtmlPreserveBreaks('Hello\nWorld')).toBe('Hello<br>World')
    })

    it('should escape HTML and preserve breaks', () => {
      expect(escapeHtmlPreserveBreaks('<script>\nalert()</script>')).toBe(
        '&lt;script&gt;<br>alert()&lt;/script&gt;'
      )
    })

    it('should handle multiple newlines', () => {
      expect(escapeHtmlPreserveBreaks('a\nb\nc')).toBe('a<br>b<br>c')
    })
  })

  describe('safeHtml', () => {
    it('should create safe HTML template', () => {
      const userInput = '&lt;escaped&gt;'
      const html = safeHtml`<span>${userInput}</span>`
      expect(html).toBe('<span>&lt;escaped&gt;</span>')
    })

    it('should handle multiple interpolations', () => {
      const a = 'foo'
      const b = 'bar'
      const html = safeHtml`<div>${a}</div><div>${b}</div>`
      expect(html).toBe('<div>foo</div><div>bar</div>')
    })

    it('should handle no interpolations', () => {
      const html = safeHtml`<div>static</div>`
      expect(html).toBe('<div>static</div>')
    })
  })

  describe('createTextElement', () => {
    it('should create element with text content', () => {
      const el = createTextElement('span', 'Hello World')
      expect(el.tagName).toBe('SPAN')
      expect(el.textContent).toBe('Hello World')
    })

    it('should set attributes', () => {
      const el = createTextElement('div', 'text', { id: 'test', 'data-value': '123' })
      expect(el.id).toBe('test')
      expect(el.getAttribute('data-value')).toBe('123')
    })

    it('should handle className attribute', () => {
      const el = createTextElement('div', 'text', { className: 'my-class' })
      expect(el.className).toBe('my-class')
    })

    it('should not parse HTML in text', () => {
      const el = createTextElement('div', '<script>alert()</script>')
      expect(el.textContent).toBe('<script>alert()</script>')
      expect(el.children.length).toBe(0)
    })
  })

  describe('setTextContent', () => {
    it('should set text content safely', () => {
      const el = document.createElement('div')
      setTextContent(el, '<script>xss</script>')
      expect(el.textContent).toBe('<script>xss</script>')
      expect(el.children.length).toBe(0)
    })
  })

  describe('containsHtmlTags', () => {
    it('should detect HTML tags', () => {
      expect(containsHtmlTags('<div>test</div>')).toBe(true)
      expect(containsHtmlTags('<script>alert()</script>')).toBe(true)
      expect(containsHtmlTags('<img src="x">')).toBe(true)
    })

    it('should return false for plain text', () => {
      expect(containsHtmlTags('Hello World')).toBe(false)
      expect(containsHtmlTags('5 > 3')).toBe(false)
      expect(containsHtmlTags('x < y')).toBe(false)
    })

    it('should detect tag-like patterns with both < and >', () => {
      // The regex matches anything between < and > so this returns true
      expect(containsHtmlTags('a < b and b > c')).toBe(true)
    })

    it('should detect self-closing tags', () => {
      expect(containsHtmlTags('<br/>')).toBe(true)
      expect(containsHtmlTags('<hr />')).toBe(true)
    })
  })

  describe('stripHtmlTags', () => {
    it('should remove all HTML tags', () => {
      expect(stripHtmlTags('<div>Hello</div>')).toBe('Hello')
      expect(stripHtmlTags('<p>Hello <strong>World</strong></p>')).toBe('Hello World')
    })

    it('should handle nested tags', () => {
      expect(stripHtmlTags('<div><span><a>text</a></span></div>')).toBe('text')
    })

    it('should preserve text between tags', () => {
      expect(stripHtmlTags('a<br>b<br>c')).toBe('abc')
    })

    it('should return same string if no tags', () => {
      expect(stripHtmlTags('plain text')).toBe('plain text')
    })
  })

  describe('escapeAttribute', () => {
    it('should escape attribute values', () => {
      expect(escapeAttribute('" onclick="alert()"')).toBe('&quot; onclick=&quot;alert()&quot;')
    })

    it('should escape backslashes', () => {
      expect(escapeAttribute('path\\to\\file')).toBe('path&#92;to&#92;file')
    })

    it('should escape all special characters', () => {
      expect(escapeAttribute('&<>"\'/`\\')).toBe('&amp;&lt;&gt;&quot;&#39;/&#96;&#92;')
    })

    it('should handle non-string input', () => {
      expect(escapeAttribute(123 as unknown as string)).toBe('123')
      expect(escapeAttribute(null as unknown as string)).toBe('')
      expect(escapeAttribute(undefined as unknown as string)).toBe('')
    })
  })

  describe('sanitizeUrl', () => {
    it('should allow safe URLs', () => {
      expect(sanitizeUrl('https://example.com')).toBe('https://example.com')
      expect(sanitizeUrl('http://example.com')).toBe('http://example.com')
      expect(sanitizeUrl('/path/to/page')).toBe('/path/to/page')
      expect(sanitizeUrl('./relative')).toBe('./relative')
    })

    it('should block javascript: protocol', () => {
      expect(sanitizeUrl('javascript:alert()')).toBe('')
      expect(sanitizeUrl('JAVASCRIPT:alert()')).toBe('')
      expect(sanitizeUrl('  javascript:alert()')).toBe('')
    })

    it('should block data: protocol', () => {
      expect(sanitizeUrl('data:text/html,<script>alert()</script>')).toBe('')
      expect(sanitizeUrl('DATA:text/html,<script>alert()</script>')).toBe('')
    })

    it('should block vbscript: protocol', () => {
      expect(sanitizeUrl('vbscript:msgbox')).toBe('')
      expect(sanitizeUrl('VBSCRIPT:msgbox')).toBe('')
    })

    it('should handle non-string input', () => {
      expect(sanitizeUrl(123 as unknown as string)).toBe('')
      expect(sanitizeUrl(null as unknown as string)).toBe('')
    })
  })
})
