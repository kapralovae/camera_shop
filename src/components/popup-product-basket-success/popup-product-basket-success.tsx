import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { setIsActivePopupSuccessBasket } from '../../store/camera-data/camera-data';
import { getIsActivePopupSuccessBasket } from '../../store/camera-data/selectors';

function PopupProductBasketSuccess () {
  const dispatch = useAppDisptach();
  const navigate = useNavigate();
  const isActivePopupSuccessBasket = useAppSelector(getIsActivePopupSuccessBasket);

  const handleButtonNavigateCatalogClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setIsActivePopupSuccessBasket(false));
    document.body.style.overflow = '';
    navigate('/');
  };

  const handleButtonClosePopupClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setIsActivePopupSuccessBasket(false));
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const onKeyDownEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        dispatch(setIsActivePopupSuccessBasket(false));
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('keydown', onKeyDownEsc);
    return () => window.removeEventListener('keydown', onKeyDownEsc);
  },[dispatch, isActivePopupSuccessBasket]);

  const handleOverlayClosePopupClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();
    dispatch(setIsActivePopupSuccessBasket(false));
    document.body.style.overflow = '';
  };

  return(
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div onClick={handleOverlayClosePopupClick} className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button onClick={handleButtonNavigateCatalogClick} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">Вернуться к покупкам
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

export default PopupProductBasketSuccess;
