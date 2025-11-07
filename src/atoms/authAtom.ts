import { atom } from 'jotai';
import type { User } from '../types';

export const isAuthenticatedAtom = atom<boolean>( false);

export const userAtom = atom<User | null>(null);