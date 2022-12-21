import FocusTrap from 'focus-trap-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { deleteCameraInBasket, setIsActivePopupDeleteCamera } from '../../store/camera-data/camera-data';
import { getCardPopup, getIsActivePopupDeleteCamera } from '../../store/camera-data/selectors';

function PopupDeleteCamera () {
  const dispatch = useAppDisptach();
  const cardPopup = useAppSelector(getCardPopup);
  const isActivePopupDeleteCamera = useAppSelector(getIsActivePopupDeleteCamera);

  const {name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, category, vendorCode, level, type} = cardPopup;

  const handleLinkChangeStatusPopupClick = () => {
    dispatch(setIsActivePopupDeleteCamera(false));
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const onKeyDownEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        dispatch(setIsActivePopupDeleteCamera(false));
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('keydown', onKeyDownEsc);
    return () => window.removeEventListener('keydown', onKeyDownEsc);
  },[dispatch, isActivePopupDeleteCamera]);

  const handleOverlayClosePopupClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();
    dispatch(setIsActivePopupDeleteCamera(false));
    document.body.style.overflow = '';
  };

  const handleButtonClosePopupClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setIsActivePopupDeleteCamera(false));
    document.body.style.overflow = '';
  };

  const handleDeleteItemButton = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(deleteCameraInBasket(cardPopup));
    dispatch(setIsActivePopupDeleteCamera(false));
    document.body.style.overflow = '';
  };

  let device = '';

  switch(type) {
    case 'Плёночная':
      device = 'Плёночная фотокамера';
      break;
    case 'Моментальная':
      device = 'Моментальная фотокамера';
      break;
    case 'Цифровая':
      device = category === 'Видеокамера' ? 'Цифровая видеокамера' : 'Цифровая фотокамера';
      break;
    case 'Коллекционная':
      device = category === 'Видеокамера' ? 'Коллекционная видеокамера' : 'Коллекционная фотокамера';
      break;

    default: device = '';
  }

  return(
    <FocusTrap>
      <div className={isActivePopupDeleteCamera ? 'modal is-active scroll-lock no-scrollbar' : 'modal'}>
        <div className="modal__wrapper">
          <div onClick={handleOverlayClosePopupClick} className="modal__overlay"></div>
          <div className="modal__content">
            <p className="title title--h4">Удалить этот товар?</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`}></source><img src={`/${previewImg}`} srcSet={`/${previewImg2x}`} width="140" height="120" alt={name}></img>
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{device}</li>
                  <li className="basket-item__list-item">{`${level}`} уровень</li>
                </ul>
              </div>
            </div>
            <div className="modal__buttons">
              <button onClick={handleDeleteItemButton} className="btn btn--purple modal__btn modal__btn--half-width" type="button">Удалить
              </button>
              <Link onClick={handleLinkChangeStatusPopupClick} className="btn btn--transparent modal__btn modal__btn--half-width" to="/">Продолжить покупки
              </Link>
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

export default PopupDeleteCamera;
