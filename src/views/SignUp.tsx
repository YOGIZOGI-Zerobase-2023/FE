import InputBox from '../components/login/InputBox';
import useSignUp from '../hooks/useSignUp';
import { useRecoilValue } from 'recoil';
import { authUser as authAtom } from '../store/atom/authAtom';

const SignUp = () => {
  const authUser = useRecoilValue(authAtom);
  const { signUpData, isDisabled, handleChangeInput, handleSubmitSignUp } =
    useSignUp();

  if (authUser.isLoggedIn) {
    location.href = '/';
    return <></>;
  }

  return (
    <div style={{ height: 'calc(100vh - 112px)' }}>
      <div className="h-full flex">
        <div className="relative flex-1" style={{ backgroundColor: '#00BB98' }}>
          <h1 className="absolute top-1/4 pr-36 w-full text-end text-7xl text-white font-bold  max-lg:text-center max-lg:pr-0">
            YogiZogi
          </h1>
          <img
            className="absolute bottom-0 left-0"
            style={{ maxHeight: '50%' }}
            src="https://yogizogi-zerobase-2023.github.io/FE/assets/images/signin.png"
            alt="일러스트"
          />
        </div>
        <div className="relative bg-white flex-1">
          <div className="absolute max-w-sm w-full pl-10 pr-10 top-1/2 left-16 -translate-y-1/2 max-lg:left-1/2 max-lg:-translate-x-1/2">
            <h1 className="text-3xl font-bold">회원가입</h1>
            <div className="divider m-0 pt-3 pb-4"></div>
            <div className="flex flex-col">
              <InputBox
                title="이메일"
                name="email"
                type="text"
                placeholder="이메일을 입력해주세요."
                value={signUpData.email}
                handleChange={handleChangeInput}
              />
              <InputBox
                title="닉네임"
                name="nickname"
                type="text"
                placeholder="닉네임을 입력해주세요."
                value={signUpData.nickname}
                handleChange={handleChangeInput}
              />
              <InputBox
                title="비밀번호"
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={signUpData.password}
                handleChange={handleChangeInput}
              />
              <InputBox
                title="비밀번호 확인"
                name="passwordCheck"
                type="password"
                placeholder="비밀번호를 다시 입력해주세요."
                value={signUpData.passwordCheck}
                handleChange={handleChangeInput}
              />
              <InputBox
                title="휴대폰 번호"
                name="phone"
                type="tel"
                placeholder="휴대폰 번호를 입력해주세요."
                value={signUpData.phone}
                handleChange={handleChangeInput}
              />
            </div>
            <div className="flex flex-col pt-8">
              {isDisabled ? (
                <button className="btn btn-disabled">회원 가입</button>
              ) : (
                <button
                  className="btn text-white bg-blue-700 hover:bg-blue-600"
                  onClick={handleSubmitSignUp}
                >
                  회원 가입
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
