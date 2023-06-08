import { AiFillStar } from 'react-icons/ai';

interface IRatingStars {
  rate: number;
}

const MAX_RATE = 10;

const RatingStars = ({ rate }: IRatingStars) => {
  const starFill = (rate / MAX_RATE) * 100;

  return (
    <div className="flex items-center gap-1">
      <div className="relative">
        <div className="flex">
          {Array.from({ length: 5 }, () => null).map(() => (
            <AiFillStar className="text-gray-300" />
          ))}
        </div>
        <div
          className="absolute left-0 top-0 z-10 flex overflow-hidden"
          style={{ width: `${starFill}%` }}
        >
          {Array.from({ length: 5 }, () => null).map(() => (
            <AiFillStar className="text-yellow-300 flex-none" />
          ))}
        </div>
      </div>
      <p className="text-sm leading-none">{rate}</p>
    </div>
  );
};

export default RatingStars;
