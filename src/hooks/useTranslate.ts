'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { translateAction } from '../app/actions/translate'
import { markdownAtom } from '../lib/atoms/editor'
import { targetLangAtom } from '../lib/atoms/language'
import { left } from '../lib/atoms/progress'
import { byokKeyAtom } from '../lib/atoms/byok'
import { translatedTextAtom } from '../lib/atoms/translate'
import { RateLimiter } from '../lib/rateLimiter'

const DEBOUNCE_MS = 2_000
const rateLimiter = new RateLimiter()

export function useTranslate() {
  const source = useAtomValue(markdownAtom)
  const targetLang = useAtomValue(targetLangAtom)
  const byokKey = useAtomValue(byokKeyAtom)
  const setTranslated = useSetAtom(translatedTextAtom)
  const setLeft = useSetAtom(left)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!source.trim()) {
      setTranslated('')
      setLeft('wait')
      return
    }

    setLeft('progress')
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(async () => {
      if (!rateLimiter.canRequest()) return

      rateLimiter.record()

      try {
        const { translatedText, detectedLanguage } = await translateAction(source, targetLang, byokKey || undefined)
        setTranslated(translatedText)
        setLeft(detectedLanguage)
      } catch {
        setLeft('wait')
      }
    }, DEBOUNCE_MS)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [source, targetLang, byokKey, setTranslated, setLeft])
}
