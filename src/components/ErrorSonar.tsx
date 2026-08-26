'use client'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { translateErrorAtom } from '@/lib/atoms/error'

const DISMISS_MS = 4_000

export function ErrorSonar() {
  const [error, setError] = useAtom(translateErrorAtom)

  useEffect(() => {
    if (!error) return
    const t = setTimeout(() => setError(null), DISMISS_MS)
    return () => clearTimeout(t)
  }, [error, setError])

  if (!error) return null

  return (
    <div className='fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none animate-fade-up'>
      {/* sonar rings */}
      <div className='relative flex items-center justify-center mb-3'>
        <span className='absolute w-8 h-8 rounded-full border border-prism opacity-60 animate-[sonar-ring_1.6s_ease-out_infinite]' />
        <span className='absolute w-8 h-8 rounded-full border border-prism opacity-40 animate-[sonar-ring_1.6s_ease-out_0.5s_infinite]' />
        <span className='absolute w-8 h-8 rounded-full border border-prism opacity-20 animate-[sonar-ring_1.6s_ease-out_1s_infinite]' />
        <span className='w-2 h-2 rounded-full bg-prism' />
      </div>
      {/* message */}
      <div className='border-2 border-prism bg-cloud px-4 py-2 max-w-xs text-center'>
        <p className='font-elms-sans font-black text-[10px] tracking-widest uppercase text-prism'>
          Translation Error
        </p>
        <p className='font-mono text-[10px] text-dusk mt-0.5 break-words line-clamp-3'>{error}</p>
      </div>
    </div>
  )
}
