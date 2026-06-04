'use client'
import { Pane } from '../components/Pane'
import { useTranslate } from '../hooks/useTranslate'

function TranslateEngine() {
  useTranslate()
  return null
}

export default function Home() {
  return (
    <div className='grid-cols-6 grid h-full'>
      <TranslateEngine />
      <div></div>
      <Pane direction='left' />
      <Pane direction='right' />
      <div></div>
    </div>
  )
}
