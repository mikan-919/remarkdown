'use client'

import type { EditorProps } from '@monaco-editor/react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { jetbrainsMono, udevGothic } from '../lib/font'
import { defineElmsCloudTheme } from '../lib/monacoThemeDefine'

const Monaco = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
})

function useMonacoTheme() {
  const [theme, setTheme] = useState<'elms-cloud' | 'elms-cloud-dark'>(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'elms-cloud-dark'
      : 'elms-cloud'
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setTheme(mq.matches ? 'elms-cloud-dark' : 'elms-cloud')
    const handler = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? 'elms-cloud-dark' : 'elms-cloud')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return theme
}

export function Editor({ options, beforeMount, theme: _theme, ...props }: EditorProps) {
  const theme = useMonacoTheme()

  return (
    <Monaco
      language='markdown'
      theme={theme}
      options={{
        scrollBeyondLastLine: false,
        fontSize: 16,
        fontFamily: `${udevGothic.style.fontFamily}, ${jetbrainsMono.style.fontFamily}`,
        ...options,
      }}
      beforeMount={monaco => {
        defineElmsCloudTheme(monaco)
        beforeMount?.(monaco)
      }}
      {...props}
    />
  )
}
