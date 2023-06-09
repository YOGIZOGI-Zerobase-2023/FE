import { SignUpFormDataProps } from '../api/auth';
import { useEffect, useState } from 'react';
import { validateEmail, validatePassword } from './useSignIn';

const useSignUp = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [signUpData, setSignUpData] = useState<SignUpFormDataProps>({
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
    phone: ''
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setSignUpData((signUpData) => ({ ...signUpData, [name]: value }));
  };

  const handleSubmitSignUp = () => {
    if (!validateEmail(signUpData.email)) {
      alert('이메일 형식을 입력해주세요.');
      return;
    }
    if (signUpData.nickname.length < 2) {
      alert('닉네임을 2자리 이상 입력해주세요.');
      return;
    }
    if (!validatePassword(signUpData.password)) {
      alert('비밀번호를 8자리 이상 입력해주세요.');
      return;
    }
    if (signUpData.password !== signUpData.passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    alert('회원가입');

    // const res = await fetchSignIn(signInData);
    // if (!res) {
    //   alert('문제가 발생했습니다.');
    //   return;
    // }
  };

  const changeBtnDisabled = () => {
    let isCheck = false;
    for (let key in signUpData) {
      if (!signUpData[key]) {
        isCheck = true;
      }
    }
    setIsDisabled(isCheck);
  };

  useEffect(() => {
    changeBtnDisabled();
  }, [signUpData]);

  return { signUpData, isDisabled, handleChangeInput, handleSubmitSignUp };
};

export default useSignUp;
