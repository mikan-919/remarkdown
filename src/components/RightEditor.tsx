'use client'
import { useAtomValue } from 'jotai'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { translatedTextAtom } from '../lib/atoms/translate'

export function RightEditor() {
  const markdown = useAtomValue(translatedTextAtom)

  return (
    <div className='absolute inset-0 overflow-y-scroll scrollbar-thin px-8 py-7 prose dark:prose-invert max-w-none prose-headings:font-elms-sans prose-headings:tracking-tight prose-headings:text-ink prose-p:text-ink/90 prose-a:text-prism prose-a:no-underline hover:prose-a:underline prose-code:text-depth prose-strong:text-ink prose-hr:border-smoke'>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  )
}
