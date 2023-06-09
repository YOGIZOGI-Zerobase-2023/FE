import useModal from '../../hooks/useModal';

const Modal = () => {
  const { modalDataState, closeModal } = useModal();

  const handleBtnOnClick = () => {
    if (modalDataState.handleBtnClick) modalDataState.handleBtnClick();
    closeModal();
  };

  return (
    <>
      {modalDataState.isOpen && (
        <>
          <div
            id="background"
            className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 z-40"
            onClick={closeModal}
          >
            <div
              className="absolute flex flex-col justify-between gap-6 top-1/2 left-1/2 p-6 h-auto bg-white rounded-2xl -translate-x-1/2 -translate-y-1/2"
              style={
                typeof modalDataState.content === 'string'
                  ? { maxWidth: '464px', width: 'calc(100vw - 40px)' }
                  : {}
              }
              onClick={(e) => e.stopPropagation()}
            >
              {typeof modalDataState.content === 'string' ? (
                <p className="py-4 text-lg w-full">{modalDataState.content}</p>
              ) : (
                modalDataState.content
              )}
              <div className="flex items-center justify-end gap-2">
                {modalDataState.btnTitle && (
                  <button
                    className="btn bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 text-white"
                    onClick={handleBtnOnClick}
                  >
                    {modalDataState.btnTitle}
                  </button>
                )}
                <button className="btn" onClick={closeModal}>
                  {modalDataState.btnTitle ? '취소' : '닫기'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
