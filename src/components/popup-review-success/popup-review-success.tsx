import FocusTrap from 'focus-trap-react';
import { useEffect } from 'react';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { setIsAddReview } from '../../store/camera-data/camera-data';
import { getIsActivePopupReview, getIsAddReview } from '../../store/camera-data/selectors';

export default function PopupReviewSuccess() {

  const dispatch = useAppDisptach();
  const IsActivePopupReview = useAppSelector(getIsActivePopupReview);
  const isAddReview = useAppSelector(getIsAddReview);

  const handleButtonClosePopupClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setIsAddReview(false));
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const onKeyDownEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        dispatch(setIsAddReview(false));
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('keydown', onKeyDownEsc);
    return () => window.removeEventListener('keydown', onKeyDownEsc);
  },[dispatch, IsActivePopupReview]);

  const handleOverlayClosePopupClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();
    dispatch(setIsAddReview(false));
    document.body.style.overflow = '';
  };

  return(
    <FocusTrap>
      <div className={isAddReview ? 'modal is-active modal--narrow' : 'modal'}>
        <div className="modal__wrapper">
          <div onClick={handleOverlayClosePopupClick} className="modal__overlay"></div>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за отзыв</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <button onClick={handleButtonClosePopupClick} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">Вернуться к покупкам
              </button>
            </div>
            <button onClick={handleButtonClosePopupClick} className="cross-btn" type="button" aria-label="Закрыть попап">
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}
