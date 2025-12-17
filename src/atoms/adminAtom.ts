import { atomWithStorage } from 'jotai/utils';

export const activeMenuItemAtom = atomWithStorage<string>('adminActiveMenuItem', 'dashboard');
