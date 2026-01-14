/**
 * Countdown Component Tests
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Countdown, createCountdown, createCountdownFactory, TimeUnits, CountdownConfig } from '../../../src/components/countdown'

describe('Countdown Component', () => {
  let container: HTMLElement

  const createCountdownElement = (withControls = true): HTMLElement => {
    const div = document.createElement('div')
    div.id = 'test-countdown'
    div.setAttribute('data-coral-countdown', '')

    const prefix = document.createElement('span')
    prefix.setAttribute('data-coral-countdown-prefix', '')
    prefix.textContent = 'Time: '
    div.appendChild(prefix)

    const value = document.createElement('span')
    value.setAttribute('data-coral-countdown-value', '')
    div.appendChild(value)

    const suffix = document.createElement('span')
    suffix.setAttribute('data-coral-countdown-suffix', '')
    suffix.textContent = ' left'
    div.appendChild(suffix)

    if (withControls) {
      const pauseBtn = document.createElement('button')
      pauseBtn.type = 'button'
      pauseBtn.setAttribute('data-coral-countdown-pause', '')
      pauseBtn.textContent = 'Pause'
      div.appendChild(pauseBtn)

      const resetBtn = document.createElement('button')
      resetBtn.type = 'button'
      resetBtn.setAttribute('data-coral-countdown-reset', '')
      resetBtn.textContent = 'Reset'
      div.appendChild(resetBtn)
    }

    return div
  }

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    vi.useFakeTimers()
  })

  afterEach(() => {
    container.remove()
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  describe('initialization', () => {
    it('should create countdown from element', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: false })

      expect(countdown).toBeDefined()
      expect(countdown.id).toBe('test-countdown')
    })

    it('should create countdown with factory function', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = createCountdown(element, { target: 60, autoStart: false })

      expect(countdown).toBeDefined()
    })

    it('should generate ID if not present', () => {
      const element = createCountdownElement()
      element.removeAttribute('id')
      container.appendChild(element)
      new Countdown(element, { target: 60, autoStart: false })

      expect(element.id).toMatch(/^countdown-/)
    })

    it('should apply default configuration', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: false })

      expect(countdown.getRemaining()).toBeGreaterThan(0)
    })

    it('should accept custom configuration', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, {
        target: 120,
        format: 'short',
        showMilliseconds: true,
        autoStart: false,
      })

      expect(countdown.getRemaining()).toBe(120000)
    })

    it('should auto-start when autoStart is true', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: true })

      expect(countdown.isRunning()).toBe(true)
      countdown.destroy()
    })

    it('should not auto-start when autoStart is false', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: false })

      expect(countdown.isRunning()).toBe(false)
    })
  })

  describe('ARIA setup', () => {
    it('should set role="timer" on element', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      new Countdown(element, { target: 60, autoStart: false })

      expect(element.getAttribute('role')).toBe('timer')
    })

    it('should set aria-live="polite" on element', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      new Countdown(element, { target: 60, autoStart: false })

      expect(element.getAttribute('aria-live')).toBe('polite')
    })
  })

  describe('target types', () => {
    it('should handle duration target in seconds', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: false })

      expect(countdown.getRemaining()).toBe(60000)
    })

    it('should handle large number target as milliseconds', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 100000000, autoStart: false })

      expect(countdown.getRemaining()).toBe(100000000)
    })

    it('should handle date target', () => {
      const futureDate = new Date(Date.now() + 60000).toISOString()
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: futureDate, autoStart: false })

      expect(countdown.getRemaining()).toBeGreaterThan(0)
      expect(countdown.getRemaining()).toBeLessThanOrEqual(60000)
    })

    it('should handle invalid date target', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 'invalid-date', autoStart: false })

      expect(countdown.getRemaining()).toBe(0)
      expect(consoleSpy).toHaveBeenCalledWith('Invalid target date:', 'invalid-date')
      consoleSpy.mockRestore()
    })

    it('should use default 60 seconds when no target specified', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { autoStart: false })

      expect(countdown.getRemaining()).toBe(60000)
    })
  })

  describe('pause and resume', () => {
    it('should pause the countdown', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: true })

      countdown.pause()

      expect(countdown.isPaused()).toBe(true)
      expect(countdown.isRunning()).toBe(false)
      countdown.destroy()
    })

    it('should resume the countdown', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: true })

      countdown.pause()
      countdown.resume()

      expect(countdown.isPaused()).toBe(false)
      expect(countdown.isRunning()).toBe(true)
      countdown.destroy()
    })

    it('should toggle pause state', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: true })

      countdown.togglePause()
      expect(countdown.isPaused()).toBe(true)

      countdown.togglePause()
      expect(countdown.isPaused()).toBe(false)
      countdown.destroy()
    })

    it('should update pause button text', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: true })
      const pauseButton = element.querySelector<HTMLButtonElement>('[data-coral-countdown-pause]')!

      countdown.pause()
      expect(pauseButton.textContent).toBe('Resume')

      countdown.resume()
      expect(pauseButton.textContent).toBe('Pause')
      countdown.destroy()
    })
  })

  describe('reset', () => {
    it('should reset the countdown', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: true })

      vi.advanceTimersByTime(10000)
      countdown.reset()

      expect(countdown.getRemaining()).toBe(60000)
      countdown.destroy()
    })

    it('should auto-start after reset if autoStart is true', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: true })

      countdown.reset()

      expect(countdown.isRunning()).toBe(true)
      countdown.destroy()
    })
  })

  describe('time formatting', () => {
    it('should format time in full format', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      new Countdown(element, { target: 3661, format: 'full', autoStart: false })
      const valueElement = element.querySelector('[data-coral-countdown-value]')!

      expect(valueElement.textContent).toContain(':')
    })

    it('should format time in short format', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      new Countdown(element, { target: 3661, format: 'short', autoStart: false })
      const valueElement = element.querySelector('[data-coral-countdown-value]')!

      expect(valueElement.textContent).toMatch(/\d+h \d+m \d+s/)
    })

    it('should format time in minimal format', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      new Countdown(element, { target: 3661, format: 'minimal', autoStart: false })
      const valueElement = element.querySelector('[data-coral-countdown-value]')!

      expect(valueElement.textContent).toMatch(/\d+:\d+:\d+/)
    })

    it('should use custom format template', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      new Countdown(element, {
        target: 3661,
        format: 'custom',
        formatTemplate: '{hours} hours, {minutes} min, {seconds} sec',
        autoStart: false,
      })
      const valueElement = element.querySelector('[data-coral-countdown-value]')!

      expect(valueElement.textContent).toContain('hours')
      expect(valueElement.textContent).toContain('min')
      expect(valueElement.textContent).toContain('sec')
    })

    it('should show milliseconds when configured', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      new Countdown(element, {
        target: 60,
        format: 'minimal',
        showMilliseconds: true,
        autoStart: false,
      })
      const valueElement = element.querySelector('[data-coral-countdown-value]')!

      expect(valueElement.textContent?.split(':').length).toBe(4)
    })

    it('should use custom separator', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      new Countdown(element, {
        target: 60,
        format: 'full',
        separator: '-',
        autoStart: false,
      })
      const valueElement = element.querySelector('[data-coral-countdown-value]')!

      expect(valueElement.textContent).toContain('-')
    })
  })

  describe('state methods', () => {
    it('should return remaining time in milliseconds', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: false })

      expect(countdown.getRemaining()).toBe(60000)
    })

    it('should return time units', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 3661, autoStart: false })
      const units = countdown.getTimeUnits()

      expect(units.hours).toBe(1)
      expect(units.minutes).toBe(1)
      expect(units.seconds).toBe(1)
    })

    it('should return progress percentage', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 100, autoStart: false })

      expect(countdown.getProgress()).toBe(0)
    })

    it('should check if running', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: false })

      expect(countdown.isRunning()).toBe(false)
    })

    it('should check if paused', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: false })

      expect(countdown.isPaused()).toBe(false)
    })

    it('should check if completed', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: false })

      expect(countdown.isCompleted()).toBe(false)
    })
  })

  describe('events', () => {
    it('should emit tick events', () => {
      const tickSpy = vi.fn()
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, {
        target: 60,
        autoStart: true,
        onTick: tickSpy,
        interval: 100,
      })

      vi.advanceTimersByTime(200)

      expect(tickSpy).toHaveBeenCalled()
      countdown.destroy()
    })

    it('should emit complete event when finished', () => {
      const completeSpy = vi.fn()
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, {
        target: 1,
        autoStart: true,
        onComplete: completeSpy,
        interval: 100,
      })

      vi.advanceTimersByTime(2000)

      expect(completeSpy).toHaveBeenCalled()
      expect(countdown.isCompleted()).toBe(true)
      countdown.destroy()
    })
  })

  describe('CSS classes', () => {
    it('should add completed class when finished', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, {
        target: 1,
        autoStart: true,
        interval: 100,
      })

      vi.advanceTimersByTime(2000)

      expect(element.classList.contains('completed')).toBe(true)
      countdown.destroy()
    })

    it('should add paused class when paused', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: true })

      countdown.pause()

      expect(element.classList.contains('paused')).toBe(true)
      countdown.destroy()
    })
  })

  describe('destroy', () => {
    it('should stop countdown on destroy', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      const countdown = new Countdown(element, { target: 60, autoStart: true })

      countdown.destroy()

      expect(countdown.isRunning()).toBe(false)
    })
  })

  describe('factory', () => {
    it('should create countdown with factory', () => {
      const element = createCountdownElement()
      container.appendChild(element)
      // Factory is a function, not an object with .create()
      const countdown = createCountdownFactory(element, { target: 60, autoStart: false })

      expect(countdown).toBeDefined()
      expect(countdown).toBeInstanceOf(Countdown)
    })
  })

  describe('default export', () => {
    it('should export Countdown as default', async () => {
      const { default: DefaultExport } = await import('../../../src/components/countdown')
      expect(DefaultExport).toBe(Countdown)
    })
  })
})
