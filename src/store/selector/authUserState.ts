import { selector } from 'recoil';
import {
  AUTH_TOKEN_KEY,
  authUser as authAtom
} from '../../store/atom/authAtom';
import { decoderToken } from '../../utils/tokenUtil';

/**
 * auth state에 있는 토큰을 decode해서 select
 */
export const authLoginState = selector({
  key: 'authentification/id',
  get: ({ get }) => {
    const value = get(authAtom);

    if (value.token) {
      const payload = decoderToken(value.token);
      if (payload) {
        return {
          ...value,
          user: payload.user,
          expiration: payload.expiration
        };
      } else {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
        return { ...value, token: '', user: {}, isLoggedIn: false };
      }
    }

    return value;
  },
  set({ set }, newValue) {
    set(authAtom, newValue);
  }
});
