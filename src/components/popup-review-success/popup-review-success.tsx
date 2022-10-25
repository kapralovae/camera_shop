import { useAppDisptach, useAppSelector } from '../../hooks';
import { setIsActivePopupReview, setIsAddReview } from '../../store/camera-data/camera-data';
import { getIsActivePopupReview } from '../../store/camera-data/selectors';

export default function PopupReviewSuccess() {

  const dispatch = useAppDisptach();
  const IsActivePopupReview = useAppSelector(getIsActivePopupReview);

  const handleButtonClosePopupClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setIsActivePopupReview(false));
    dispatch(setIsAddReview(false));
  };

  return(
    <div className={IsActivePopupReview ? 'modal is-active modal--narrow' : 'modal'}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
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
  );
}
