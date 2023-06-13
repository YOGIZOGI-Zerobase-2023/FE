import { BsChat } from 'react-icons/bs';
import { BiShoppingBag } from 'react-icons/bi';

export const FloatingIcon = () => {
  return (
    <div className="absolute top-3/4 flex flex-col gap-5 right-1 sm:right-5 md:right-10">
      <div className="tooltip tooltip-left tooltip-warning" data-tip="채팅하기">
        <div className="btn btn-warning md:w-16 md:h-16 rounded-[50%]">
          <BsChat className="md:w-6 md:h-6" />
        </div>
      </div>
      <div className="tooltip tooltip-left tooltip-info" data-tip="비교하기">
        <div className="btn btn-info md:w-16 md:h-16 rounded-[50%]">
          <BiShoppingBag className="md:w-6 md:h-6" />
        </div>
      </div>
    </div>
  );
};