import useSignIn from '../../hooks/useSignIn';
import { useEffect, useState } from 'react';
import { Link, useLocation, useRoutes } from 'react-router-dom';
import { SearchBar } from './SearchBar';

const Nav = () => {
  const location = useLocation();
  const { authUser, handleLogOut } = useSignIn();
  const [isShow, isSetShow] = useState<boolean>(false);

  const handleShowSearchBar = () => {
    isSetShow((isShow) => !isShow);
  };

  const handleWheelEvent = (e: WheelEvent) => {
    if (isShow && e.deltaY > 5) {
      isSetShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheelEvent);

    return () => {
      window.addEventListener('wheel', handleWheelEvent);
    };
  }, [isShow]);

  useEffect(() => {
    isSetShow(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className="fixed flex-col navbar bg-base-100 w-full drop-shadow-md p-0 z-50 transition-all duration-1000"
        style={{ minWidth: '375px' }}
      >
        <div className="h-16 w-full max-w-5xl px-3">
          <div className="flex-1 pl-2">
            <Link to='/' className="cursor-pointer text-xl font-bold">
              YogiZogi
            </Link>
          </div>
          <div className="flex-none flex items-center gap-4">
            {!isShow && (
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
            )}
            {authUser.isLoggedIn ? (
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
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box text-md"
                >
                  <li>
                    <Link to='/reservationConfirm'>예약확인</Link>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>로그아웃</button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to='/signIn' className="btn btn-error text-white">
                로그인
              </Link>
            )}
          </div>
        </div>
        {isShow && (
          <div className="block p-3 pb-6 w-full">
            <SearchBar />
          </div>
        )}
      </nav>
      {isShow && (
        <div
          className="fixed top-0 h-screen right-0 left-0 bg-black opacity-25 z-40"
          onClick={handleShowSearchBar}
        ></div>
      )}
    </>
  );
};

export default Nav;
