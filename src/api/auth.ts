import axios from 'axios';
import { error } from 'console';

export interface SignInFormDataProps {
  [key: string]: string;
  email: string;
  password: string;
}

export interface SignUpFormDataProps extends SignInFormDataProps {
  nickname: string;
  passwordCheck: string;
  phone: string;
}

export const fetchSignIn = async (data: SignInFormDataProps) => {
  const res = await axios({
    method: 'post',
    url: '/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }).catch((error) => console.log(error));

  return res;
};

export const fetchSignUp = async (data: SignUpFormDataProps) => {
  const res = await axios({
    method: 'post',
    url: '/signup',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }).catch((error) => console.log(error));

  return res;
};
