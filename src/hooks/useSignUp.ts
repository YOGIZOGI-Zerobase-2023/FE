import { SignUpFormDataProps, fetchSignUp } from '../api/auth';
import { useEffect, useState } from 'react';
import { validateEmail, validatePassword } from './useSignIn';
import { useNavigate } from 'react-router-dom';

const useSignUp = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [signUpData, setSignUpData] = useState<SignUpFormDataProps>({
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
    phone: ''
  });

  const autoHyphen = (value: string) => {
    return value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(\-{1,2})$/g, '');
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    if (name === 'phone') {
      const phone = autoHyphen(value);
      setSignUpData((signUpData) => ({ ...signUpData, phone: phone }));
    } else {
      setSignUpData((signUpData) => ({ ...signUpData, [name]: value }));
    }
  };

  const handleSubmitSignUp = async () => {
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
    if (signUpData.phone.length !== 13) {
      alert('휴대폰 번호를 확인해주세요');
      return;
    }

    const res = await fetchSignUp(signUpData);
    if (!res) {
      alert('문제가 발생했습니다.');
      return;
    }
    if (res.status === 201) {
      alert('회원가입완료');
      navigate('/signIn');
    }
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
