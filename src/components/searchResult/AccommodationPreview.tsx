import { FiMapPin } from 'react-icons/fi';
import RatingStars from './RatingStars';

interface IAccommodation {
  categoryId: number;
  accomodationId: number;
  name: string;
  rate: number;
  accommodationImage: string;
  address: string;
  price: number;
  lat: number;
  lon: number;
}

interface IAccommodationPreview {
  data: IAccommodation;
}

const formatPrice = (num: number) =>
  new Intl.NumberFormat('ko-KR', { maximumSignificantDigits: 3 }).format(num);

const AccommodationPreview = ({ data }: IAccommodationPreview) => {
  const { name, rate, accommodationImage, address, price } = data;

  return (
    <article className="card bg-base-100 shadow-xl" style={{ width: '324px' }}>
      <figure
        className="h-60 bg-cover bg-center"
        style={{ backgroundImage: `url('${accommodationImage}')` }}
      ></figure>
      <div className="card-body grid grid-cols-5 grid-rows-3 py-2 px-4">
        <div className="row-start-1 row-end-3 col-start-1 col-end-4">
          <p
            className="card-title text-ellipsis overflow-hidden break-words text-lg"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {name}
          </p>
        </div>
        <p className="row-start-1 row-end-3 col-start-4 col-end-6 text-lg font-bold flex items-center justify-end">
          {`${formatPrice(price)}원`}
        </p>
        <div className="flex items-center gap-2 text-sm row-start-3 row-end-4 col-start-1 col-end-4">
          <FiMapPin className="text-emerald-400 text-2xl" />
          <p className="truncate">{address}</p>
        </div>
        <div className="row-start-3 row-end-4 col-start-4 col-end-6 flex items-center justify-end">
          <RatingStars rate={rate} />
        </div>
      </div>
    </article>
  );
};

export default AccommodationPreview;
