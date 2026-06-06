'use client'
import * as Popover from '@radix-ui/react-popover'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { byokKeyAtom } from '@/lib/atoms/byok'

export function BYOKButton() {
  const [byokKey, setByokKey] = useAtom(byokKeyAtom)
  const [draft, setDraft] = useState('')
  const [open, setOpen] = useState(false)

  function handleOpen(next: boolean) {
    if (next) setDraft(byokKey)
    setOpen(next)
  }

  function handleSave() {
    setByokKey(draft.trim())
    setOpen(false)
  }

  function handleClear() {
    setDraft('')
    setByokKey('')
    setOpen(false)
  }

  const hasKey = byokKey.length > 0

  return (
    <Popover.Root open={open} onOpenChange={handleOpen}>
      <Popover.Trigger asChild>
        <button
          type='button'
          title={hasKey ? 'カスタムAPIキーを使用中' : '自分のAPIキーを使う (BYOK)'}
          className={`
            flex items-center gap-2 px-4 py-2.5 border-2
            font-elms-sans font-black text-sm tracking-wide
            transition-all duration-200
            ${
              hasKey
                ? 'border-depth bg-depth text-white hover:bg-prism hover:border-prism'
                : 'border-prism bg-cloud text-prism hover:bg-prism hover:text-white active:scale-95'
            }
          `}
        >
          <svg width='11' height='11' viewBox='0 0 11 11' fill='none' aria-hidden='true'>
            <circle cx='4' cy='4.5' r='2.5' stroke='currentColor' strokeWidth='1.3' />
            <path d='M6 6.5L9.5 10' stroke='currentColor' strokeWidth='1.3' strokeLinecap='round' />
            <path d='M8 8.5L9.5 7' stroke='currentColor' strokeWidth='1.3' strokeLinecap='round' />
          </svg>
          {hasKey ? 'BYOK ✓' : 'BYOK'}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side='top'
          align='start'
          sideOffset={8}
          className='
            z-50 w-72 border-2 border-prism bg-cloud
            transition-opacity duration-200
            data-[state=closed]:opacity-0 data-[state=open]:opacity-100
          '
        >
          <div className='p-4 flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
              <span className='font-elms-sans font-black text-xs tracking-widest uppercase text-prism'>
                Bring Your Own Key
              </span>
              <Popover.Close asChild>
                <button
                  type='button'
                  className='text-fog hover:text-ink transition-colors duration-150'
                  aria-label='閉じる'
                >
                  <svg width='12' height='12' viewBox='0 0 12 12' fill='none' aria-hidden='true'>
                    <path d='M1 1L11 11M11 1L1 11' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                  </svg>
                </button>
              </Popover.Close>
            </div>

            <p className='text-[10px] text-dusk font-elms-sans tracking-wide leading-relaxed'>
              Gemini APIキーを入力すると、サーバーのキーではなくあなた自身のキーで翻訳します。
            </p>

            <input
              type='password'
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              placeholder='AIza...'
              autoComplete='off'
              spellCheck={false}
              className='
                w-full border border-smoke bg-white text-ink
                font-mono text-xs px-3 py-2
                placeholder:text-fog
                focus:outline-none focus:border-prism
                transition-colors duration-150
              '
            />

            <div className='flex gap-2'>
              <button
                type='button'
                onClick={handleSave}
                disabled={!draft.trim()}
                className='
                  flex-1 px-3 py-1.5 border-2 border-prism
                  font-elms-sans font-black text-[10px] tracking-widest uppercase
                  bg-cloud text-prism
                  hover:bg-prism hover:text-white
                  active:scale-95
                  transition-all duration-200
                  disabled:opacity-25 disabled:cursor-not-allowed
                '
              >
                保存
              </button>
              {hasKey && (
                <button
                  type='button'
                  onClick={handleClear}
                  className='
                    px-3 py-1.5 border-2 border-prism
                    font-elms-sans font-black text-[10px] tracking-widest uppercase
                    bg-cloud text-prism
                    hover:bg-prism hover:text-white
                    active:scale-95
                    transition-all duration-200
                  '
                >
                  クリア
                </button>
              )}
            </div>
          </div>

          <Popover.Arrow className='fill-prism' width={10} height={5} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
