/**
 * State Variants Plugin Tests
 */
import { describe, it, expect } from 'vitest'
import { stateVariantsPlugin } from '../../../src/plugins/core/variants/state'
import type { Variant, PluginContext } from '../../../src/types'

describe('stateVariantsPlugin', () => {
  const variants: Variant[] = []

  const mockContext: PluginContext = {
    addRule: () => {},
    addVariant: (v: Variant) => variants.push(v),
    addComponent: () => {},
    extendTheme: () => {},
    getTheme: () => ({} as any),
    on: () => {},
  }

  // Install the plugin before tests
  const plugin = stateVariantsPlugin()
  plugin.install(mockContext)

  it('should have correct name and version', () => {
    expect(plugin.name).toBe('state-variants')
    expect(plugin.version).toBe('1.0.0')
  })

  it('should register variants', () => {
    expect(variants.length).toBeGreaterThan(0)
  })

  describe('ARIA Boolean Attribute Variants', () => {
    it('should generate aria-checked variant', () => {
      const variant = variants.find((v) => v.name === 'aria-checked')
      expect(variant).toBeDefined()
      expect(variant?.handler?.('.test')).toBe('.test[aria-checked="true"]')
    })

    it('should generate aria-not-checked variant', () => {
      const variant = variants.find((v) => v.name === 'aria-not-checked')
      expect(variant?.handler?.('.test')).toBe('.test[aria-checked="false"]')
    })

    it('should generate aria-mixed variant', () => {
      const variant = variants.find((v) => v.name === 'aria-mixed')
      expect(variant?.handler?.('.test')).toBe('.test[aria-checked="mixed"]')
    })

    it('should generate aria-disabled variant', () => {
      const variant = variants.find((v) => v.name === 'aria-disabled')
      expect(variant?.handler?.('.test')).toBe('.test[aria-disabled="true"]')
    })

    it('should generate aria-enabled variant', () => {
      const variant = variants.find((v) => v.name === 'aria-enabled')
      expect(variant?.handler?.('.test')).toBe('.test[aria-disabled="false"]')
    })

    it('should generate aria-expanded variant', () => {
      const variant = variants.find((v) => v.name === 'aria-expanded')
      expect(variant?.handler?.('.test')).toBe('.test[aria-expanded="true"]')
    })

    it('should generate aria-collapsed variant', () => {
      const variant = variants.find((v) => v.name === 'aria-collapsed')
      expect(variant?.handler?.('.test')).toBe('.test[aria-expanded="false"]')
    })

    it('should generate aria-hidden variant', () => {
      const variant = variants.find((v) => v.name === 'aria-hidden')
      expect(variant?.handler?.('.test')).toBe('.test[aria-hidden="true"]')
    })

    it('should generate aria-visible variant', () => {
      const variant = variants.find((v) => v.name === 'aria-visible')
      expect(variant?.handler?.('.test')).toBe('.test[aria-hidden="false"]')
    })

    it('should generate aria-pressed variant', () => {
      const variant = variants.find((v) => v.name === 'aria-pressed')
      expect(variant?.handler?.('.test')).toBe('.test[aria-pressed="true"]')
    })

    it('should generate aria-not-pressed variant', () => {
      const variant = variants.find((v) => v.name === 'aria-not-pressed')
      expect(variant?.handler?.('.test')).toBe('.test[aria-pressed="false"]')
    })

    it('should generate aria-selected variant', () => {
      const variant = variants.find((v) => v.name === 'aria-selected')
      expect(variant?.handler?.('.test')).toBe('.test[aria-selected="true"]')
    })

    it('should generate aria-not-selected variant', () => {
      const variant = variants.find((v) => v.name === 'aria-not-selected')
      expect(variant?.handler?.('.test')).toBe('.test[aria-selected="false"]')
    })

    it('should generate aria-current variants', () => {
      expect(variants.find((v) => v.name === 'aria-current')?.handler?.('.test')).toBe('.test[aria-current="true"]')
      expect(variants.find((v) => v.name === 'aria-current-page')?.handler?.('.test')).toBe('.test[aria-current="page"]')
      expect(variants.find((v) => v.name === 'aria-current-step')?.handler?.('.test')).toBe('.test[aria-current="step"]')
      expect(variants.find((v) => v.name === 'aria-current-location')?.handler?.('.test')).toBe('.test[aria-current="location"]')
      expect(variants.find((v) => v.name === 'aria-current-date')?.handler?.('.test')).toBe('.test[aria-current="date"]')
      expect(variants.find((v) => v.name === 'aria-current-time')?.handler?.('.test')).toBe('.test[aria-current="time"]')
    })

    it('should generate aria-grabbed variants', () => {
      expect(variants.find((v) => v.name === 'aria-grabbed')?.handler?.('.test')).toBe('.test[aria-grabbed="true"]')
      expect(variants.find((v) => v.name === 'aria-not-grabbed')?.handler?.('.test')).toBe('.test[aria-grabbed="false"]')
    })

    it('should generate aria-busy variants', () => {
      expect(variants.find((v) => v.name === 'aria-busy')?.handler?.('.test')).toBe('.test[aria-busy="true"]')
      expect(variants.find((v) => v.name === 'aria-not-busy')?.handler?.('.test')).toBe('.test[aria-busy="false"]')
    })

    it('should generate aria-live variants', () => {
      expect(variants.find((v) => v.name === 'aria-live-polite')?.handler?.('.test')).toBe('.test[aria-live="polite"]')
      expect(variants.find((v) => v.name === 'aria-live-assertive')?.handler?.('.test')).toBe('.test[aria-live="assertive"]')
      expect(variants.find((v) => v.name === 'aria-live-off')?.handler?.('.test')).toBe('.test[aria-live="off"]')
    })

    it('should generate aria-invalid variants', () => {
      expect(variants.find((v) => v.name === 'aria-invalid')?.handler?.('.test')).toBe('.test[aria-invalid="true"]')
      expect(variants.find((v) => v.name === 'aria-valid')?.handler?.('.test')).toBe('.test[aria-invalid="false"]')
      expect(variants.find((v) => v.name === 'aria-invalid-grammar')?.handler?.('.test')).toBe('.test[aria-invalid="grammar"]')
      expect(variants.find((v) => v.name === 'aria-invalid-spelling')?.handler?.('.test')).toBe('.test[aria-invalid="spelling"]')
    })

    it('should generate aria-required variants', () => {
      expect(variants.find((v) => v.name === 'aria-required')?.handler?.('.test')).toBe('.test[aria-required="true"]')
      expect(variants.find((v) => v.name === 'aria-optional')?.handler?.('.test')).toBe('.test[aria-required="false"]')
    })

    it('should generate aria-readonly variants', () => {
      expect(variants.find((v) => v.name === 'aria-readonly')?.handler?.('.test')).toBe('.test[aria-readonly="true"]')
      expect(variants.find((v) => v.name === 'aria-editable')?.handler?.('.test')).toBe('.test[aria-readonly="false"]')
    })

    it('should generate aria-sort variants', () => {
      expect(variants.find((v) => v.name === 'aria-sort-ascending')?.handler?.('.test')).toBe('.test[aria-sort="ascending"]')
      expect(variants.find((v) => v.name === 'aria-sort-descending')?.handler?.('.test')).toBe('.test[aria-sort="descending"]')
      expect(variants.find((v) => v.name === 'aria-sort-none')?.handler?.('.test')).toBe('.test[aria-sort="none"]')
      expect(variants.find((v) => v.name === 'aria-sort-other')?.handler?.('.test')).toBe('.test[aria-sort="other"]')
    })

    it('should generate aria-orientation variants', () => {
      expect(variants.find((v) => v.name === 'aria-horizontal')?.handler?.('.test')).toBe('.test[aria-orientation="horizontal"]')
      expect(variants.find((v) => v.name === 'aria-vertical')?.handler?.('.test')).toBe('.test[aria-orientation="vertical"]')
    })

    it('should generate aria-autocomplete variants', () => {
      expect(variants.find((v) => v.name === 'aria-autocomplete-none')?.handler?.('.test')).toBe('.test[aria-autocomplete="none"]')
      expect(variants.find((v) => v.name === 'aria-autocomplete-list')?.handler?.('.test')).toBe('.test[aria-autocomplete="list"]')
      expect(variants.find((v) => v.name === 'aria-autocomplete-inline')?.handler?.('.test')).toBe('.test[aria-autocomplete="inline"]')
      expect(variants.find((v) => v.name === 'aria-autocomplete-both')?.handler?.('.test')).toBe('.test[aria-autocomplete="both"]')
    })

    it('should generate aria-haspopup variants', () => {
      expect(variants.find((v) => v.name === 'aria-haspopup')?.handler?.('.test')).toBe('.test[aria-haspopup="true"]')
      expect(variants.find((v) => v.name === 'aria-haspopup-menu')?.handler?.('.test')).toBe('.test[aria-haspopup="menu"]')
      expect(variants.find((v) => v.name === 'aria-haspopup-dialog')?.handler?.('.test')).toBe('.test[aria-haspopup="dialog"]')
      expect(variants.find((v) => v.name === 'aria-haspopup-listbox')?.handler?.('.test')).toBe('.test[aria-haspopup="listbox"]')
      expect(variants.find((v) => v.name === 'aria-haspopup-tree')?.handler?.('.test')).toBe('.test[aria-haspopup="tree"]')
      expect(variants.find((v) => v.name === 'aria-haspopup-grid')?.handler?.('.test')).toBe('.test[aria-haspopup="grid"]')
    })

    it('should generate aria-modal variant', () => {
      expect(variants.find((v) => v.name === 'aria-modal')?.handler?.('.test')).toBe('.test[aria-modal="true"]')
    })

    it('should generate aria-multiselectable variant', () => {
      expect(variants.find((v) => v.name === 'aria-multiselectable')?.handler?.('.test')).toBe('.test[aria-multiselectable="true"]')
    })

    it('should generate aria-multiline variant', () => {
      expect(variants.find((v) => v.name === 'aria-multiline')?.handler?.('.test')).toBe('.test[aria-multiline="true"]')
    })
  })

  describe('Data Attribute Variants', () => {
    it('should generate data-state variants', () => {
      expect(variants.find((v) => v.name === 'data-open')?.handler?.('.test')).toBe('.test[data-state="open"]')
      expect(variants.find((v) => v.name === 'data-closed')?.handler?.('.test')).toBe('.test[data-state="closed"]')
      expect(variants.find((v) => v.name === 'data-active')?.handler?.('.test')).toBe('.test[data-state="active"]')
      expect(variants.find((v) => v.name === 'data-inactive')?.handler?.('.test')).toBe('.test[data-state="inactive"]')
      expect(variants.find((v) => v.name === 'data-checked')?.handler?.('.test')).toBe('.test[data-state="checked"]')
      expect(variants.find((v) => v.name === 'data-unchecked')?.handler?.('.test')).toBe('.test[data-state="unchecked"]')
      expect(variants.find((v) => v.name === 'data-indeterminate')?.handler?.('.test')).toBe('.test[data-state="indeterminate"]')
      expect(variants.find((v) => v.name === 'data-on')?.handler?.('.test')).toBe('.test[data-state="on"]')
      expect(variants.find((v) => v.name === 'data-off')?.handler?.('.test')).toBe('.test[data-state="off"]')
    })

    it('should generate data-orientation variants', () => {
      expect(variants.find((v) => v.name === 'data-horizontal')?.handler?.('.test')).toBe('.test[data-orientation="horizontal"]')
      expect(variants.find((v) => v.name === 'data-vertical')?.handler?.('.test')).toBe('.test[data-orientation="vertical"]')
    })

    it('should generate data-side variants', () => {
      expect(variants.find((v) => v.name === 'data-side-top')?.handler?.('.test')).toBe('.test[data-side="top"]')
      expect(variants.find((v) => v.name === 'data-side-bottom')?.handler?.('.test')).toBe('.test[data-side="bottom"]')
      expect(variants.find((v) => v.name === 'data-side-left')?.handler?.('.test')).toBe('.test[data-side="left"]')
      expect(variants.find((v) => v.name === 'data-side-right')?.handler?.('.test')).toBe('.test[data-side="right"]')
    })

    it('should generate data-align variants', () => {
      expect(variants.find((v) => v.name === 'data-align-start')?.handler?.('.test')).toBe('.test[data-align="start"]')
      expect(variants.find((v) => v.name === 'data-align-center')?.handler?.('.test')).toBe('.test[data-align="center"]')
      expect(variants.find((v) => v.name === 'data-align-end')?.handler?.('.test')).toBe('.test[data-align="end"]')
    })

    it('should generate other data variants', () => {
      expect(variants.find((v) => v.name === 'data-disabled')?.handler?.('.test')).toBe('.test[data-disabled]')
      expect(variants.find((v) => v.name === 'data-highlighted')?.handler?.('.test')).toBe('.test[data-highlighted]')
      expect(variants.find((v) => v.name === 'data-selected')?.handler?.('.test')).toBe('.test[data-selected]')
      expect(variants.find((v) => v.name === 'data-placeholder')?.handler?.('.test')).toBe('.test[data-placeholder]')
      expect(variants.find((v) => v.name === 'data-loading')?.handler?.('.test')).toBe('.test[data-loading]')
      expect(variants.find((v) => v.name === 'data-focus')?.handler?.('.test')).toBe('.test[data-focus]')
      expect(variants.find((v) => v.name === 'data-focus-visible')?.handler?.('.test')).toBe('.test[data-focus-visible]')
      expect(variants.find((v) => v.name === 'data-pressed')?.handler?.('.test')).toBe('.test[data-pressed]')
      expect(variants.find((v) => v.name === 'data-dragging')?.handler?.('.test')).toBe('.test[data-dragging]')
      expect(variants.find((v) => v.name === 'data-resizing')?.handler?.('.test')).toBe('.test[data-resizing]')
    })

    it('should generate data-swipe variants', () => {
      expect(variants.find((v) => v.name === 'data-swipe-start')?.handler?.('.test')).toBe('.test[data-swipe="start"]')
      expect(variants.find((v) => v.name === 'data-swipe-move')?.handler?.('.test')).toBe('.test[data-swipe="move"]')
      expect(variants.find((v) => v.name === 'data-swipe-end')?.handler?.('.test')).toBe('.test[data-swipe="end"]')
      expect(variants.find((v) => v.name === 'data-swipe-cancel')?.handler?.('.test')).toBe('.test[data-swipe="cancel"]')
    })

    it('should generate data-swipe-direction variants', () => {
      expect(variants.find((v) => v.name === 'data-swipe-direction-up')?.handler?.('.test')).toBe('.test[data-swipe-direction="up"]')
      expect(variants.find((v) => v.name === 'data-swipe-direction-down')?.handler?.('.test')).toBe('.test[data-swipe-direction="down"]')
      expect(variants.find((v) => v.name === 'data-swipe-direction-left')?.handler?.('.test')).toBe('.test[data-swipe-direction="left"]')
      expect(variants.find((v) => v.name === 'data-swipe-direction-right')?.handler?.('.test')).toBe('.test[data-swipe-direction="right"]')
    })
  })

  describe('Group ARIA Variants', () => {
    it('should generate group-aria variants', () => {
      expect(variants.find((v) => v.name === 'group-aria-expanded')?.handler?.('.test')).toBe('.group[aria-expanded="true"] .test')
      expect(variants.find((v) => v.name === 'group-aria-collapsed')?.handler?.('.test')).toBe('.group[aria-expanded="false"] .test')
      expect(variants.find((v) => v.name === 'group-aria-checked')?.handler?.('.test')).toBe('.group[aria-checked="true"] .test')
      expect(variants.find((v) => v.name === 'group-aria-selected')?.handler?.('.test')).toBe('.group[aria-selected="true"] .test')
      expect(variants.find((v) => v.name === 'group-aria-disabled')?.handler?.('.test')).toBe('.group[aria-disabled="true"] .test')
      expect(variants.find((v) => v.name === 'group-aria-pressed')?.handler?.('.test')).toBe('.group[aria-pressed="true"] .test')
      expect(variants.find((v) => v.name === 'group-aria-current')?.handler?.('.test')).toBe('.group[aria-current="true"] .test')
      expect(variants.find((v) => v.name === 'group-aria-current-page')?.handler?.('.test')).toBe('.group[aria-current="page"] .test')
    })
  })

  describe('Group Data Variants', () => {
    it('should generate group-data variants', () => {
      expect(variants.find((v) => v.name === 'group-data-open')?.handler?.('.test')).toBe('.group[data-state="open"] .test')
      expect(variants.find((v) => v.name === 'group-data-closed')?.handler?.('.test')).toBe('.group[data-state="closed"] .test')
      expect(variants.find((v) => v.name === 'group-data-active')?.handler?.('.test')).toBe('.group[data-state="active"] .test')
      expect(variants.find((v) => v.name === 'group-data-checked')?.handler?.('.test')).toBe('.group[data-state="checked"] .test')
      expect(variants.find((v) => v.name === 'group-data-disabled')?.handler?.('.test')).toBe('.group[data-disabled] .test')
      expect(variants.find((v) => v.name === 'group-data-loading')?.handler?.('.test')).toBe('.group[data-loading] .test')
    })
  })

  describe('Peer ARIA Variants', () => {
    it('should generate peer-aria variants', () => {
      expect(variants.find((v) => v.name === 'peer-aria-expanded')?.handler?.('.test')).toBe('.peer[aria-expanded="true"] ~ .test')
      expect(variants.find((v) => v.name === 'peer-aria-collapsed')?.handler?.('.test')).toBe('.peer[aria-expanded="false"] ~ .test')
      expect(variants.find((v) => v.name === 'peer-aria-checked')?.handler?.('.test')).toBe('.peer[aria-checked="true"] ~ .test')
      expect(variants.find((v) => v.name === 'peer-aria-selected')?.handler?.('.test')).toBe('.peer[aria-selected="true"] ~ .test')
      expect(variants.find((v) => v.name === 'peer-aria-disabled')?.handler?.('.test')).toBe('.peer[aria-disabled="true"] ~ .test')
    })
  })

  describe('Peer Data Variants', () => {
    it('should generate peer-data variants', () => {
      expect(variants.find((v) => v.name === 'peer-data-open')?.handler?.('.test')).toBe('.peer[data-state="open"] ~ .test')
      expect(variants.find((v) => v.name === 'peer-data-closed')?.handler?.('.test')).toBe('.peer[data-state="closed"] ~ .test')
      expect(variants.find((v) => v.name === 'peer-data-active')?.handler?.('.test')).toBe('.peer[data-state="active"] ~ .test')
      expect(variants.find((v) => v.name === 'peer-data-checked')?.handler?.('.test')).toBe('.peer[data-state="checked"] ~ .test')
      expect(variants.find((v) => v.name === 'peer-data-disabled')?.handler?.('.test')).toBe('.peer[data-disabled] ~ .test')
    })
  })

  describe(':has() ARIA/Data Variants', () => {
    it('should generate has-aria variants', () => {
      expect(variants.find((v) => v.name === 'has-aria-expanded')?.handler?.('.test')).toBe('.test:has([aria-expanded="true"])')
      expect(variants.find((v) => v.name === 'has-aria-checked')?.handler?.('.test')).toBe('.test:has([aria-checked="true"])')
      expect(variants.find((v) => v.name === 'has-aria-selected')?.handler?.('.test')).toBe('.test:has([aria-selected="true"])')
    })

    it('should generate has-data variants', () => {
      expect(variants.find((v) => v.name === 'has-data-open')?.handler?.('.test')).toBe('.test:has([data-state="open"])')
      expect(variants.find((v) => v.name === 'has-data-active')?.handler?.('.test')).toBe('.test:has([data-state="active"])')
      expect(variants.find((v) => v.name === 'has-data-checked')?.handler?.('.test')).toBe('.test:has([data-state="checked"])')
    })
  })

  describe('group-has-* Variants', () => {
    it('should generate group-has-* pseudo-class variants', () => {
      expect(variants.find((v) => v.name === 'group-has-hover')?.handler?.('.test')).toBe('.group:has(:hover) .test')
      expect(variants.find((v) => v.name === 'group-has-focus')?.handler?.('.test')).toBe('.group:has(:focus) .test')
      expect(variants.find((v) => v.name === 'group-has-focus-visible')?.handler?.('.test')).toBe('.group:has(:focus-visible) .test')
      expect(variants.find((v) => v.name === 'group-has-active')?.handler?.('.test')).toBe('.group:has(:active) .test')
      expect(variants.find((v) => v.name === 'group-has-checked')?.handler?.('.test')).toBe('.group:has(:checked) .test')
      expect(variants.find((v) => v.name === 'group-has-disabled')?.handler?.('.test')).toBe('.group:has(:disabled) .test')
      expect(variants.find((v) => v.name === 'group-has-invalid')?.handler?.('.test')).toBe('.group:has(:invalid) .test')
      expect(variants.find((v) => v.name === 'group-has-valid')?.handler?.('.test')).toBe('.group:has(:valid) .test')
      expect(variants.find((v) => v.name === 'group-has-required')?.handler?.('.test')).toBe('.group:has(:required) .test')
      expect(variants.find((v) => v.name === 'group-has-placeholder-shown')?.handler?.('.test')).toBe('.group:has(:placeholder-shown) .test')
      expect(variants.find((v) => v.name === 'group-has-empty')?.handler?.('.test')).toBe('.group:has(:empty) .test')
      expect(variants.find((v) => v.name === 'group-has-indeterminate')?.handler?.('.test')).toBe('.group:has(:indeterminate) .test')
    })

    it('should generate group-has-* element variants', () => {
      expect(variants.find((v) => v.name === 'group-has-input')?.handler?.('.test')).toBe('.group:has(input) .test')
      expect(variants.find((v) => v.name === 'group-has-textarea')?.handler?.('.test')).toBe('.group:has(textarea) .test')
      expect(variants.find((v) => v.name === 'group-has-select')?.handler?.('.test')).toBe('.group:has(select) .test')
      expect(variants.find((v) => v.name === 'group-has-checkbox')?.handler?.('.test')).toBe('.group:has(input[type="checkbox"]) .test')
      expect(variants.find((v) => v.name === 'group-has-radio')?.handler?.('.test')).toBe('.group:has(input[type="radio"]) .test')
      expect(variants.find((v) => v.name === 'group-has-img')?.handler?.('.test')).toBe('.group:has(img) .test')
      expect(variants.find((v) => v.name === 'group-has-svg')?.handler?.('.test')).toBe('.group:has(svg) .test')
      expect(variants.find((v) => v.name === 'group-has-video')?.handler?.('.test')).toBe('.group:has(video) .test')
    })

    it('should generate group-has-* ARIA/data variants', () => {
      expect(variants.find((v) => v.name === 'group-has-aria-expanded')?.handler?.('.test')).toBe('.group:has([aria-expanded="true"]) .test')
      expect(variants.find((v) => v.name === 'group-has-aria-checked')?.handler?.('.test')).toBe('.group:has([aria-checked="true"]) .test')
      expect(variants.find((v) => v.name === 'group-has-aria-selected')?.handler?.('.test')).toBe('.group:has([aria-selected="true"]) .test')
      expect(variants.find((v) => v.name === 'group-has-aria-disabled')?.handler?.('.test')).toBe('.group:has([aria-disabled="true"]) .test')
      expect(variants.find((v) => v.name === 'group-has-data-open')?.handler?.('.test')).toBe('.group:has([data-state="open"]) .test')
      expect(variants.find((v) => v.name === 'group-has-data-active')?.handler?.('.test')).toBe('.group:has([data-state="active"]) .test')
      expect(variants.find((v) => v.name === 'group-has-data-checked')?.handler?.('.test')).toBe('.group:has([data-state="checked"]) .test')
    })
  })

  describe('peer-has-* Variants', () => {
    it('should generate peer-has-* pseudo-class variants', () => {
      expect(variants.find((v) => v.name === 'peer-has-hover')?.handler?.('.test')).toBe('.peer:has(:hover) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-focus')?.handler?.('.test')).toBe('.peer:has(:focus) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-focus-visible')?.handler?.('.test')).toBe('.peer:has(:focus-visible) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-active')?.handler?.('.test')).toBe('.peer:has(:active) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-checked')?.handler?.('.test')).toBe('.peer:has(:checked) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-disabled')?.handler?.('.test')).toBe('.peer:has(:disabled) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-invalid')?.handler?.('.test')).toBe('.peer:has(:invalid) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-valid')?.handler?.('.test')).toBe('.peer:has(:valid) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-required')?.handler?.('.test')).toBe('.peer:has(:required) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-placeholder-shown')?.handler?.('.test')).toBe('.peer:has(:placeholder-shown) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-empty')?.handler?.('.test')).toBe('.peer:has(:empty) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-indeterminate')?.handler?.('.test')).toBe('.peer:has(:indeterminate) ~ .test')
    })

    it('should generate peer-has-* element variants', () => {
      expect(variants.find((v) => v.name === 'peer-has-input')?.handler?.('.test')).toBe('.peer:has(input) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-textarea')?.handler?.('.test')).toBe('.peer:has(textarea) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-select')?.handler?.('.test')).toBe('.peer:has(select) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-checkbox')?.handler?.('.test')).toBe('.peer:has(input[type="checkbox"]) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-radio')?.handler?.('.test')).toBe('.peer:has(input[type="radio"]) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-img')?.handler?.('.test')).toBe('.peer:has(img) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-svg')?.handler?.('.test')).toBe('.peer:has(svg) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-video')?.handler?.('.test')).toBe('.peer:has(video) ~ .test')
    })

    it('should generate peer-has-* ARIA/data variants', () => {
      expect(variants.find((v) => v.name === 'peer-has-aria-expanded')?.handler?.('.test')).toBe('.peer:has([aria-expanded="true"]) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-aria-checked')?.handler?.('.test')).toBe('.peer:has([aria-checked="true"]) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-aria-selected')?.handler?.('.test')).toBe('.peer:has([aria-selected="true"]) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-aria-disabled')?.handler?.('.test')).toBe('.peer:has([aria-disabled="true"]) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-data-open')?.handler?.('.test')).toBe('.peer:has([data-state="open"]) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-data-active')?.handler?.('.test')).toBe('.peer:has([data-state="active"]) ~ .test')
      expect(variants.find((v) => v.name === 'peer-has-data-checked')?.handler?.('.test')).toBe('.peer:has([data-state="checked"]) ~ .test')
    })
  })

  describe(':not() combination variants', () => {
    it('should generate group-not-has variants', () => {
      expect(variants.find((v) => v.name === 'group-not-has-checked')?.handler?.('.test')).toBe('.group:not(:has(:checked)) .test')
      expect(variants.find((v) => v.name === 'group-not-has-focus')?.handler?.('.test')).toBe('.group:not(:has(:focus)) .test')
    })

    it('should generate peer-not-has variants', () => {
      expect(variants.find((v) => v.name === 'peer-not-has-checked')?.handler?.('.test')).toBe('.peer:not(:has(:checked)) ~ .test')
      expect(variants.find((v) => v.name === 'peer-not-has-focus')?.handler?.('.test')).toBe('.peer:not(:has(:focus)) ~ .test')
    })
  })

  describe('Media Query Variants', () => {
    // Note: Media query variants use handler + wrapper pattern.
    // Handler returns the selector, wrapper contains the media query.
    // The CSS generator combines them: wrapper { handler(selector) { ... } }

    it('should generate forced-colors variants', () => {
      const forcedColors = variants.find((v) => v.name === 'forced-colors')
      expect(forcedColors?.handler?.('.test')).toBe('.test')
      expect(forcedColors?.wrapper).toBe('@media (forced-colors: active)')

      const forcedColorsNone = variants.find((v) => v.name === 'forced-colors-none')
      expect(forcedColorsNone?.handler?.('.test')).toBe('.test')
      expect(forcedColorsNone?.wrapper).toBe('@media (forced-colors: none)')
    })

    it('should generate contrast variants', () => {
      const contrastMore = variants.find((v) => v.name === 'contrast-more')
      expect(contrastMore?.handler?.('.test')).toBe('.test')
      expect(contrastMore?.wrapper).toBe('@media (prefers-contrast: more)')

      const contrastLess = variants.find((v) => v.name === 'contrast-less')
      expect(contrastLess?.handler?.('.test')).toBe('.test')
      expect(contrastLess?.wrapper).toBe('@media (prefers-contrast: less)')

      const contrastCustom = variants.find((v) => v.name === 'contrast-custom')
      expect(contrastCustom?.handler?.('.test')).toBe('.test')
      expect(contrastCustom?.wrapper).toBe('@media (prefers-contrast: custom)')
    })

    it('should generate reduce-transparency variant', () => {
      const reduceTransparency = variants.find((v) => v.name === 'reduce-transparency')
      expect(reduceTransparency?.handler?.('.test')).toBe('.test')
      expect(reduceTransparency?.wrapper).toBe('@media (prefers-reduced-transparency: reduce)')
    })

    it('should generate color-gamut variants', () => {
      const colorSrgb = variants.find((v) => v.name === 'color-srgb')
      expect(colorSrgb?.handler?.('.test')).toBe('.test')
      expect(colorSrgb?.wrapper).toBe('@media (color-gamut: srgb)')

      const colorP3 = variants.find((v) => v.name === 'color-p3')
      expect(colorP3?.handler?.('.test')).toBe('.test')
      expect(colorP3?.wrapper).toBe('@media (color-gamut: p3)')

      const colorRec2020 = variants.find((v) => v.name === 'color-rec2020')
      expect(colorRec2020?.handler?.('.test')).toBe('.test')
      expect(colorRec2020?.wrapper).toBe('@media (color-gamut: rec2020)')
    })

    it('should generate display-mode variants', () => {
      const standalone = variants.find((v) => v.name === 'standalone')
      expect(standalone?.handler?.('.test')).toBe('.test')
      expect(standalone?.wrapper).toBe('@media (display-mode: standalone)')

      // Note: 'fullscreen' is the :fullscreen pseudo-class variant
      // 'display-fullscreen' is the @media (display-mode: fullscreen) variant
      const displayFullscreen = variants.find((v) => v.name === 'display-fullscreen')
      expect(displayFullscreen?.handler?.('.test')).toBe('.test')
      expect(displayFullscreen?.wrapper).toBe('@media (display-mode: fullscreen)')

      const minimalUi = variants.find((v) => v.name === 'minimal-ui')
      expect(minimalUi?.handler?.('.test')).toBe('.test')
      expect(minimalUi?.wrapper).toBe('@media (display-mode: minimal-ui)')

      const browser = variants.find((v) => v.name === 'browser')
      expect(browser?.handler?.('.test')).toBe('.test')
      expect(browser?.wrapper).toBe('@media (display-mode: browser)')

      const pipDisplay = variants.find((v) => v.name === 'picture-in-picture' && v.wrapper !== undefined)
      expect(pipDisplay?.handler?.('.test')).toBe('.test')
      expect(pipDisplay?.wrapper).toBe('@media (display-mode: picture-in-picture)')
    })

    it('should generate inverted-colors variant', () => {
      const invertedColors = variants.find((v) => v.name === 'inverted-colors')
      expect(invertedColors?.handler?.('.test')).toBe('.test')
      expect(invertedColors?.wrapper).toBe('@media (inverted-colors: inverted)')
    })

    it('should generate scripting variants', () => {
      const scriptingEnabled = variants.find((v) => v.name === 'scripting-enabled')
      expect(scriptingEnabled?.handler?.('.test')).toBe('.test')
      expect(scriptingEnabled?.wrapper).toBe('@media (scripting: enabled)')

      const scriptingNone = variants.find((v) => v.name === 'scripting-none')
      expect(scriptingNone?.handler?.('.test')).toBe('.test')
      expect(scriptingNone?.wrapper).toBe('@media (scripting: none)')

      const scriptingInitialOnly = variants.find((v) => v.name === 'scripting-initial-only')
      expect(scriptingInitialOnly?.handler?.('.test')).toBe('.test')
      expect(scriptingInitialOnly?.wrapper).toBe('@media (scripting: initial-only)')
    })

    it('should generate pointer variants', () => {
      const pointerFine = variants.find((v) => v.name === 'pointer-fine')
      expect(pointerFine?.handler?.('.test')).toBe('.test')
      expect(pointerFine?.wrapper).toBe('@media (pointer: fine)')

      const pointerCoarse = variants.find((v) => v.name === 'pointer-coarse')
      expect(pointerCoarse?.handler?.('.test')).toBe('.test')
      expect(pointerCoarse?.wrapper).toBe('@media (pointer: coarse)')

      const pointerNone = variants.find((v) => v.name === 'pointer-none')
      expect(pointerNone?.handler?.('.test')).toBe('.test')
      expect(pointerNone?.wrapper).toBe('@media (pointer: none)')

      const anyPointerFine = variants.find((v) => v.name === 'any-pointer-fine')
      expect(anyPointerFine?.handler?.('.test')).toBe('.test')
      expect(anyPointerFine?.wrapper).toBe('@media (any-pointer: fine)')

      const anyPointerCoarse = variants.find((v) => v.name === 'any-pointer-coarse')
      expect(anyPointerCoarse?.handler?.('.test')).toBe('.test')
      expect(anyPointerCoarse?.wrapper).toBe('@media (any-pointer: coarse)')
    })

    it('should generate hover capability variants', () => {
      const hoverHover = variants.find((v) => v.name === 'hover-hover')
      expect(hoverHover?.handler?.('.test')).toBe('.test')
      expect(hoverHover?.wrapper).toBe('@media (hover: hover)')

      const hoverNone = variants.find((v) => v.name === 'hover-none')
      expect(hoverNone?.handler?.('.test')).toBe('.test')
      expect(hoverNone?.wrapper).toBe('@media (hover: none)')

      const anyHoverHover = variants.find((v) => v.name === 'any-hover-hover')
      expect(anyHoverHover?.handler?.('.test')).toBe('.test')
      expect(anyHoverHover?.wrapper).toBe('@media (any-hover: hover)')

      const anyHoverNone = variants.find((v) => v.name === 'any-hover-none')
      expect(anyHoverNone?.handler?.('.test')).toBe('.test')
      expect(anyHoverNone?.wrapper).toBe('@media (any-hover: none)')
    })

    it('should generate update variants', () => {
      const updateFast = variants.find((v) => v.name === 'update-fast')
      expect(updateFast?.handler?.('.test')).toBe('.test')
      expect(updateFast?.wrapper).toBe('@media (update: fast)')

      const updateSlow = variants.find((v) => v.name === 'update-slow')
      expect(updateSlow?.handler?.('.test')).toBe('.test')
      expect(updateSlow?.wrapper).toBe('@media (update: slow)')

      const updateNone = variants.find((v) => v.name === 'update-none')
      expect(updateNone?.handler?.('.test')).toBe('.test')
      expect(updateNone?.wrapper).toBe('@media (update: none)')
    })

    it('should generate color scheme variants', () => {
      const preferLight = variants.find((v) => v.name === 'prefer-light')
      expect(preferLight?.handler?.('.test')).toBe('.test')
      expect(preferLight?.wrapper).toBe('@media (prefers-color-scheme: light)')

      const preferDark = variants.find((v) => v.name === 'prefer-dark')
      expect(preferDark?.handler?.('.test')).toBe('.test')
      expect(preferDark?.wrapper).toBe('@media (prefers-color-scheme: dark)')
    })

    it('should generate dynamic range variants', () => {
      const hdr = variants.find((v) => v.name === 'hdr')
      expect(hdr?.handler?.('.test')).toBe('.test')
      expect(hdr?.wrapper).toBe('@media (dynamic-range: high)')

      const sdr = variants.find((v) => v.name === 'sdr')
      expect(sdr?.handler?.('.test')).toBe('.test')
      expect(sdr?.wrapper).toBe('@media (dynamic-range: standard)')

      const videoHdr = variants.find((v) => v.name === 'video-hdr')
      expect(videoHdr?.handler?.('.test')).toBe('.test')
      expect(videoHdr?.wrapper).toBe('@media (video-dynamic-range: high)')

      const videoSdr = variants.find((v) => v.name === 'video-sdr')
      expect(videoSdr?.handler?.('.test')).toBe('.test')
      expect(videoSdr?.wrapper).toBe('@media (video-dynamic-range: standard)')
    })
  })

  describe('Direction Variants', () => {
    it('should generate rtl/ltr variants', () => {
      expect(variants.find((v) => v.name === 'rtl')?.handler?.('.test')).toBe('[dir="rtl"] .test, .test:dir(rtl)')
      expect(variants.find((v) => v.name === 'ltr')?.handler?.('.test')).toBe('[dir="ltr"] .test, .test:dir(ltr)')
    })
  })

  describe('Open/Closed State Variants', () => {
    it('should generate open/closed variants', () => {
      expect(variants.find((v) => v.name === 'open')?.handler?.('.test')).toBe('.test[open], .test:open')
      expect(variants.find((v) => v.name === 'closed')?.handler?.('.test')).toBe('.test:not([open]), .test:closed')
      expect(variants.find((v) => v.name === 'details-open')?.handler?.('.test')).toBe('details[open] .test')
      expect(variants.find((v) => v.name === 'dialog-open')?.handler?.('.test')).toBe('dialog[open] .test')
    })
  })

  describe('Selection Variants', () => {
    it('should generate selection variants', () => {
      expect(variants.find((v) => v.name === 'selection')?.handler?.('.test')).toBe('.test::selection')
      expect(variants.find((v) => v.name === 'first-letter')?.handler?.('.test')).toBe('.test::first-letter')
      expect(variants.find((v) => v.name === 'first-line')?.handler?.('.test')).toBe('.test::first-line')
    })
  })

  describe('Backdrop Variant', () => {
    it('should generate backdrop variant', () => {
      expect(variants.find((v) => v.name === 'backdrop')?.handler?.('.test')).toBe('.test::backdrop')
    })
  })

  describe('Form State Variants', () => {
    it('should generate form state variants', () => {
      expect(variants.find((v) => v.name === 'autofill')?.handler?.('.test')).toBe('.test:autofill')
      expect(variants.find((v) => v.name === '-webkit-autofill')?.handler?.('.test')).toBe('.test:-webkit-autofill')
      expect(variants.find((v) => v.name === 'blank')?.handler?.('.test')).toBe('.test:blank')
      expect(variants.find((v) => v.name === 'user-invalid')?.handler?.('.test')).toBe('.test:user-invalid')
      expect(variants.find((v) => v.name === 'user-valid')?.handler?.('.test')).toBe('.test:user-valid')
    })
  })

  describe('Link State Variants', () => {
    it('should generate link state variants', () => {
      expect(variants.find((v) => v.name === 'any-link')?.handler?.('.test')).toBe('.test:any-link')
      expect(variants.find((v) => v.name === 'local-link')?.handler?.('.test')).toBe('.test:local-link')
    })
  })

  describe('Fullscreen Variants', () => {
    it('should generate fullscreen variants', () => {
      const fullscreen = variants.find((v) => v.name === 'fullscreen')
      // Note: there are two fullscreen variants - one media query and one pseudo-class
      expect(fullscreen?.handler?.('.test')).toContain('.test')
      expect(variants.find((v) => v.name === '-webkit-fullscreen')?.handler?.('.test')).toBe('.test:-webkit-full-screen')
    })
  })

  describe('Popover Variant', () => {
    it('should generate popover-open variant', () => {
      expect(variants.find((v) => v.name === 'popover-open')?.handler?.('.test')).toBe('.test:popover-open')
    })
  })

  describe('Picture-in-Picture Variant', () => {
    it('should generate pip variant', () => {
      expect(variants.find((v) => v.name === 'pip')?.handler?.('.test')).toBe('.test:picture-in-picture')
    })
  })

  describe('Media State Variants', () => {
    it('should generate playing/paused variants', () => {
      expect(variants.find((v) => v.name === 'playing')?.handler?.('.test')).toBe('.test:playing')
      expect(variants.find((v) => v.name === 'paused')?.handler?.('.test')).toBe('.test:paused')
      expect(variants.find((v) => v.name === 'seeking')?.handler?.('.test')).toBe('.test:seeking')
      expect(variants.find((v) => v.name === 'buffering')?.handler?.('.test')).toBe('.test:buffering')
      expect(variants.find((v) => v.name === 'stalled')?.handler?.('.test')).toBe('.test:stalled')
      expect(variants.find((v) => v.name === 'muted')?.handler?.('.test')).toBe('.test:muted')
      expect(variants.find((v) => v.name === 'volume-locked')?.handler?.('.test')).toBe('.test:volume-locked')
    })
  })

  describe('Timeline Variants', () => {
    it('should generate past/current/future variants', () => {
      expect(variants.find((v) => v.name === 'past')?.handler?.('.test')).toBe('.test:past')
      expect(variants.find((v) => v.name === 'current')?.handler?.('.test')).toBe('.test:current')
      expect(variants.find((v) => v.name === 'future')?.handler?.('.test')).toBe('.test:future')
    })
  })

  describe('Structural Variants', () => {
    it('should generate structural variants', () => {
      expect(variants.find((v) => v.name === 'only')?.handler?.('.test')).toBe('.test:only-child')
      expect(variants.find((v) => v.name === 'first-of-type')?.handler?.('.test')).toBe('.test:first-of-type')
      expect(variants.find((v) => v.name === 'last-of-type')?.handler?.('.test')).toBe('.test:last-of-type')
      expect(variants.find((v) => v.name === 'only-of-type')?.handler?.('.test')).toBe('.test:only-of-type')
    })

    it('should generate nth-child variants', () => {
      expect(variants.find((v) => v.name === 'nth-2')?.handler?.('.test')).toBe('.test:nth-child(2)')
      expect(variants.find((v) => v.name === 'nth-3')?.handler?.('.test')).toBe('.test:nth-child(3)')
      expect(variants.find((v) => v.name === 'nth-4')?.handler?.('.test')).toBe('.test:nth-child(4)')
      expect(variants.find((v) => v.name === 'nth-5')?.handler?.('.test')).toBe('.test:nth-child(5)')
    })

    it('should generate nth-last-child variants', () => {
      expect(variants.find((v) => v.name === 'nth-last-2')?.handler?.('.test')).toBe('.test:nth-last-child(2)')
      expect(variants.find((v) => v.name === 'nth-last-3')?.handler?.('.test')).toBe('.test:nth-last-child(3)')
    })
  })

  describe('Target Variants', () => {
    it('should generate target variants', () => {
      expect(variants.find((v) => v.name === 'target')?.handler?.('.test')).toBe('.test:target')
      expect(variants.find((v) => v.name === 'target-within')?.handler?.('.test')).toBe('.test:target-within')
    })
  })

  describe('Scope Variant', () => {
    it('should generate scope variant', () => {
      expect(variants.find((v) => v.name === 'scope')?.handler?.('.test')).toBe('.test:scope')
    })
  })

  describe('Shadow DOM Variants', () => {
    it('should generate host variants', () => {
      expect(variants.find((v) => v.name === 'host')?.handler?.('.test')).toBe(':host(.test)')
      expect(variants.find((v) => v.name === 'host-context')?.handler?.('.test')).toBe(':host-context(.test)')
    })

    it('should generate slotted variant', () => {
      expect(variants.find((v) => v.name === 'slotted')?.handler?.('.test')).toBe('::slotted(.test)')
    })
  })

  describe('Defined Variant', () => {
    it('should generate defined variant', () => {
      expect(variants.find((v) => v.name === 'defined')?.handler?.('.test')).toBe('.test:defined')
    })
  })

  describe('Sticky State Variants', () => {
    it('should generate stuck variants', () => {
      expect(variants.find((v) => v.name === 'stuck')?.handler?.('.test')).toBe('.test[data-stuck]')
      expect(variants.find((v) => v.name === 'stuck-top')?.handler?.('.test')).toBe('.test[data-stuck="top"]')
      expect(variants.find((v) => v.name === 'stuck-bottom')?.handler?.('.test')).toBe('.test[data-stuck="bottom"]')
    })
  })

  describe('File Selector Variants', () => {
    it('should generate file variants', () => {
      expect(variants.find((v) => v.name === 'file')?.handler?.('.test')).toBe('.test::file-selector-button')
      expect(variants.find((v) => v.name === 'file-hover')?.handler?.('.test')).toBe('.test::file-selector-button:hover')
    })
  })

  describe('Cue Variants', () => {
    it('should generate cue variants', () => {
      expect(variants.find((v) => v.name === 'cue')?.handler?.('.test')).toBe('.test::cue')
      expect(variants.find((v) => v.name === 'cue-region')?.handler?.('.test')).toBe('.test::cue-region')
    })
  })

  describe('Grammar/Spelling Variants', () => {
    it('should generate grammar/spelling variants', () => {
      expect(variants.find((v) => v.name === 'spelling-error')?.handler?.('.test')).toBe('.test::spelling-error')
      expect(variants.find((v) => v.name === 'grammar-error')?.handler?.('.test')).toBe('.test::grammar-error')
    })
  })

  describe('View Timeline Variants', () => {
    it('should generate in-view/out-of-view variants', () => {
      expect(variants.find((v) => v.name === 'in-view')?.handler?.('.test')).toBe('.test[data-in-view]')
      expect(variants.find((v) => v.name === 'out-of-view')?.handler?.('.test')).toBe('.test:not([data-in-view])')
    })
  })

  describe('Animation State Variants', () => {
    it('should generate animation state variants', () => {
      expect(variants.find((v) => v.name === 'animating')?.handler?.('.test')).toBe('.test[data-animating]')
      expect(variants.find((v) => v.name === 'animation-paused')?.handler?.('.test')).toBe('.test[data-animation-state="paused"]')
      expect(variants.find((v) => v.name === 'animation-running')?.handler?.('.test')).toBe('.test[data-animation-state="running"]')
    })
  })

  describe('Overflowing State Variants', () => {
    it('should generate overflowing variants', () => {
      expect(variants.find((v) => v.name === 'overflowing')?.handler?.('.test')).toBe('.test[data-overflowing]')
      expect(variants.find((v) => v.name === 'overflowing-x')?.handler?.('.test')).toBe('.test[data-overflowing-x]')
      expect(variants.find((v) => v.name === 'overflowing-y')?.handler?.('.test')).toBe('.test[data-overflowing-y]')
    })
  })

  describe('Truncated Variant', () => {
    it('should generate truncated variant', () => {
      expect(variants.find((v) => v.name === 'truncated')?.handler?.('.test')).toBe('.test[data-truncated]')
    })
  })

  describe(':has() Relational Variants', () => {
    it('should generate has-checked variants', () => {
      expect(variants.find((v) => v.name === 'has-checked')?.handler?.('.test')).toBe('.test:has(:checked)')
      expect(variants.find((v) => v.name === 'has-unchecked')?.handler?.('.test')).toBe('.test:has(:not(:checked))')
    })

    it('should generate has-focus variants', () => {
      expect(variants.find((v) => v.name === 'has-focus')?.handler?.('.test')).toBe('.test:has(:focus)')
      expect(variants.find((v) => v.name === 'has-focus-within')?.handler?.('.test')).toBe('.test:has(:focus-within)')
      expect(variants.find((v) => v.name === 'has-focus-visible')?.handler?.('.test')).toBe('.test:has(:focus-visible)')
    })

    it('should generate has-hover variant', () => {
      expect(variants.find((v) => v.name === 'has-hover')?.handler?.('.test')).toBe('.test:has(:hover)')
    })

    it('should generate has-active variant', () => {
      expect(variants.find((v) => v.name === 'has-active')?.handler?.('.test')).toBe('.test:has(:active)')
    })

    it('should generate has-disabled/enabled variants', () => {
      expect(variants.find((v) => v.name === 'has-disabled')?.handler?.('.test')).toBe('.test:has(:disabled)')
      expect(variants.find((v) => v.name === 'has-enabled')?.handler?.('.test')).toBe('.test:has(:enabled)')
    })

    it('should generate has-valid/invalid variants', () => {
      expect(variants.find((v) => v.name === 'has-valid')?.handler?.('.test')).toBe('.test:has(:valid)')
      expect(variants.find((v) => v.name === 'has-invalid')?.handler?.('.test')).toBe('.test:has(:invalid)')
    })

    it('should generate has-required/optional variants', () => {
      expect(variants.find((v) => v.name === 'has-required')?.handler?.('.test')).toBe('.test:has(:required)')
      expect(variants.find((v) => v.name === 'has-optional')?.handler?.('.test')).toBe('.test:has(:optional)')
    })

    it('should generate has-empty variant', () => {
      expect(variants.find((v) => v.name === 'has-empty')?.handler?.('.test')).toBe('.test:has(:empty)')
    })

    it('should generate has-placeholder-shown variant', () => {
      expect(variants.find((v) => v.name === 'has-placeholder-shown')?.handler?.('.test')).toBe('.test:has(:placeholder-shown)')
    })

    it('should generate has-element variants', () => {
      expect(variants.find((v) => v.name === 'has-img')?.handler?.('.test')).toBe('.test:has(img)')
      expect(variants.find((v) => v.name === 'has-svg')?.handler?.('.test')).toBe('.test:has(svg)')
      expect(variants.find((v) => v.name === 'has-video')?.handler?.('.test')).toBe('.test:has(video)')
      expect(variants.find((v) => v.name === 'has-audio')?.handler?.('.test')).toBe('.test:has(audio)')
      expect(variants.find((v) => v.name === 'has-iframe')?.handler?.('.test')).toBe('.test:has(iframe)')
    })

    it('should generate has-input variants', () => {
      expect(variants.find((v) => v.name === 'has-input')?.handler?.('.test')).toBe('.test:has(input)')
      expect(variants.find((v) => v.name === 'has-textarea')?.handler?.('.test')).toBe('.test:has(textarea)')
      expect(variants.find((v) => v.name === 'has-select')?.handler?.('.test')).toBe('.test:has(select)')
      expect(variants.find((v) => v.name === 'has-button')?.handler?.('.test')).toBe('.test:has(button)')
    })

    it('should generate has-sibling variants', () => {
      expect(variants.find((v) => v.name === 'has-next')?.handler?.('.test')).toBe('.test:has(+ *)')
      expect(variants.find((v) => v.name === 'has-no-next')?.handler?.('.test')).toBe('.test:not(:has(+ *))')
    })

    it('should generate has-children variants', () => {
      expect(variants.find((v) => v.name === 'has-children')?.handler?.('.test')).toBe('.test:has(> *)')
      expect(variants.find((v) => v.name === 'has-no-children')?.handler?.('.test')).toBe('.test:not(:has(> *))')
    })
  })

  describe('Arbitrary :has() Variant', () => {
    it('should generate arbitrary has variant', () => {
      const hasVariant = variants.find((v) => v.name === 'has')
      expect(hasVariant).toBeDefined()
      expect(hasVariant?.match).toEqual(/^has-\[([^\]]+)\]$/)

      const match = 'has-[.active]'.match(/^has-\[(.+)\]$/)
      expect(hasVariant?.handler?.('.test', match)).toBe('.test:has(.active)')
    })

    it('should handle underscores as spaces', () => {
      const hasVariant = variants.find((v) => v.name === 'has')
      const match = 'has-[>_img]'.match(/^has-\[(.+)\]$/)
      expect(hasVariant?.handler?.('.test', match)).toBe('.test:has(> img)')
    })

    it('should return selector when no match', () => {
      const hasVariant = variants.find((v) => v.name === 'has')
      expect(hasVariant?.handler?.('.test', null)).toBe('.test')
      expect(hasVariant?.handler?.('.test', [])).toBe('.test')
    })
  })

  describe(':not() Negation Variants', () => {
    it('should generate not-* variants', () => {
      expect(variants.find((v) => v.name === 'not-first')?.handler?.('.test')).toBe('.test:not(:first-child)')
      expect(variants.find((v) => v.name === 'not-last')?.handler?.('.test')).toBe('.test:not(:last-child)')
      expect(variants.find((v) => v.name === 'not-only')?.handler?.('.test')).toBe('.test:not(:only-child)')
      expect(variants.find((v) => v.name === 'not-empty')?.handler?.('.test')).toBe('.test:not(:empty)')
      expect(variants.find((v) => v.name === 'not-disabled')?.handler?.('.test')).toBe('.test:not(:disabled)')
      expect(variants.find((v) => v.name === 'not-checked')?.handler?.('.test')).toBe('.test:not(:checked)')
    })

    it('should generate arbitrary not variant', () => {
      const notVariant = variants.find((v) => v.name === 'not')
      expect(notVariant?.match).toEqual(/^not-\[([^\]]+)\]$/)

      const match = 'not-[.hidden]'.match(/^not-\[(.+)\]$/)
      expect(notVariant?.handler?.('.test', match)).toBe('.test:not(.hidden)')
    })

    it('should return selector when no match for not variant', () => {
      const notVariant = variants.find((v) => v.name === 'not')
      expect(notVariant?.handler?.('.test', null)).toBe('.test')
      expect(notVariant?.handler?.('.test', [])).toBe('.test')
    })
  })

  describe(':is() / :where() Variants', () => {
    it('should generate arbitrary is variant', () => {
      const isVariant = variants.find((v) => v.name === 'is')
      expect(isVariant?.match).toEqual(/^is-\[([^\]]+)\]$/)

      const match = 'is-[.active]'.match(/^is-\[(.+)\]$/)
      expect(isVariant?.handler?.('.test', match)).toBe('.test:is(.active)')
    })

    it('should return selector when no match for is variant', () => {
      const isVariant = variants.find((v) => v.name === 'is')
      expect(isVariant?.handler?.('.test', null)).toBe('.test')
      expect(isVariant?.handler?.('.test', [])).toBe('.test')
    })

    it('should generate arbitrary where variant', () => {
      const whereVariant = variants.find((v) => v.name === 'where')
      expect(whereVariant?.match).toEqual(/^where-\[([^\]]+)\]$/)

      const match = 'where-[.active]'.match(/^where-\[(.+)\]$/)
      expect(whereVariant?.handler?.('.test', match)).toBe('.test:where(.active)')
    })

    it('should return selector when no match for where variant', () => {
      const whereVariant = variants.find((v) => v.name === 'where')
      expect(whereVariant?.handler?.('.test', null)).toBe('.test')
      expect(whereVariant?.handler?.('.test', [])).toBe('.test')
    })
  })

  describe('Arbitrary Data Attribute Variants', () => {
    it('should generate arbitrary data variant with key=value', () => {
      const dataVariant = variants.find((v) => v.name === 'data')
      expect(dataVariant?.match).toEqual(/^data-\[([^\]]+)\]$/)

      const match = 'data-[state=open]'.match(/^data-\[([^\]]+)\]$/)
      expect(dataVariant?.handler?.('.test', match)).toBe('.test[data-state="open"]')
    })

    it('should generate arbitrary data variant with presence check', () => {
      const dataVariant = variants.find((v) => v.name === 'data')
      const match = 'data-[active]'.match(/^data-\[([^\]]+)\]$/)
      expect(dataVariant?.handler?.('.test', match)).toBe('.test[data-active]')
    })

    it('should return selector when no match for data variant', () => {
      const dataVariant = variants.find((v) => v.name === 'data')
      expect(dataVariant?.handler?.('.test', null)).toBe('.test')
      expect(dataVariant?.handler?.('.test', [])).toBe('.test')
    })

    it('should generate group-data variant with key=value', () => {
      const variant = variants.find((v) => v.name === 'group-data')
      const match = 'group-data-[state=open]'.match(/^group-data-\[([^\]]+)\]$/)
      expect(variant?.handler?.('.test', match)).toBe('.group[data-state="open"] .test')
    })

    it('should generate group-data variant with presence', () => {
      const variant = variants.find((v) => v.name === 'group-data')
      const match = 'group-data-[active]'.match(/^group-data-\[([^\]]+)\]$/)
      expect(variant?.handler?.('.test', match)).toBe('.group[data-active] .test')
    })

    it('should return selector when no match for group-data variant', () => {
      const variant = variants.find((v) => v.name === 'group-data')
      expect(variant?.handler?.('.test', null)).toBe('.test')
      expect(variant?.handler?.('.test', [])).toBe('.test')
    })

    it('should generate peer-data variant with key=value', () => {
      const variant = variants.find((v) => v.name === 'peer-data')
      const match = 'peer-data-[state=open]'.match(/^peer-data-\[([^\]]+)\]$/)
      expect(variant?.handler?.('.test', match)).toBe('.peer[data-state="open"] ~ .test')
    })

    it('should generate peer-data variant with presence', () => {
      const variant = variants.find((v) => v.name === 'peer-data')
      const match = 'peer-data-[active]'.match(/^peer-data-\[([^\]]+)\]$/)
      expect(variant?.handler?.('.test', match)).toBe('.peer[data-active] ~ .test')
    })

    it('should return selector when no match for peer-data variant', () => {
      const variant = variants.find((v) => v.name === 'peer-data')
      expect(variant?.handler?.('.test', null)).toBe('.test')
      expect(variant?.handler?.('.test', [])).toBe('.test')
    })
  })

  describe('Arbitrary ARIA Attribute Variants', () => {
    it('should generate arbitrary aria variant with key=value', () => {
      const ariaVariant = variants.find((v) => v.name === 'aria')
      expect(ariaVariant?.match).toEqual(/^aria-\[([^\]]+)\]$/)

      const match = 'aria-[checked=true]'.match(/^aria-\[([^\]]+)\]$/)
      expect(ariaVariant?.handler?.('.test', match)).toBe('.test[aria-checked="true"]')
    })

    it('should generate arbitrary aria variant with presence (defaults to true)', () => {
      const ariaVariant = variants.find((v) => v.name === 'aria')
      const match = 'aria-[expanded]'.match(/^aria-\[([^\]]+)\]$/)
      expect(ariaVariant?.handler?.('.test', match)).toBe('.test[aria-expanded="true"]')
    })

    it('should return selector when no match for aria variant', () => {
      const ariaVariant = variants.find((v) => v.name === 'aria')
      expect(ariaVariant?.handler?.('.test', null)).toBe('.test')
      expect(ariaVariant?.handler?.('.test', [])).toBe('.test')
    })

    it('should generate group-aria variant with key=value', () => {
      const variant = variants.find((v) => v.name === 'group-aria')
      const match = 'group-aria-[expanded=true]'.match(/^group-aria-\[([^\]]+)\]$/)
      expect(variant?.handler?.('.test', match)).toBe('.group[aria-expanded="true"] .test')
    })

    it('should generate group-aria variant with presence', () => {
      const variant = variants.find((v) => v.name === 'group-aria')
      const match = 'group-aria-[disabled]'.match(/^group-aria-\[([^\]]+)\]$/)
      expect(variant?.handler?.('.test', match)).toBe('.group[aria-disabled="true"] .test')
    })

    it('should return selector when no match for group-aria variant', () => {
      const variant = variants.find((v) => v.name === 'group-aria')
      expect(variant?.handler?.('.test', null)).toBe('.test')
      expect(variant?.handler?.('.test', [])).toBe('.test')
    })

    it('should generate peer-aria variant with key=value', () => {
      const variant = variants.find((v) => v.name === 'peer-aria')
      const match = 'peer-aria-[expanded=true]'.match(/^peer-aria-\[([^\]]+)\]$/)
      expect(variant?.handler?.('.test', match)).toBe('.peer[aria-expanded="true"] ~ .test')
    })

    it('should generate peer-aria variant with presence', () => {
      const variant = variants.find((v) => v.name === 'peer-aria')
      const match = 'peer-aria-[disabled]'.match(/^peer-aria-\[([^\]]+)\]$/)
      expect(variant?.handler?.('.test', match)).toBe('.peer[aria-disabled="true"] ~ .test')
    })

    it('should return selector when no match for peer-aria variant', () => {
      const variant = variants.find((v) => v.name === 'peer-aria')
      expect(variant?.handler?.('.test', null)).toBe('.test')
      expect(variant?.handler?.('.test', [])).toBe('.test')
    })
  })

  describe('@supports Feature Query Variants', () => {
    it('should generate predefined supports variants', () => {
      const supportsGrid = variants.find((v) => v.name === 'supports-grid')
      expect(supportsGrid?.wrapper).toBe('@supports (display: grid)')

      const supportsFlex = variants.find((v) => v.name === 'supports-flex')
      expect(supportsFlex?.wrapper).toBe('@supports (display: flex)')

      const supportsContainer = variants.find((v) => v.name === 'supports-container')
      expect(supportsContainer?.wrapper).toBe('@supports (container-type: inline-size)')

      const supportsHas = variants.find((v) => v.name === 'supports-has')
      expect(supportsHas?.wrapper).toBe('@supports selector(:has(*))')

      const supportsBackdrop = variants.find((v) => v.name === 'supports-backdrop-blur')
      expect(supportsBackdrop?.wrapper).toBe('@supports (backdrop-filter: blur(1px))')

      const supportsScroll = variants.find((v) => v.name === 'supports-scroll-timeline')
      expect(supportsScroll?.wrapper).toBe('@supports (animation-timeline: scroll())')
    })

    it('should generate arbitrary supports variant with property:value', () => {
      const supportsVariant = variants.find((v) => v.name === 'supports')
      expect(supportsVariant?.match).toEqual(/^supports-\[([^\]]+)\]$/)

      const match = 'supports-[display:grid]'.match(/^supports-\[([^\]]+)\]$/)
      const wrapperFn = supportsVariant?.wrapper as (matches: RegExpMatchArray | null) => string
      expect(wrapperFn(match)).toBe('@supports (display: grid)')
    })

    it('should generate arbitrary supports variant with selector()', () => {
      const supportsVariant = variants.find((v) => v.name === 'supports')
      const match = 'supports-[selector(:has(*))]'.match(/^supports-\[([^\]]+)\]$/)
      const wrapperFn = supportsVariant?.wrapper as (matches: RegExpMatchArray | null) => string
      expect(wrapperFn(match)).toBe('@supports selector(:has(*))')
    })

    it('should handle supports variant without colon', () => {
      const supportsVariant = variants.find((v) => v.name === 'supports')
      const match = 'supports-[display]'.match(/^supports-\[([^\]]+)\]$/)
      const wrapperFn = supportsVariant?.wrapper as (matches: RegExpMatchArray | null) => string
      expect(wrapperFn(match)).toBe('@supports (display)')
    })

    it('should return empty string when no match for supports variant', () => {
      const supportsVariant = variants.find((v) => v.name === 'supports')
      const wrapperFn = supportsVariant?.wrapper as (matches: RegExpMatchArray | null) => string
      expect(wrapperFn(null)).toBe('')
      expect(wrapperFn([])).toBe('')
    })

    it('should generate not-supports variant with property:value', () => {
      const notSupportsVariant = variants.find((v) => v.name === 'not-supports')
      expect(notSupportsVariant?.match).toEqual(/^not-supports-\[([^\]]+)\]$/)

      const match = 'not-supports-[display:grid]'.match(/^not-supports-\[([^\]]+)\]$/)
      const wrapperFn = notSupportsVariant?.wrapper as (matches: RegExpMatchArray | null) => string
      expect(wrapperFn(match)).toBe('@supports not (display: grid)')
    })

    it('should generate not-supports variant with selector()', () => {
      const notSupportsVariant = variants.find((v) => v.name === 'not-supports')
      const match = 'not-supports-[selector(:has(*))]'.match(/^not-supports-\[([^\]]+)\]$/)
      const wrapperFn = notSupportsVariant?.wrapper as (matches: RegExpMatchArray | null) => string
      expect(wrapperFn(match)).toBe('@supports not selector(:has(*))')
    })

    it('should handle not-supports variant without colon', () => {
      const notSupportsVariant = variants.find((v) => v.name === 'not-supports')
      const match = 'not-supports-[display]'.match(/^not-supports-\[([^\]]+)\]$/)
      const wrapperFn = notSupportsVariant?.wrapper as (matches: RegExpMatchArray | null) => string
      expect(wrapperFn(match)).toBe('@supports not (display)')
    })

    it('should return empty string when no match for not-supports variant', () => {
      const notSupportsVariant = variants.find((v) => v.name === 'not-supports')
      const wrapperFn = notSupportsVariant?.wrapper as (matches: RegExpMatchArray | null) => string
      expect(wrapperFn(null)).toBe('')
      expect(wrapperFn([])).toBe('')
    })
  })

  describe('@starting-style Variant', () => {
    it('should generate starting variant', () => {
      const startingVariant = variants.find((v) => v.name === 'starting')
      expect(startingVariant?.wrapper).toBe('@starting-style')
    })
  })
})
