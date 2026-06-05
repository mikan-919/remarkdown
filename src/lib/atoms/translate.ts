import { atomWithStorage } from 'jotai/utils'

export const translatedTextAtom = atomWithStorage('remarkdown:output', '')
