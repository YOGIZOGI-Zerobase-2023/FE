import { useEffect, useState } from 'react';
import FacilityDetailMarker from './FacilityDetailMarker';
import { PositionProps } from 'api/map';
import { useNavigate } from 'react-router-dom';
import { ISearchResultContent } from '../../../api/search';

interface FacilityMarkerProps {
  info: ISearchResultContent;
  isActive: boolean;
  handleOnClickMove: (arg1: PositionProps, arg2: number) => void;
}

const FacilityMarker = ({
  info,
  isActive,
  handleOnClickMove
}: FacilityMarkerProps) => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState<boolean>(isActive);
  const formatPrice = info.price.toLocaleString('kr');

  const handleMarkerClick = () => {
    handleOnClickMove({ lat: info.lat, lng: info.lon }, info.id);
  };

  const handleDetailMove = (id: number) => {
    navigate(`/accommodationDetai/${id}`);
  };

  useEffect(() => {
    setIsShow(isActive);
  }, [isActive]);

  return (
    <>
      <div
        className="cursor-pointer px-4 py-1 rounded-lg bg-white text-center drop-shadow-md hover:scale-105"
        onClick={handleMarkerClick}
      >
        <span>₩{formatPrice}</span>
      </div>
      {isShow && (
        <FacilityDetailMarker
          info={info}
          handleOnClick={() => handleDetailMove(1)}
        />
      )}
    </>
  );
};

export default FacilityMarker;
