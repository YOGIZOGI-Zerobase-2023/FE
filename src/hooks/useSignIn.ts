import { useNavigate } from 'react-router-dom';
import { SignInFormDataProps, fetchSignIn } from '../api/auth';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { AUTH_TOKEN_KEY, authUser } from '../store/atom/authAtom';

export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 8;
};

const useSignIn = () => {
  const navigate = useNavigate();
  const setAuthUser = useSetRecoilState(authUser);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [signInData, setSignInData] = useState<SignInFormDataProps>({
    email: '',
    password: ''
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setSignInData((signInData) => ({ ...signInData, [name]: value }));
  };

  const handleSubmitSignIn = async () => {
    if (!validateEmail(signInData.email)) {
      alert('이메일 형식을 입력해주세요.');
      return;
    }
    if (!validatePassword(signInData.password)) {
      alert('비밀번호를 8자리 이상 입력해주세요.');
      return;
    }

    const res = await fetchSignIn(signInData);
    if (!res) {
      alert('문제가 발생했습니다.');
      return;
    }

    if (res.status === 200) {
      const token = res.data.X_Auth_Token;
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      setAuthUser({ token, isLoggedIn: true });
      navigate('/');
    }
  };

  const handdleKakaoSignIn = () => {
    console.log('kakao login');
  };

  const changeBtnDisabled = () => {
    let isCheck = false;
    for (let key in signInData) {
      if (!signInData[key]) {
        isCheck = true;
      }
    }
    setIsDisabled(isCheck);
  };

  useEffect(() => {
    changeBtnDisabled();
  }, [signInData]);

  return {
    signInData,
    isDisabled,
    handleChangeInput,
    handleSubmitSignIn,
    handdleKakaoSignIn
  };
};

export default useSignIn;
