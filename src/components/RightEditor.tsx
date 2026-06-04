'use client'
import { useAtomValue } from 'jotai'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { translatedTextAtom } from '../lib/atoms/translate'

export function RightEditor() {
  const markdown = useAtomValue(translatedTextAtom)

  return (
    <div className='absolute inset-0 overflow-y-scroll p-6 prose dark:prose-invert max-w-none'>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  )
}
