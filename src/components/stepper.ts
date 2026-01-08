/**
 * Stepper Component
 *
 * Step indicator for multi-step processes.
 * @module components/stepper
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface StepperConfig extends ComponentConfig {
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Allow clicking on steps */
  clickable?: boolean
  /** Current step (0-indexed) */
  defaultStep?: number
}

export interface StepperState extends ComponentState {
  currentStep: number
  completedSteps: Set<number>
}

/**
 * Stepper component for step indicators
 */
export class Stepper extends BaseComponent {
  private steps: HTMLElement[] = []

  protected getDefaultConfig(): StepperConfig {
    return {
      orientation: 'horizontal',
      clickable: false,
      defaultStep: 0,
    }
  }

  protected getInitialState(): StepperState {
    const config = this.config as StepperConfig
    return {
      currentStep: config.defaultStep ?? 0,
      completedSteps: new Set(),
    }
  }

  protected setupAria(): void {
    const config = this.config as StepperConfig
    this.element.setAttribute('role', 'navigation')
    this.element.setAttribute('aria-label', 'Progress')
    this.element.dataset.orientation = config.orientation

    this.steps = Array.from(this.queryAll('[data-coral-stepper-step]'))
    this.steps.forEach((step, index) => {
      step.setAttribute('role', 'listitem')
      step.dataset.step = String(index)
    })
  }

  protected bindEvents(): void {
    const config = this.config as StepperConfig

    if (config.clickable) {
      this.steps.forEach((step, index) => {
        const handleClick = () => {
          const state = this.state as StepperState
          if (index <= state.currentStep || state.completedSteps.has(index - 1)) {
            this.goToStep(index)
          }
        }
        this.addEventListener(step, 'click', handleClick)
      })
    }
  }

  protected override render(): void {
    const state = this.state as StepperState

    this.steps.forEach((step, index) => {
      const isCompleted = state.completedSteps.has(index)
      const isCurrent = index === state.currentStep
      const isUpcoming = index > state.currentStep && !isCompleted

      step.dataset.completed = String(isCompleted)
      step.dataset.current = String(isCurrent)
      step.dataset.upcoming = String(isUpcoming)
      step.setAttribute('aria-current', isCurrent ? 'step' : 'false')
    })
  }

  goToStep(step: number): void {
    if (step < 0 || step >= this.steps.length) return

    const state = this.state as StepperState
    const prevStep = state.currentStep

    // Mark previous steps as completed
    const newCompleted = new Set(state.completedSteps)
    for (let i = 0; i < step; i++) {
      newCompleted.add(i)
    }

    this.setState({
      currentStep: step,
      completedSteps: newCompleted,
    })

    this.dispatch('step-change', { step, prevStep })
  }

  next(): void {
    const state = this.state as StepperState
    if (state.currentStep < this.steps.length - 1) {
      this.goToStep(state.currentStep + 1)
    }
  }

  prev(): void {
    const state = this.state as StepperState
    if (state.currentStep > 0) {
      this.goToStep(state.currentStep - 1)
    }
  }

  complete(): void {
    const state = this.state as StepperState
    const newCompleted = new Set(state.completedSteps)
    newCompleted.add(state.currentStep)
    this.setState({ completedSteps: newCompleted })
    this.dispatch('complete', { step: state.currentStep })
  }

  reset(): void {
    this.setState({
      currentStep: 0,
      completedSteps: new Set(),
    })
    this.dispatch('reset')
  }

  getCurrentStep(): number {
    return (this.state as StepperState).currentStep
  }

  isCompleted(step: number): boolean {
    return (this.state as StepperState).completedSteps.has(step)
  }
}

export const createStepper = createComponentFactory(Stepper)
export default Stepper
