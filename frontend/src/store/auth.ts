import { atom } from 'jotai';
import type { User } from '../types';

const tokenAtom = atom<string | null>(localStorage.getItem('token'));
const userAtom = atom<User | null>(null);

export const authAtom = atom(
  (get) => ({
    token: get(tokenAtom),
    user: get(userAtom),
    isAuthenticated: !!get(tokenAtom),
  }),
  (_get, set, update: { token?: string | null; user?: User | null }) => {
    if (update.token !== undefined) {
      set(tokenAtom, update.token);
      if (update.token) {
        localStorage.setItem('token', update.token);
      } else {
        localStorage.removeItem('token');
      }
    }
    if (update.user !== undefined) {
      set(userAtom, update.user);
    }
  }
);
