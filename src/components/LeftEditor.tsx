'use client'
import { useSetAtom } from 'jotai'
import { markdownAtom } from '../lib/atoms/editor'
import { Editor } from './Editor'

export function LeftEditor() {
  const setMarkdown = useSetAtom(markdownAtom)

  return (
    <div className='w-full h-full pt-7'>
      <Editor
        className='h-full'
        onChange={value => setMarkdown(value ?? '')}
      />
    </div>
  )
}
