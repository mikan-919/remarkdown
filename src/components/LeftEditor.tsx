'use client'
import { useSetAtom } from 'jotai'
import { markdownAtom } from '../lib/atoms/editor'
import { Editor } from './Editor'

const STORAGE_KEY = 'remarkdown:input'

function getPersistedInput(): string {
  if (typeof window === 'undefined') return ''
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : ''
  } catch {
    return ''
  }
}

export function LeftEditor() {
  const setMarkdown = useSetAtom(markdownAtom)

  return (
    <div className='w-full h-full pt-7'>
      <Editor
        className='h-full'
        defaultValue={getPersistedInput()}
        onChange={value => setMarkdown(value ?? '')}
      />
    </div>
  )
}
