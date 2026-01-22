/**
 * Error Handler Tests
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  handleAsyncError,
  tryAsync,
  trySync,
  isSuccess,
  isFailure,
  unwrap,
  getError,
  getData,
  type Result,
} from '../../../src/utils/error-handler'

describe('Error Handler', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  describe('handleAsyncError', () => {
    it('should return failure result with Error instance', () => {
      const error = new Error('Test error')
      const result = handleAsyncError<string>('test operation', error)

      expect(result.success).toBe(false)
      expect(result).toHaveProperty('error')
      if (!result.success) {
        expect(result.error.message).toBe('Test error')
      }
      expect(consoleErrorSpy).toHaveBeenCalledWith('CoralCSS: test operation failed:', error)
    })

    it('should convert non-Error to Error', () => {
      const result = handleAsyncError<string>('test operation', 'string error')

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.message).toBe('string error')
      }
    })

    it('should add context to error', () => {
      const error = new Error('Test error')
      const context = { userId: 123, action: 'test' }
      const result = handleAsyncError<string>('test operation', error, context)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect((result.error as unknown as { context: typeof context }).context).toEqual(context)
      }
    })
  })

  describe('tryAsync', () => {
    it('should return success result on successful async operation', async () => {
      const result = await tryAsync('test', async () => 'success')

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toBe('success')
      }
    })

    it('should return failure result on async operation error', async () => {
      const result = await tryAsync('test', async () => {
        throw new Error('Async error')
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.message).toBe('Async error')
      }
      expect(consoleErrorSpy).toHaveBeenCalled()
    })

    it('should pass context to error handler', async () => {
      const context = { key: 'value' }
      const result = await tryAsync(
        'test',
        async () => {
          throw new Error('Error')
        },
        context
      )

      expect(result.success).toBe(false)
      if (!result.success) {
        expect((result.error as unknown as { context: typeof context }).context).toEqual(context)
      }
    })
  })

  describe('trySync', () => {
    it('should return success result on successful sync operation', () => {
      const result = trySync('test', () => 'success')

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toBe('success')
      }
    })

    it('should return failure result on sync operation error', () => {
      const result = trySync('test', () => {
        throw new Error('Sync error')
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.message).toBe('Sync error')
      }
      expect(consoleErrorSpy).toHaveBeenCalled()
    })

    it('should pass context to error handler', () => {
      const context = { key: 'value' }
      const result = trySync(
        'test',
        () => {
          throw new Error('Error')
        },
        context
      )

      expect(result.success).toBe(false)
      if (!result.success) {
        expect((result.error as unknown as { context: typeof context }).context).toEqual(context)
      }
    })
  })

  describe('isSuccess', () => {
    it('should return true for success result', () => {
      const result: Result<string> = { success: true, data: 'test' }
      expect(isSuccess(result)).toBe(true)
    })

    it('should return false for failure result', () => {
      const result: Result<string> = { success: false, error: new Error('test') }
      expect(isSuccess(result)).toBe(false)
    })
  })

  describe('isFailure', () => {
    it('should return true for failure result', () => {
      const result: Result<string> = { success: false, error: new Error('test') }
      expect(isFailure(result)).toBe(true)
    })

    it('should return false for success result', () => {
      const result: Result<string> = { success: true, data: 'test' }
      expect(isFailure(result)).toBe(false)
    })
  })

  describe('unwrap', () => {
    it('should return data for success result', () => {
      const result: Result<string> = { success: true, data: 'test data' }
      expect(unwrap(result)).toBe('test data')
    })

    it('should throw error for failure result', () => {
      const error = new Error('test error')
      const result: Result<string> = { success: false, error }
      expect(() => unwrap(result)).toThrow('test error')
    })
  })

  describe('getError', () => {
    it('should return error for failure result', () => {
      const error = new Error('test error')
      const result: Result<string> = { success: false, error }
      expect(getError(result)).toBe(error)
    })

    it('should return undefined for success result', () => {
      const result: Result<string> = { success: true, data: 'test' }
      expect(getError(result)).toBeUndefined()
    })
  })

  describe('getData', () => {
    it('should return data for success result', () => {
      const result: Result<string> = { success: true, data: 'test data' }
      expect(getData(result)).toBe('test data')
    })

    it('should return undefined for failure result', () => {
      const result: Result<string> = { success: false, error: new Error('test') }
      expect(getData(result)).toBeUndefined()
    })
  })
})
