import { LanguageBar } from '@/components/LanguageBar.client'
import { LeftEditor } from '@/components/LeftEditor'
import { RightEditor } from '@/components/RightEditor'

type Props = {
  direction: 'left' | 'right'
}
export function Pane({ direction }: Props) {
  return (
    <div
      className={`${direction === 'left' ? 'border-l-2 border-r col-start-2 col-end-4' : 'border-r-2 border-l col-start-4 col-end-6'} border-prism h-full flex flex-col`}
    >
      <div className='text-6xl w-full border-b-prism border-b-2 flex justify-center items-center px-6 py-5 tracking-tighter font-black font-elms-sans shrink-0 relative overflow-visible'>
        <div className='absolute inset-x-0 bottom-0 h-[2px] bg-prism' />
        <LanguageBar direction={direction} />
      </div>
      <div className='min-h-0 flex-1 relative'>
        {direction === 'left' && <LeftEditor />}
        {direction === 'right' && <RightEditor />}
      </div>
    </div>
  )
}
