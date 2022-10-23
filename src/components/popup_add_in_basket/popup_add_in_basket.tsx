import React from 'react';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { getCardPopup, getStatusPopup } from '../../store/camera-data/selectors';
import { addCardInBasket, changeIsBasketSuccess, changeStatusPopup } from '../../store/camera-data/camera-data';

function PopupAddInBasket () {
  const dispatch = useAppDisptach();

  const isActivePopup = useAppSelector(getStatusPopup);
  const cardPopup = useAppSelector(getCardPopup);

  const {name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, category, vendorCode, level, type} = cardPopup;
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

  const handleButtonClosePopupClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(changeStatusPopup(false));
  };
  // console.log(cardPopup);
  const handleButtonAddInBasketClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(addCardInBasket(cardPopup));
    dispatch(changeIsBasketSuccess(true));
  };

  return(
    <div className={isActivePopup ? 'modal is-active' : 'modal'}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`}></source><img src={`/${previewImg}`} srcSet={`/${previewImg2x}`} width="140" height="120" alt="Фотоаппарат «Орлёнок»"></img>
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{`${category} `} «{`${name}`}»</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{device}</li>
                <li className="basket-item__list-item">{`${level}`} уровень</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
            </div>
          </div>
          <div className="modal__buttons">
            <button onClick={handleButtonAddInBasketClick} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
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

export default PopupAddInBasket;
