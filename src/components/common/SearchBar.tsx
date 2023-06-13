import { BiMap } from 'react-icons/bi';
import { FcCalendar } from 'react-icons/fc';
import { BsPeople } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { GetGeoInfo } from '../../utils/getGeoInfo';
import { getFormatedDate } from '../../utils/getFormatedDate';

export interface SearchProps {
  searchValue: string;
  checkInDate: Date;
  checkOutDate: Date;
  people: number;
  userGeoInfo: number[];
}

export const SearchBar = () => {
  const [search, setSearch] = useState<SearchProps>({
    searchValue: '',
    checkInDate: new Date(),
    checkOutDate: new Date(),
    people: 0,
    userGeoInfo: [37.57, 126.9]
  });

  const [dateContent, setDateContent] = useState('');
  const [calendarState, setCalendarState] = useState(false);

  // 사용자가 check-in/check-out date를 선택하면, date를 형식(yyyy-mm-dd)에 맞게 변경
  useEffect(() => {
    if (
      search.checkOutDate.toString().slice(0, 15) !==
      new Date().toString().slice(0, 15)
    ) {
      setDateContent(() => {
        const selectedCheckInDate = getFormatedDate(search.checkInDate);
        const selectedCheckOutDate = getFormatedDate(search.checkOutDate);
        return `${selectedCheckInDate} ~ ${selectedCheckOutDate}`;
      });
    }
  }, [search.checkInDate, search.checkOutDate]);

  const handleSearchState = (property: PropertyKey, value: any) => {
    setSearch((prev) => {
      return { ...prev, [property]: value };
    });
  };

  return (
    <section className="flex flex-col sm:flex-row gap-5 md:gap-10 border min-w-fit w-auto max-w-4xl p-3 shadow-md mx-auto rounded-lg bg-white">
      <div className="w-full md:w-1/2 flex flex-col gap-1">
        <p className="font-semibold text-lg">목적지</p>
        <div className="flex items-center justify-between gap-1 shrink bg-slate-200 rounded-md p-1">
          <input
            type="text"
            placeholder="검색어 입력하세요"
            className="min-w-fit max-w-full lg:w-full h-auto p-0 input focus:outline-none bg-inherit"
            value={search.searchValue}
            onChange={(e) => {
              const newKeyword = e.target.value;
              handleSearchState('searchValue', newKeyword);
            }}
            onFocus={(e) => {
              if (e.target.value === '현재 위치에서 찾기') {
                handleSearchState('searchValue', '');
              }
            }}
          />
          <BiMap
            className="cursor-pointer w-6 h-6"
            onClick={() => {
              GetGeoInfo(setSearch);
              handleSearchState('searchValue', '현재 위치에서 찾기');
            }}
          />
        </div>
      </div>
      <div className='w-full md:w-1/2 flex  justify-between'>
        <div className="relative flex flex-col gap-2 w-1/2 sm:w-1/2">
          <div className="flex items-center font-semibold text-lg gap-1">
            <FcCalendar />
            <span>기간</span>
          </div>
          <p
            className="cursor-pointer"
            onClick={() => setCalendarState(!calendarState)}
          >
            {dateContent !== '' && !calendarState
              ? dateContent
              : '날짜 선택하기'}
          </p>
          <div
            className={`p-3 rounded-lg bg-slate-300 absolute flex flex-col lg:flex-row gap-1 top-14 ${
              calendarState ? 'block' : 'hidden'
            }`}
          >
            <div className="">
              체크인
              <DatePicker
                locale={ko}
                inline
                minDate={new Date()}
                selected={search.checkInDate}
                closeOnScroll={true}
                onChange={(date: Date) => {
                  if (search.checkOutDate)
                    handleSearchState('checkOutDate', new Date());
                  handleSearchState('checkInDate', date);
                }}
              />
            </div>
            <div className="">
              체크아웃
              <DatePicker
                locale={ko}
                inline
                minDate={new Date(search.checkInDate.getTime() + 86400000)}
                selected={search.checkOutDate}
                closeOnScroll={true}
                onChange={(date: Date) => {
                  if (
                    !search.checkInDate ||
                    search.checkInDate.getTime() >= date.getTime()
                  )
                    return;
                  handleSearchState('checkOutDate', date);
                  setCalendarState(!calendarState);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:w-1/4">
          <div className="flex items-center font-semibold gap-1 text-lg">
            <BsPeople /> 인원
          </div>
          <p className="flex gap-3 items-center">
            <button
              className="btn btn-square btn-xs"
              onClick={() => {
                if (search.people === 0) return;
                const peopleNum = search.people - 1;
                handleSearchState('people', peopleNum);
              }}
              disabled={search.people === 0}
            >
              -
            </button>
            {search.people}
            <button
              className="btn btn-square btn-xs"
              onClick={() => {
                const peopleNum = search.people + 1;
                handleSearchState('people', peopleNum);
              }}
              disabled={search.people > 100}
            >
              +
            </button>
          </p>
        </div>
        <div className="flex justify-end items-center w-auto sm:w-1/4">
          <button className="btn font-semibold lg:w-full">
            <BsSearch />
            <span className="hidden lg:block text-lg">검색</span>
          </button>
        </div>
      </div>
    </section>
  );
};
