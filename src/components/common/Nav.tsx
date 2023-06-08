import { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isShow, isSetShow] = useState<boolean>(false);

  const handleShowSearchBar = () => {
    isSetShow((isShow) => !isShow);
  };

  const handleLogOut = () => {
    setIsLogin((isLogin) => !isLogin);
  };

  return (
    <div className="fixed flex-col navbar bg-base-100 w-full drop-shadow-md z-50">
      <div
        className="m-auto h-16 w-full"
        style={{ maxWidth: '1294px', minWidth: '375px' }}
      >
        <div className="flex-1 pl-4">
          <Link to={'/'} className="cursor-pointer text-xl font-bold">
            YogiZogi
          </Link>
        </div>
        <div className="flex-none flex items-center gap-4">
          <button
            className="btn btn-square btn-ghost"
            onClick={handleShowSearchBar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
          {isLogin ? (
            <div className="dropdown dropdown-end dropdown-hover">
              <label tabIndex={0} className="btn btn-square btn-ghost m-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-xl"
              >
                <li>
                  <Link to={'/reservationConfirm'}>예약확인</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>로그아웃</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={'/sign-in'} className="btn btn-error text-white">
              로그인
            </Link>
          )}
        </div>
      </div>
      {isShow && (
        <div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-3xl"
          />
        </div>
      )}
    </div>
  );
};

export default Nav;
