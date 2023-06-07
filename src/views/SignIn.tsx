import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputBox from '../components/login/InputBox';

interface SignInFormDataProps {
  email: string;
  password: string;
}

const SignIn = () => {
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

  const handleSubmitLogin = () => {
    // API & Validation
  };

  return (
    <div className="pt-20" style={{ height: 'calc(100vh - 100px)' }}>
      <div className="h-full flex">
        <div className="relative flex-1" style={{ backgroundColor: '#00BB98' }}>
          <h1 className="pt-20 text-center text-7xl text-white font-bold">
            YogiZogi
          </h1>
          <img
            className="absolute bottom-0 left-0"
            style={{ maxHeight: '50%' }}
            src="/assets/images/signin.png"
            alt="일러스트"
          />
        </div>
        <div className="relative bg-white flex-1">
          <div className="absolute max-w-sm w-full pl-5 pr-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-3xl font-bold">로그인</h1>
            <div className="divider m-0 pt-3 pb-4"></div>
            <div className="flex flex-col gap-4">
              <InputBox
                title="이메일"
                name="email"
                type="text"
                placeholder="이메일을 입력해주세요."
                value={signInData.email}
                handleChange={handleChangeInput}
              />
              <InputBox
                title="비밀번호"
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={signInData.password}
                handleChange={handleChangeInput}
              />
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" className="toggle" />
                  <span className="label-text">로그인 유지</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-2">
              <button
                className="btn text-white bg-blue-700 hover:bg-blue-600"
                onClick={handleSubmitLogin}
              >
                로그인
              </button>
              <button className="btn gap-0 bg-yellow-300 hover:bg-yellow-300">
                <img
                  src="/assets/icons/kakaoicon.png"
                  alt="카카오 로고"
                  className="w-8 h-8"
                />
                카카오로 시작하기
              </button>
              <p className="text-gray-500 text-sm text-center">
                계정이 없으신가요?{' '}
                <Link to={'/sign-up'} className="text-blue-600">
                  가입하기
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
