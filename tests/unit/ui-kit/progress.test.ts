import { describe, it, expect } from 'vitest'
import {
  progressTrack,
  progressBar,
  progressLabel,
  progressLabelText,
  progressValue,
  circularProgress,
  circularProgressSvg,
  circularProgressTrack,
  circularProgressIndicator,
  circularProgressLabel,
  indeterminateProgress,
  stepProgress,
  stepProgressStep,
  stepProgressConnector,
  multiProgress,
  multiProgressSegment,
} from '../../../src/ui-kit/progress'

describe('UI-Kit Progress', () => {
  describe('progressTrack', () => {
    it('should return default track styles', () => {
      const classes = progressTrack()
      expect(classes).toContain('w-full')
      expect(classes).toContain('bg-slate-200')
      expect(classes).toContain('overflow-hidden')
      expect(classes).toContain('rounded-full')
    })

    it('should handle different sizes', () => {
      expect(progressTrack({ size: 'xs' })).toContain('h-1')
      expect(progressTrack({ size: 'sm' })).toContain('h-2')
      expect(progressTrack({ size: 'md' })).toContain('h-3')
      expect(progressTrack({ size: 'lg' })).toContain('h-4')
    })

    it('should handle different radius', () => {
      expect(progressTrack({ radius: 'none' })).toContain('rounded-none')
      expect(progressTrack({ radius: 'sm' })).toContain('rounded-sm')
      expect(progressTrack({ radius: 'full' })).toContain('rounded-full')
    })
  })

  describe('progressBar', () => {
    it('should return default bar styles', () => {
      const classes = progressBar()
      expect(classes).toContain('h-full')
      expect(classes).toContain('transition-all')
      expect(classes).toContain('bg-coral-500')
    })

    it('should handle different variants', () => {
      expect(progressBar({ variant: 'default' })).toContain('bg-coral-500')
      expect(progressBar({ variant: 'striped' })).toContain('bg-stripes')
      expect(progressBar({ variant: 'gradient' })).toContain('bg-gradient-to-r')
    })

    it('should handle different colors', () => {
      expect(progressBar({ color: 'red' })).toContain('bg-red-500')
      expect(progressBar({ color: 'blue' })).toContain('bg-blue-500')
      expect(progressBar({ color: 'green' })).toContain('bg-green-500')
    })

    it('should handle gradient colors', () => {
      const classes = progressBar({ variant: 'gradient', color: 'blue' })
      expect(classes).toContain('from-blue-500')
      expect(classes).toContain('to-cyan-400')
    })

    it('should handle animated striped', () => {
      const classes = progressBar({ variant: 'striped', animated: true })
      expect(classes).toContain('animate-progress-stripes')
    })

    it('should not animate non-striped variants', () => {
      const classes = progressBar({ variant: 'default', animated: true })
      expect(classes).not.toContain('animate-progress-stripes')
    })
  })

  describe('progressLabel', () => {
    it('should return label styles', () => {
      const classes = progressLabel()
      expect(classes).toContain('flex')
      expect(classes).toContain('justify-between')
    })
  })

  describe('progressLabelText', () => {
    it('should return label text styles', () => {
      const classes = progressLabelText()
      expect(classes).toContain('text-slate-600')
    })
  })

  describe('progressValue', () => {
    it('should return value styles', () => {
      const classes = progressValue()
      expect(classes).toContain('font-medium')
      expect(classes).toContain('text-slate-900')
    })
  })

  describe('circularProgress', () => {
    it('should return default circular progress styles', () => {
      const classes = circularProgress()
      expect(classes).toContain('relative')
      expect(classes).toContain('w-16')
      expect(classes).toContain('h-16')
    })

    it('should handle different sizes', () => {
      expect(circularProgress({ size: 'sm' })).toContain('w-12')
      expect(circularProgress({ size: 'md' })).toContain('w-16')
      expect(circularProgress({ size: 'lg' })).toContain('w-20')
      expect(circularProgress({ size: 'xl' })).toContain('w-24')
    })
  })

  describe('circularProgressSvg', () => {
    it('should return SVG styles', () => {
      const classes = circularProgressSvg()
      expect(classes).toContain('w-full')
      expect(classes).toContain('h-full')
      expect(classes).toContain('-rotate-90')
    })
  })

  describe('circularProgressTrack', () => {
    it('should return track styles', () => {
      const classes = circularProgressTrack()
      expect(classes).toContain('text-slate-200')
    })
  })

  describe('circularProgressIndicator', () => {
    it('should return indicator styles with default color', () => {
      const classes = circularProgressIndicator()
      expect(classes).toContain('text-coral-500')
      expect(classes).toContain('transition-all')
    })

    it('should handle different colors', () => {
      expect(circularProgressIndicator('blue')).toContain('text-blue-500')
      expect(circularProgressIndicator('red')).toContain('text-red-500')
    })
  })

  describe('circularProgressLabel', () => {
    it('should return label styles', () => {
      const classes = circularProgressLabel()
      expect(classes).toContain('absolute')
      expect(classes).toContain('inset-0')
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('justify-center')
    })
  })

  describe('indeterminateProgress', () => {
    it('should return indeterminate styles', () => {
      const classes = indeterminateProgress()
      expect(classes).toContain('animate-indeterminate')
    })

    it('should include progress bar styles', () => {
      const classes = indeterminateProgress({ color: 'blue' })
      expect(classes).toContain('bg-blue-500')
    })
  })

  describe('stepProgress', () => {
    it('should return step progress container styles', () => {
      const classes = stepProgress()
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('gap-2')
    })
  })

  describe('stepProgressStep', () => {
    it('should return upcoming step styles by default', () => {
      const classes = stepProgressStep()
      expect(classes).toContain('bg-slate-200')
      expect(classes).toContain('rounded-full')
    })

    it('should return complete step styles', () => {
      const classes = stepProgressStep({ status: 'complete' })
      expect(classes).toContain('bg-coral-500')
      expect(classes).toContain('text-white')
    })

    it('should return current step styles', () => {
      const classes = stepProgressStep({ status: 'current' })
      expect(classes).toContain('border-2')
      expect(classes).toContain('border-coral-500')
    })

    it('should handle different colors', () => {
      const classes = stepProgressStep({ status: 'complete', color: 'blue' })
      expect(classes).toContain('bg-blue-500')
    })
  })

  describe('stepProgressConnector', () => {
    it('should return incomplete connector styles by default', () => {
      const classes = stepProgressConnector()
      expect(classes).toContain('bg-slate-200')
      expect(classes).toContain('flex-1')
      expect(classes).toContain('h-1')
    })

    it('should return complete connector styles', () => {
      const classes = stepProgressConnector({ complete: true })
      expect(classes).toContain('bg-coral-500')
    })

    it('should handle different colors', () => {
      const classes = stepProgressConnector({ complete: true, color: 'blue' })
      expect(classes).toContain('bg-blue-500')
    })
  })

  describe('multiProgress', () => {
    it('should return multi progress container styles', () => {
      const classes = multiProgress()
      expect(classes).toContain('flex')
      expect(classes).toContain('w-full')
      expect(classes).toContain('rounded-full')
      expect(classes).toContain('overflow-hidden')
    })
  })

  describe('multiProgressSegment', () => {
    it('should return segment styles with default color', () => {
      const classes = multiProgressSegment()
      expect(classes).toContain('h-full')
      expect(classes).toContain('bg-coral-500')
    })

    it('should handle different colors', () => {
      expect(multiProgressSegment('red')).toContain('bg-red-500')
      expect(multiProgressSegment('blue')).toContain('bg-blue-500')
    })
  })
})
