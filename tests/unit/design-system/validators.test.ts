/**
 * Tests for Token Validators
 */
import { describe, it, expect } from 'vitest'
import {
  validateTokens,
  generateValidationReport,
  isValidTokenFile,
  type ValidationOptions
} from '../../../src/design-system/validators'
import type { DesignTokenFile } from '../../../src/design-system/types'

describe('Token Validators', () => {
  describe('validateTokens', () => {
    it('should validate a valid token file', () => {
      const tokens: DesignTokenFile = {
        color: {
          primary: {
            $value: '#ff0000',
            $type: 'color'
          }
        }
      }

      const result = validateTokens(tokens)
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should detect invalid color values', () => {
      const tokens: DesignTokenFile = {
        color: {
          invalid: {
            $value: 'not-a-color',
            $type: 'color'
          }
        }
      }

      const result = validateTokens(tokens)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.type === 'invalid-type')).toBe(true)
    })

    it('should detect missing token values', () => {
      const tokens: DesignTokenFile = {
        color: {
          empty: {
            $value: null,
            $type: 'color'
          } as any
        }
      }

      const result = validateTokens(tokens)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.type === 'missing-value')).toBe(true)
    })

    it('should detect invalid references', () => {
      const tokens: DesignTokenFile = {
        color: {
          ref: {
            $value: '{color.nonexistent}',
            $type: 'color'
          }
        }
      }

      const result = validateTokens(tokens)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.type === 'invalid-reference')).toBe(true)
    })

    it('should validate valid references', () => {
      const tokens: DesignTokenFile = {
        color: {
          primary: {
            $value: '#ff0000',
            $type: 'color'
          },
          secondary: {
            $value: '{color.primary}',
            $type: 'color'
          }
        }
      }

      const result = validateTokens(tokens)
      expect(result.valid).toBe(true)
    })

    it('should detect circular references', () => {
      const tokens: DesignTokenFile = {
        color: {
          a: {
            $value: '{color.b}',
            $type: 'color'
          },
          b: {
            $value: '{color.a}',
            $type: 'color'
          }
        }
      }

      const result = validateTokens(tokens, { checkCircularRefs: true })
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.type === 'circular-reference')).toBe(true)
    })

    it('should warn about naming convention violations', () => {
      const tokens: DesignTokenFile = {
        color: {
          'INVALID_NAME': {
            $value: '#ff0000',
            $type: 'color'
          }
        }
      }

      const result = validateTokens(tokens, { checkNaming: true })
      expect(result.warnings.some(w => w.type === 'naming-convention')).toBe(true)
    })

    it('should warn about deprecated tokens', () => {
      const tokens: DesignTokenFile = {
        color: {
          old: {
            $value: '#ff0000',
            $type: 'color',
            $deprecated: 'Use color.new instead'
          }
        }
      }

      const result = validateTokens(tokens)
      expect(result.warnings.some(w => w.type === 'deprecated')).toBe(true)
    })

    it('should check for unused tokens when enabled', () => {
      const tokens: DesignTokenFile = {
        color: {
          unused: {
            $value: '#ff0000',
            $type: 'color'
          }
        }
      }

      const result = validateTokens(tokens, { checkUnused: true })
      expect(result.warnings.some(w => w.type === 'unused')).toBe(true)
    })

    it('should skip $-prefixed keys', () => {
      const tokens: DesignTokenFile = {
        $schema: 'https://example.com/schema',
        color: {
          primary: {
            $value: '#ff0000',
            $type: 'color'
          }
        }
      } as any

      const result = validateTokens(tokens)
      expect(result.valid).toBe(true)
    })

    it('should use custom naming pattern', () => {
      const tokens: DesignTokenFile = {
        color: {
          'primary-color': {
            $value: '#ff0000',
            $type: 'color'
          }
        }
      }

      const result = validateTokens(tokens, {
        checkNaming: true,
        namingPattern: /^[a-z]+-[a-z]+$/
      })
      expect(result.warnings.filter(w => w.type === 'naming-convention')).toHaveLength(0)
    })
  })

  describe('Token Type Validation', () => {
    describe('color validation', () => {
      it('should accept hex colors', () => {
        const tokens: DesignTokenFile = {
          color: {
            hex3: { $value: '#fff', $type: 'color' },
            hex6: { $value: '#ffffff', $type: 'color' },
            hex8: { $value: '#ffffffff', $type: 'color' }
          }
        }

        const result = validateTokens(tokens)
        expect(result.valid).toBe(true)
      })

      it('should accept rgb/rgba colors', () => {
        const tokens: DesignTokenFile = {
          color: {
            rgb: { $value: 'rgb(255, 255, 255)', $type: 'color' },
            rgba: { $value: 'rgba(255, 255, 255, 0.5)', $type: 'color' }
          }
        }

        const result = validateTokens(tokens)
        expect(result.valid).toBe(true)
      })

      it('should accept hsl/hsla colors', () => {
        const tokens: DesignTokenFile = {
          color: {
            hsl: { $value: 'hsl(0, 100%, 50%)', $type: 'color' },
            hsla: { $value: 'hsla(0, 100%, 50%, 0.5)', $type: 'color' }
          }
        }

        const result = validateTokens(tokens)
        expect(result.valid).toBe(true)
      })

      it('should accept named colors', () => {
        const tokens: DesignTokenFile = {
          color: {
            transparent: { $value: 'transparent', $type: 'color' },
            black: { $value: 'black', $type: 'color' },
            white: { $value: 'white', $type: 'color' },
            inherit: { $value: 'inherit', $type: 'color' }
          }
        }

        const result = validateTokens(tokens)
        expect(result.valid).toBe(true)
      })
    })

    describe('dimension validation', () => {
      it('should accept valid dimensions', () => {
        const tokens: DesignTokenFile = {
          spacing: {
            px: { $value: '16px', $type: 'dimension' },
            rem: { $value: '1rem', $type: 'dimension' },
            em: { $value: '1.5em', $type: 'dimension' },
            percent: { $value: '100%', $type: 'dimension' },
            number: { $value: 0, $type: 'dimension' },
            negative: { $value: '-10px', $type: 'dimension' }
          }
        }

        const result = validateTokens(tokens)
        expect(result.valid).toBe(true)
      })

      it('should reject invalid dimensions', () => {
        const tokens: DesignTokenFile = {
          spacing: {
            invalid: { $value: 'not-a-dimension', $type: 'dimension' }
          }
        }

        const result = validateTokens(tokens)
        expect(result.valid).toBe(false)
      })
    })

    describe('fontWeight validation', () => {
      it('should accept numeric font weights', () => {
        const tokens: DesignTokenFile = {
          font: {
            w100: { $value: 100, $type: 'fontWeight' },
            w400: { $value: 400, $type: 'fontWeight' },
            w900: { $value: 900, $type: 'fontWeight' }
          }
        }

        const result = validateTokens(tokens)
        expect(result.valid).toBe(true)
      })

      it('should accept string font weights', () => {
        const tokens: DesignTokenFile = {
          font: {
            normal: { $value: 'normal', $type: 'fontWeight' },
            bold: { $value: 'bold', $type: 'fontWeight' },
            semibold: { $value: 'semibold', $type: 'fontWeight' }
          }
        }

        const result = validateTokens(tokens)
        expect(result.valid).toBe(true)
      })

      it('should reject invalid font weights', () => {
        const tokens: DesignTokenFile = {
          font: {
            invalid: { $value: 150, $type: 'fontWeight' }
          }
        }

        const result = validateTokens(tokens)
        expect(result.valid).toBe(false)
      })
    })

    describe('number validation', () => {
      it('should accept valid numbers', () => {
        const tokens: DesignTokenFile = {
          number: {
            int: { $value: 42, $type: 'number' },
            float: { $value: 3.14, $type: 'number' },
            string: { $value: '100', $type: 'number' }
          }
        }

        const result = validateTokens(tokens)
        expect(result.valid).toBe(true)
      })

      it('should reject invalid numbers', () => {
        const tokens: DesignTokenFile = {
          number: {
            invalid: { $value: 'not-a-number', $type: 'number' }
          }
        }

        const result = validateTokens(tokens)
        expect(result.valid).toBe(false)
      })
    })

    describe('duration validation', () => {
      it('should accept valid durations', () => {
        const tokens: DesignTokenFile = {
          animation: {
            ms: { $value: '300ms', $type: 'duration' },
            s: { $value: '0.3s', $type: 'duration' },
            number: { $value: 300, $type: 'duration' }
          }
        }

        const result = validateTokens(tokens)
        expect(result.valid).toBe(true)
      })

      it('should reject invalid durations', () => {
        const tokens: DesignTokenFile = {
          animation: {
            invalid: { $value: 'fast', $type: 'duration' }
          }
        }

        const result = validateTokens(tokens)
        expect(result.valid).toBe(false)
      })
    })
  })

  describe('checkColorAccessibility', () => {
    it('should warn about accessibility when enabled', () => {
      const tokens: DesignTokenFile = {
        color: {
          background: {
            $value: '#ffffff',
            $type: 'color'
          },
          foreground: {
            $value: '#000000',
            $type: 'color'
          }
        }
      }

      const result = validateTokens(tokens, { checkAccessibility: true })
      expect(result.warnings.some(w => w.type === 'accessibility')).toBe(true)
    })
  })

  describe('generateValidationReport', () => {
    it('should generate report for valid tokens', () => {
      const result = {
        valid: true,
        errors: [],
        warnings: []
      }

      const report = generateValidationReport(result)
      expect(report).toContain('✅ Valid')
      expect(report).toContain('No issues found!')
    })

    it('should generate report for invalid tokens', () => {
      const result = {
        valid: false,
        errors: [
          { path: 'color.invalid', message: 'Invalid color', type: 'invalid-type' as const }
        ],
        warnings: []
      }

      const report = generateValidationReport(result)
      expect(report).toContain('❌ Invalid')
      expect(report).toContain('## Errors')
      expect(report).toContain('color.invalid')
    })

    it('should include warnings in report', () => {
      const result = {
        valid: true,
        errors: [],
        warnings: [
          { path: 'color.old', message: 'Deprecated', type: 'deprecated' as const }
        ]
      }

      const report = generateValidationReport(result)
      expect(report).toContain('## Warnings')
      expect(report).toContain('color.old')
    })
  })

  describe('isValidTokenFile', () => {
    it('should return true for valid token file', () => {
      const tokens: DesignTokenFile = {
        color: {
          primary: {
            $value: '#ff0000',
            $type: 'color'
          }
        }
      }

      expect(isValidTokenFile(tokens)).toBe(true)
    })

    it('should return false for invalid token file', () => {
      const tokens: DesignTokenFile = {
        color: {
          invalid: {
            $value: null,
            $type: 'color'
          } as any
        }
      }

      expect(isValidTokenFile(tokens)).toBe(false)
    })
  })

  describe('nested token groups', () => {
    it('should validate deeply nested tokens', () => {
      const tokens: DesignTokenFile = {
        color: {
          brand: {
            primary: {
              base: {
                $value: '#ff0000',
                $type: 'color'
              },
              light: {
                $value: '#ff6666',
                $type: 'color'
              }
            }
          }
        }
      }

      const result = validateTokens(tokens)
      expect(result.valid).toBe(true)
    })

    it('should validate nested references', () => {
      const tokens: DesignTokenFile = {
        primitive: {
          red: {
            500: {
              $value: '#ff0000',
              $type: 'color'
            }
          }
        },
        semantic: {
          brand: {
            primary: {
              $value: '{primitive.red.500}',
              $type: 'color'
            }
          }
        }
      }

      const result = validateTokens(tokens)
      expect(result.valid).toBe(true)
    })
  })

  describe('spacing type', () => {
    it('should validate spacing tokens', () => {
      const tokens: DesignTokenFile = {
        spacing: {
          xs: { $value: '4px', $type: 'spacing' },
          sm: { $value: '8px', $type: 'spacing' },
          md: { $value: '16px', $type: 'spacing' }
        }
      }

      const result = validateTokens(tokens)
      expect(result.valid).toBe(true)
    })
  })

  describe('sizing type', () => {
    it('should validate sizing tokens', () => {
      const tokens: DesignTokenFile = {
        sizing: {
          icon: { $value: '24px', $type: 'sizing' },
          avatar: { $value: '48px', $type: 'sizing' }
        }
      }

      const result = validateTokens(tokens)
      expect(result.valid).toBe(true)
    })
  })

  describe('edge cases', () => {
    it('should handle empty token file', () => {
      const tokens: DesignTokenFile = {}
      const result = validateTokens(tokens)
      expect(result.valid).toBe(true)
    })

    it('should handle tokens without $type', () => {
      const tokens: DesignTokenFile = {
        color: {
          primary: {
            $value: '#ff0000'
          }
        }
      }

      const result = validateTokens(tokens)
      expect(result.valid).toBe(true)
    })

    it('should handle multiple references in one value', () => {
      const tokens: DesignTokenFile = {
        color: {
          a: { $value: '#ff0000', $type: 'color' },
          b: { $value: '#00ff00', $type: 'color' }
        },
        gradient: {
          primary: {
            $value: 'linear-gradient({color.a}, {color.b})'
          }
        }
      }

      const result = validateTokens(tokens)
      expect(result.valid).toBe(true)
    })

    it('should skip reference validation for values with references', () => {
      const tokens: DesignTokenFile = {
        color: {
          primary: { $value: '#ff0000', $type: 'color' },
          secondary: { $value: '{color.primary}', $type: 'color' }
        }
      }

      const result = validateTokens(tokens)
      expect(result.valid).toBe(true)
    })
  })
})
