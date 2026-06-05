'use client'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { translatedTextAtom } from '@/lib/atoms/translate'

export function CopyButton() {
  const text = useAtomValue(translatedTextAtom)
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button
      type='button'
      onClick={handleCopy}
      disabled={!text}
      title={copied ? 'コピーしました' : 'テキストをコピー'}
      className={`
        flex items-center gap-2 px-4 py-2.5 border-2
        font-elms-sans font-black text-sm tracking-wide
        transition-all duration-200 shadow-sm
        disabled:opacity-25 disabled:cursor-not-allowed
        ${
          copied
            ? 'border-prism bg-prism text-white'
            : 'border-prism bg-cloud text-prism hover:bg-prism hover:text-white active:scale-95'
        }
      `}
    >
      {copied ? (
        <>
          <svg
            width='13'
            height='10'
            viewBox='0 0 13 10'
            fill='none'
            aria-hidden='true'
          >
            <path
              d='M1 5L4.5 8.5L12 1'
              stroke='currentColor'
              strokeWidth='1.6'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg
            width='13'
            height='14'
            viewBox='0 0 13 14'
            fill='none'
            aria-hidden='true'
          >
            <rect
              x='4'
              y='4'
              width='8'
              height='9'
              rx='0.5'
              stroke='currentColor'
              strokeWidth='1.3'
            />
            <path
              d='M9 4V2.5C9 2.22386 8.77614 2 8.5 2H1.5C1.22386 2 1 2.22386 1 2.5V10.5C1 10.7761 1.22386 11 1.5 11H4'
              stroke='currentColor'
              strokeWidth='1.3'
              strokeLinecap='round'
            />
          </svg>
          Copy
        </>
      )}
    </button>
  )
}
