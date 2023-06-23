import { useState } from 'react';
import RatingSetStar from './RatingSetStar';
import useAuth from '../../hooks/useAuth';
import { IRateFactor } from './types';
import {
  MAX_REVIEW_LENGTH,
  initialRating,
  ratingFactorsInfo
} from './constants';
import { AiOutlineClose } from 'react-icons/ai';
import { registerReview } from '../../api/registerReview';

interface IReviewModal {
  accommodationId: number;
  onClose: () => void;
}

const ReviewModal = ({ accommodationId, onClose }: IReviewModal) => {
  const { authUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(initialRating);

  const [errorMessage, setErrorMessage] = useState('');

  const handleModalClose = () => {
    setReviewText('');
    setRating(initialRating);
    onClose();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.currentTarget.value);
  };

  const handleRateChange = (factor: IRateFactor, value: number) => {
    setRating({ ...rating, [factor.id]: value });
  };

  const handleSubmit = async () => {
    const description = reviewText.trim();

    if (description === '') {
      setErrorMessage('리뷰 내용을 작성해주세요.');
      return;
    }

    if (description.length > MAX_REVIEW_LENGTH) {
      setErrorMessage('리뷰 내용은 200자까지 작성 가능합니다.');
      return;
    }

    if (!rating.service || !rating.price || !rating.facilities) {
      setErrorMessage('별점을 모두 부여해주세요.');
      return;
    }

    // if (!authUser.isLoggedIn || !authUser.user.email) {
    //   setErrorMessage('잘못된 사용자 정보입니다. 다시 로그인 해주세요.');
    // }

    setErrorMessage('');

    const averageRate = Number(
      (rating.service + rating.price + rating.facilities / 3).toFixed(1)
    );

    const requestBody = {
      description,
      rating: averageRate,
      accommodationId,
      email: 'test@test.com'
      //   email: authUser.user.email
    };

    setIsLoading(true);

    const {
      data: { status, msg }
    } = await registerReview(requestBody);

    if (status === 'OK') {
      alert('리뷰를 성공적으로 등록했습니다.');
      location.reload();
      return;
    }

    alert(`리뷰 등록에 실패하였습니다: ${msg}`);
    location.reload();
  };

  return (
    <div className="p-12 h-[36rem]">
      <div
        className="absolute top-0 right-0 w-8 h-8 flex justify-center items-center bg-red-500 cursor-pointer text-white"
        onClick={handleModalClose}
      >
        <AiOutlineClose />
      </div>

      {!isLoading ? (
        <div>
          <h6 className="text-center font-bold text-lg">숙소 리뷰 남기기</h6>

          <div className="mt-8">
            <p className="mb-2 text-sm">
              숙소는 어땠나요? 경험을 공유해주세요.
            </p>
            <textarea
              name="reivewText"
              id="reviewText"
              placeholder="내용을 입력해주세요..."
              className="resize-none bg-gray-200 w-full h-36 rounded p-4"
              value={reviewText}
              onChange={handleTextChange}
              required
              maxLength={MAX_REVIEW_LENGTH}
            ></textarea>
          </div>

          <div className="mt-8 text-sm">
            <p className="mb-4">별점으로 평가해주세요.</p>
            <div className="flex flex-col gap-2 text-xs">
              {ratingFactorsInfo.map((factor) => {
                return (
                  <div key={factor.id} className="flex">
                    <p className="w-20">{factor.text}</p>
                    <RatingSetStar
                      rating={rating[factor.id]}
                      onChange={(value: number) =>
                        handleRateChange(factor, value)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-center items-center">
            <p className="text-sm font-bold text-red-500 mb-4">
              {errorMessage}
            </p>
            <button
              className="btn bg-red-500 hover:bg-red-600 text-white w-32"
              onClick={handleSubmit}
            >
              등록
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default ReviewModal;
