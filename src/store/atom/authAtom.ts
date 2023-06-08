import { atom } from 'recoil';

export const AUTH_TOKEN_KEY = 'authToken';

interface AuthUserProps {
  token: string;
  isLoggedIn: boolean;
}

const initialize: AuthUserProps = {
  token: localStorage.getItem(AUTH_TOKEN_KEY) || '',
  isLoggedIn: !!localStorage.getItem(AUTH_TOKEN_KEY)
};

export const authUser = atom({
  key: 'authUser',
  default: initialize
});
