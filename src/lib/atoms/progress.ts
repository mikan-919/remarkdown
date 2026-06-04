import { atom } from 'jotai'

export type TranslateState = 'wait' | 'progress' | string
export const left = atom<TranslateState>('wait')
