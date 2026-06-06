'use client'
import { useAtomValue } from 'jotai'
import { sameLanguageAtom } from '@/lib/atoms/sameLanguage'

export function SameLanguageBadge() {
  const sameLanguage = useAtomValue(sameLanguageAtom)

  if (!sameLanguage) return null

  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none animate-fade-up'>
      <span className='font-elms-sans font-black text-[9px] tracking-widest uppercase text-prism border-2 border-prism px-3 py-1.5 bg-tint whitespace-nowrap block'>
        same language
      </span>
    </div>
  )
}
