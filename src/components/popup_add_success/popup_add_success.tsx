import { Link, useNavigate } from 'react-router-dom';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { changeIsBasketSuccess, changeStatusPopup } from '../../store/camera-data/camera-data';
import { getStatusPopup } from '../../store/camera-data/selectors';

function PopupAddSuccess () {
  const dispatch = useAppDisptach();
  const navigate = useNavigate();
  const isActivePopupBasket = useAppSelector(getStatusPopup);

  const handleButtonNavigateBasketClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(changeStatusPopup(false));
    dispatch(changeIsBasketSuccess(false));
    navigate('/basket');
  };

  const handleButtonClosePopupClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(changeStatusPopup(false));
    dispatch(changeIsBasketSuccess(false));
  };

  const handleLinkChangeStatusPopupClick = () => {
    dispatch(changeStatusPopup(false));
    dispatch(changeIsBasketSuccess(false));
  };
  return(

    <div className={isActivePopupBasket ? 'modal is-active modal--narrow' : ''}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
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


  );
}

export default PopupAddSuccess;
