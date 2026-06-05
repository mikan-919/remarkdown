'use client'
import { useAtomValue, useSetAtom } from 'jotai'
import { targetLangAtom } from '@/lib/atoms/language'
import { left } from '@/lib/atoms/progress'
import { LeftLanguageBar, RightLanguageBar } from './LanguageBar'

type Props = {
  direction: 'left' | 'right'
}

export function LanguageBar({ direction }: Props) {
  const leftState = useAtomValue(left)
  const targetLang = useAtomValue(targetLangAtom)
  const setTargetLang = useSetAtom(targetLangAtom)

  if (direction === 'left') {
    return <LeftLanguageBar state={leftState} />
  }

  return (
    <RightLanguageBar
      value={targetLang}
      onChange={(lang: string) => setTargetLang(lang)}
    />
  )
}
