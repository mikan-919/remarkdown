'use client'
import { useAtomValue, useSetAtom, useAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { translateAction } from '../app/actions/translate'
import { markdownAtom } from '../lib/atoms/editor'
import { targetLangAtom } from '../lib/atoms/language'
import { left } from '../lib/atoms/progress'
import { byokKeyAtom } from '../lib/atoms/byok'
import { translatedTextAtom } from '../lib/atoms/translate'
import { translateErrorAtom } from '../lib/atoms/error'
import { sameLanguageAtom } from '../lib/atoms/sameLanguage'
import { translatedHashAtom } from '../lib/atoms/translatedHash'
import { djb2 } from '../lib/hash'
import { RateLimiter } from '../lib/rateLimiter'

const DEBOUNCE_MS = 2_000
const rateLimiter = new RateLimiter()

export function useTranslate() {
  const source = useAtomValue(markdownAtom)
  const targetLang = useAtomValue(targetLangAtom)
  const byokKey = useAtomValue(byokKeyAtom)
  const setTranslated = useSetAtom(translatedTextAtom)
  const [leftState, setLeft] = useAtom(left)
  const setError = useSetAtom(translateErrorAtom)
  const setSameLang = useSetAtom(sameLanguageAtom)
  const [translatedHash, setTranslatedHash] = useAtom(translatedHashAtom)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!source.trim()) {
      setTranslated('')
      setLeft('wait')
      setSameLang(false)
      setTranslatedHash('')
      return
    }

    // Skip translation if output is already up-to-date for this input+lang
    const currentHash = djb2(source + targetLang)
    if (currentHash === translatedHash) {
      setLeft(prev => prev === 'progress' ? 'wait' : prev)
      return
    }

    // If detected language is already known and matches target, pass through without API call
    const knownLang = leftState !== 'wait' && leftState !== 'progress' ? leftState : null
    if (knownLang && knownLang === targetLang) {
      setTranslated(source)
      setSameLang(true)
      setTranslatedHash(currentHash)
      return
    }

    setSameLang(false)
    setLeft('progress')
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(async () => {
      if (!rateLimiter.canRequest()) return

      rateLimiter.record()

      try {
        const { translatedText, detectedLanguage } = await translateAction(source, targetLang, byokKey || undefined)
        if (detectedLanguage === targetLang) {
          setTranslated(source)
          setSameLang(true)
        } else {
          setTranslated(translatedText)
          setSameLang(false)
        }
        setLeft(detectedLanguage)
        setTranslatedHash(djb2(source + targetLang))
      } catch (e) {
        setLeft('wait')
        const msg = e instanceof Error ? e.message : '翻訳に失敗しました'
        setError(msg)
      }
    }, DEBOUNCE_MS)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [source, targetLang, byokKey, setTranslated, setLeft, leftState, setSameLang, setError, translatedHash, setTranslatedHash])
}
