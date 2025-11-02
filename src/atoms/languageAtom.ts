import { atomWithStorage } from 'jotai/utils';

export const languageAtom = atomWithStorage<string>('appLanguage', 'en');
