'use client'
import { useAtomValue } from 'jotai'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { translatedTextAtom } from '../lib/atoms/translate'
import { left } from '../lib/atoms/progress'

export function RightEditor() {
  const markdown = useAtomValue(translatedTextAtom)
  const leftState = useAtomValue(left)
  const isProgress = leftState === 'progress'

  return (
    <div className='absolute inset-0'>
      <div className='absolute inset-0 overflow-y-scroll scrollbar-thin px-8 py-7 prose dark:prose-invert max-w-none prose-headings:font-elms-sans prose-headings:tracking-tight prose-headings:text-ink prose-p:text-ink prose-a:text-prism prose-a:no-underline hover:prose-a:underline prose-code:text-depth prose-strong:text-ink prose-hr:border-smoke'>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>

      {/* translation-in-progress overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isProgress ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className='absolute inset-0 gutter-pattern-dense opacity-60' />
        <span className='relative font-elms-sans font-black text-[11px] tracking-[0.3em] uppercase text-depth select-none'>
          Translation
        </span>
      </div>
    </div>
  )
}
