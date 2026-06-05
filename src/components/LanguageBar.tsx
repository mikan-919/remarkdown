'use client'
import { useEffect, useRef, useState } from 'react'
import { LANGUAGES, type LanguageCode } from '@/lib/atoms/language'
import type { TranslateState } from '@/lib/atoms/progress'

type LeftBarProps = {
  state: TranslateState
}

function TranslatingDots() {
  return (
    <span className='inline-flex items-end gap-[5px] h-[0.85em] pb-[0.05em]'>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className='inline-block w-[0.22em] h-[0.22em] rounded-full bg-prism'
          style={{
            animation: 'dot-bounce 1.4s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </span>
  )
}

export function LeftLanguageBar({ state }: LeftBarProps) {
  const label = LANGUAGES.find(l => l.code === state)?.label ?? state
  return (
    <h1 className='text-ink flex items-center gap-3'>
      {state === 'wait' ? <span className='text-fog'>—</span> : state === 'progress' ? <TranslatingDots /> : label}
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
    <div
      ref={ref}
      className='relative'
    >
      <button
        type='button'
        onClick={() => setOpen(o => !o)}
        className='group text-ink font-black font-elms-sans tracking-tighter text-6xl leading-none cursor-pointer select-none transition-all duration-200 hover:text-prism flex items-center gap-3'
      >
        {label}
        <svg
          width='0.45em'
          height='0.45em'
          viewBox='0 0 12 8'
          fill='none'
          className={`transition-transform duration-200 text-fog group-hover:text-prism mt-1 ${open ? 'rotate-180' : ''}`}
          aria-hidden='true'
        >
          <path
            d='M1 1.5L6 6.5L11 1.5'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      <div
        className={`
          absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-50
          bg-cloud border border-prism
          overflow-hidden
          transition-all duration-200 origin-top
          ${open ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-y-90 -translate-y-1 pointer-events-none'}
        `}
        style={{ minWidth: '16rem' }}
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
              w-full text-left px-5 py-3 text-sm tracking-wide font-black font-elms-sans
              flex items-center justify-between gap-4
              transition-colors duration-100
              ${lang.code === value ? 'text-prism bg-tint' : 'text-ink hover:bg-veil hover:text-prism'}
              ${i !== 0 ? 'border-t border-smoke' : ''}
            `}
          >
            <span>{lang.label}</span>
            {lang.code === value && (
              <svg
                width='14'
                height='10'
                viewBox='0 0 14 10'
                fill='none'
                aria-hidden='true'
              >
                <path
                  d='M1 5L5.5 9L13 1'
                  stroke='currentColor'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
