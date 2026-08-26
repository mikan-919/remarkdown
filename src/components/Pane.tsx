import { BYOKButton } from '@/components/BYOKButton'
import { CopyButton } from '@/components/CopyButton'
import { LanguageBar } from '@/components/LanguageBar.client'
import { LeftEditor } from '@/components/LeftEditor'
import { RightEditor } from '@/components/RightEditor'

type Props = {
  direction: 'left' | 'right'
}
export function Pane({ direction }: Props) {
  return (
    <div
      className={`${direction === 'left' ? 'border-l-2 border-r col-start-2' : 'border-r-2 border-l col-start-3'} border-prism h-full flex flex-col`}
    >
      <div
        className={`text-4xl xl:text-6xl w-full border-b-2 border-b-prism flex items-center gap-4 px-6 py-5 tracking-tighter font-black font-elms-sans shrink-0 ${direction === 'right' ? 'justify-between' : 'justify-center'}`}
      >
        {direction === 'right' && (
          <div className='flex gap-2 shrink-0'>
            <BYOKButton />
            <CopyButton />
          </div>
        )}
        <LanguageBar direction={direction} />
      </div>
      <div className='min-h-0 flex-1 relative'>
        {direction === 'left' && <LeftEditor />}
        {direction === 'right' && <RightEditor />}
      </div>
    </div>
  )
}
