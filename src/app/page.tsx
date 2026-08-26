'use client'
import { Pane } from '../components/Pane'
import { useTranslate } from '../hooks/useTranslate'
import { ErrorSonar } from '../components/ErrorSonar'
import { SameLanguageBadge } from '../components/SameLanguageBadge'

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
          {side === 'right' && (
            <span className='text-[9px] tracking-widest rotate-180 font-elms-sans text-prism uppercase mt-2'>
              ※ using Gemini 3.1 Flash lite ※
            </span>
          )}

          <span
            className={`${side === 'right' && 'rotate-180'} text-sm tracking-[0.25em] font-elms-sans font-black text-haze uppercase`}
          >
            {side === 'left' ? 'src' : 'out'}
          </span>
          {side === 'left' && (
            <span className='text-[9px] tracking-widest font-elms-sans text-prism uppercase mt-2'>
              ※ using Gemini 3.1 Flash lite ※
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className='grid grid-cols-[4rem_1fr_1fr_4rem] h-full'>
      <TranslateEngine />
      <Gutter side='left' />
      <Pane direction='left' />
      <Pane direction='right' />
      <Gutter side='right' />
      <ErrorSonar />
      <SameLanguageBadge />
    </div>
  )
}
