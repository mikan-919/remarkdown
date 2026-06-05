import { atomWithStorage } from 'jotai/utils'

export type TranslateState = 'wait' | 'progress' | string

// Persist detected language (BCP-47 code); 'progress' is never stored
export const left = atomWithStorage<TranslateState>('remarkdown:detected-lang', 'wait', {
  getItem(key) {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return 'wait'
      const val = JSON.parse(raw)
      return val !== 'progress' ? val : 'wait'
    } catch {
      return 'wait'
    }
  },
  setItem(key, value) {
    if (value === 'progress') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  },
  removeItem(key) {
    localStorage.removeItem(key)
  },
})
