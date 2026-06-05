'use client'
import { useEffect, useRef, useState } from 'react'
import { LANGUAGES, type LanguageCode } from '@/lib/atoms/language'
import type { TranslateState } from '@/lib/atoms/progress'

type LeftBarProps = {
  state: TranslateState
}

function TranslatingDots() {
  return (
    <span className='inline-flex items-end gap-[5px] h-15'>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className='inline-block w-[0.22em] h-[0.22em] rounded-full bg-prism font-elms-sans'
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
  value: string
  onChange: (lang: string) => void
}

const CUSTOM_SENTINEL = '__custom__'

export function RightLanguageBar({ value, onChange }: RightBarProps) {
  const [open, setOpen] = useState(false)
  const [customDraft, setCustomDraft] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isCustom = !LANGUAGES.some(l => l.code === value)
  const label = isCustom ? value : (LANGUAGES.find(l => l.code === value)?.label ?? value)

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
              setShowCustomInput(false)
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

        {/* Custom BCP-47 row */}
        <div className='border-t border-smoke'>
          {!showCustomInput ? (
            <button
              type='button'
              onClick={() => {
                setCustomDraft(isCustom ? value : '')
                setShowCustomInput(true)
              }}
              className={`
                w-full text-left px-5 py-3 text-sm tracking-wide font-black font-elms-sans
                flex items-center justify-between gap-4
                transition-colors duration-100
                ${isCustom ? 'text-prism bg-tint' : 'text-ink hover:bg-veil hover:text-prism'}
              `}
            >
              <span>Custom…</span>
              {isCustom && (
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
          ) : (
            <div className='px-4 py-3 flex gap-2'>
              <input
                autoFocus
                type='text'
                value={customDraft}
                onChange={e => setCustomDraft(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && customDraft.trim()) {
                    onChange(customDraft.trim())
                    setShowCustomInput(false)
                    setOpen(false)
                  }
                  if (e.key === 'Escape') setShowCustomInput(false)
                }}
                placeholder='e.g. th, ar, hi'
                className='flex-1 border border-smoke bg-white text-ink font-mono text-xs px-2 py-1.5 placeholder:text-fog focus:outline-none focus:border-prism transition-colors duration-150'
              />
              <button
                type='button'
                disabled={!customDraft.trim()}
                onClick={() => {
                  onChange(customDraft.trim())
                  setShowCustomInput(false)
                  setOpen(false)
                }}
                className='px-3 py-1.5 border-2 border-prism font-elms-sans font-black text-[10px] tracking-widest uppercase bg-cloud text-prism hover:bg-prism hover:text-white active:scale-95 transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed'
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
