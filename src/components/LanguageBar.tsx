'use client'
import { useEffect, useRef, useState } from 'react'
import { LANGUAGES, type LanguageCode } from '@/lib/atoms/language'
import type { TranslateState } from '@/lib/atoms/progress'

type LeftBarProps = {
  state: TranslateState
}

export function LeftLanguageBar({ state }: LeftBarProps) {
  const label = LANGUAGES.find(l => l.code === state)?.label ?? state
  return (
    <h1 className='text-ink'>
      {state === 'wait' ? '(・・)' : state === 'progress' ? '(・・);;' : label}
    </h1>
  )
}

type RightBarProps = {
  value: LanguageCode
  onChange: (lang: LanguageCode) => void
}

export function RightLanguageBar({ value, onChange }: RightBarProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const label = LANGUAGES.find(l => l.code === value)?.label ?? value

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className='relative'>
      <button
        type='button'
        onClick={() => setOpen(o => !o)}
        className='text-ink font-black font-elms-sans tracking-tighter text-6xl leading-none cursor-pointer select-none transition-opacity duration-150 hover:opacity-60'
      >
        {label}
      </button>

      <div
        className={`
          absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-50
          bg-cloud border border-smoke
          overflow-hidden
          transition-all duration-200 origin-top
          ${open ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-75 pointer-events-none'}
        `}
        style={{ minWidth: '14rem' }}
      >
        {LANGUAGES.map((lang, i) => (
          <button
            key={lang.code}
            type='button'
            onClick={() => {
              onChange(lang.code)
              setOpen(false)
            }}
            className={`
              w-full text-left px-6 py-3 text-sm tracking-wide font-black font-elms-sans
              transition-colors duration-100
              ${lang.code === value
                ? 'text-prism bg-haze/30'
                : 'text-ink hover:bg-smoke'
              }
              ${i !== 0 ? 'border-t border-smoke' : ''}
            `}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  )
}
