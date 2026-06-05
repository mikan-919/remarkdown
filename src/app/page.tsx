'use client'
import { Pane } from '../components/Pane'
import { CopyButton } from '../components/CopyButton'
import { useTranslate } from '../hooks/useTranslate'

function TranslateEngine() {
  useTranslate()
  return null
}

function Gutter({ side }: { side: 'left' | 'right' }) {
  return (
    <div className='relative overflow-hidden h-full'>
      <div className='absolute inset-0 gutter-pattern opacity-40' />
      <div className={`absolute inset-y-0 w-px ${side === 'left' ? 'right-0' : 'left-0'}`} />
      <div className='absolute inset-0 flex items-center justify-center'>
        <div
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          className='flex flex-col items-center gap-1 select-none'
        >
          <span className='text-sm tracking-[0.25em] font-elms-sans font-black text-haze uppercase'>
            {side === 'left' ? 'src' : 'out'}
          </span>
        </div>
      </div>
      {side === 'right' && (
        <div className='absolute bottom-5 left-3'>
          <CopyButton />
        </div>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <div className='grid-cols-6 grid h-full'>
      <TranslateEngine />
      <Gutter side='left' />
      <Pane direction='left' />
      <Pane direction='right' />
      <Gutter side='right' />
    </div>
  )
}
