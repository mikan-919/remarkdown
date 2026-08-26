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
import { readableError } from '../lib/errorMessage'
import { djb2 } from '../lib/hash'
import { RateLimiter } from '../lib/rateLimiter'

const DEBOUNCE_MS = 2_000
const HASH_KEY = 'remarkdown:translated-hash'
const rateLimiter = new RateLimiter()

function readStoredHash(): string {
  try {
    const raw = localStorage.getItem(HASH_KEY)
    return raw ? JSON.parse(raw) : ''
  } catch {
    return ''
  }
}

function writeStoredHash(hash: string) {
  try {
    localStorage.setItem(HASH_KEY, JSON.stringify(hash))
  } catch {}
}

export function useTranslate() {
  const source = useAtomValue(markdownAtom)
  const targetLang = useAtomValue(targetLangAtom)
  const byokKey = useAtomValue(byokKeyAtom)
  const setTranslated = useSetAtom(translatedTextAtom)
  const [leftState, setLeft] = useAtom(left)
  const setError = useSetAtom(translateErrorAtom)
  const setSameLang = useSetAtom(sameLanguageAtom)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const leftStateRef = useRef(leftState)
  leftStateRef.current = leftState

  // True after the first non-empty source has been seen (i.e. past initial hydration)
  const hydratedRef = useRef(false)

  useEffect(() => {
    if (!source.trim()) {
      if (hydratedRef.current) {
        setTranslated('')
        setLeft('wait')
        setSameLang(false)
      }
      return
    }
    hydratedRef.current = true

    // Read hash directly from localStorage to avoid atom hydration race
    const currentHash = djb2(source + targetLang)
    if (currentHash === readStoredHash()) return

    const knownLang = leftStateRef.current !== 'wait' && leftStateRef.current !== 'progress'
      ? leftStateRef.current
      : null
    if (knownLang && knownLang === targetLang) {
      setTranslated(source)
      setSameLang(true)
      writeStoredHash(currentHash)
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
        writeStoredHash(djb2(source + targetLang))
      } catch (e) {
        setLeft('wait')
        const msg = e instanceof Error ? readableError(e.message) : '翻訳に失敗しました'
        setError(msg)
      }
    }, DEBOUNCE_MS)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [source, targetLang, byokKey, setTranslated, setLeft, setSameLang, setError])
}
