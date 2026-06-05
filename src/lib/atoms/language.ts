import { atom } from 'jotai'

export const LANGUAGES = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
  { code: 'zh-CN', label: '中文（简）' },
  { code: 'zh-TW', label: '中文（繁）' },
  { code: 'ko', label: '한국어' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']

export const targetLangAtom = atom<LanguageCode>('en')
