import FocusTrap from 'focus-trap-react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { changeIsBasketSuccess, changeStatusPopup } from '../../store/camera-data/camera-data';
import { getIsBasketSuccess } from '../../store/camera-data/selectors';

function PopupAddSuccess () {
  const dispatch = useAppDisptach();
  const navigate = useNavigate();
  const isActivePopupBasket = useAppSelector(getIsBasketSuccess);

  const handleButtonNavigateBasketClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(changeStatusPopup(false));
    dispatch(changeIsBasketSuccess(false));
    document.body.style.overflow = '';
    navigate('/basket');
  };

  const handleButtonClosePopupClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(changeStatusPopup(false));
    dispatch(changeIsBasketSuccess(false));
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const onKeyDownEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        dispatch(changeStatusPopup(false));
        dispatch(changeIsBasketSuccess(false));
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('keydown', onKeyDownEsc);
    return () => window.removeEventListener('keydown', onKeyDownEsc);
  },[dispatch, isActivePopupBasket]);

  const handleLinkChangeStatusPopupClick = () => {
    dispatch(changeStatusPopup(false));
    dispatch(changeIsBasketSuccess(false));
    document.body.style.overflow = '';
  };
  const handleOverlayClosePopupClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();
    dispatch(changeStatusPopup(false));
    dispatch(changeIsBasketSuccess(false));
    document.body.style.overflow = '';
  };
  return(
    <FocusTrap active={isActivePopupBasket}>
      <div className={isActivePopupBasket ? 'modal is-active modal--narrow' : 'modal'}>
        <div className="modal__wrapper">
          <div onClick={handleOverlayClosePopupClick} className="modal__overlay"></div>
          <div className="modal__content">
            <p className="title title--h4">Товар успешно добавлен в корзину</p>
            <svg className="modal__icon" width="86" height="80" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <div className="modal__buttons"><Link onClick={handleLinkChangeStatusPopupClick} className="btn btn--transparent modal__btn" to="/">Продолжить покупки</Link>
              <button onClick={handleButtonNavigateBasketClick} className="btn btn--purple modal__btn modal__btn--fit-width">Перейти в корзину</button>
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

export default PopupAddSuccess;
