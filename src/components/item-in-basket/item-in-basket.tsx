import React, { ChangeEvent, useEffect, useState } from 'react';
import { MAX_COUNT_PRODUCT, MIN_COUNT_PRODUCT } from '../../const';
import { useAppDisptach } from '../../hooks';
import { changeCardPopup, setCountCamerasInBasket, setIsActivePopupDeleteCamera } from '../../store/camera-data/camera-data';
import { Camera } from '../../types/camera';

type CartType = {
  item: Camera;
  count: number;
};

function ItemInBasket({item, count}: CartType) {
  const dispatch = useAppDisptach();
  const [countItem, setCountItem] = useState(count);

  const {name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, vendorCode, type, level, id} = item;

  useEffect(() => {
    if (countItem < MIN_COUNT_PRODUCT) {
      dispatch(setCountCamerasInBasket({
        id: id,
        countItem: 0,
        priceItem: price,
      }));
      setCountItem(0);
    } else if (countItem > MAX_COUNT_PRODUCT) {
      dispatch(setCountCamerasInBasket({
        id: id,
        countItem: MAX_COUNT_PRODUCT,
        priceItem: price,
      }));

      setCountItem(MAX_COUNT_PRODUCT);
    } else {
      dispatch(setCountCamerasInBasket({
        id: id,
        countItem: countItem,
        priceItem: price,
      }));
    }

  }, [countItem]);


  const handlerDecreaseQuantityButton = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setCountItem(countItem - 1);
  };

  const handlerIncreaseQuantityButton = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setCountItem(countItem + 1);
  };

  const handlerDeleteItemButton = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(changeCardPopup(item));
    dispatch(setIsActivePopupDeleteCamera(true));
    document.body.style.overflow = 'hidden';
  };

  const handlerChangeCountInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setCountItem(Number(evt.currentTarget.value));
  };

  return (
    <>
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
          <li className="basket-item__list-item">{type}</li>
          <li className="basket-item__list-item">{level}</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
      <div className="quantity">
        <button onClick={handlerDecreaseQuantityButton} className="btn-icon btn-icon--prev" disabled={countItem === 1} aria-label="уменьшить количество товара">
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input onChange={handlerChangeCountInput} type="number" id="counter1" value={countItem ? countItem : ''} min="1" max="99" aria-label="количество товара"></input>
        <button onClick={handlerIncreaseQuantityButton} className="btn-icon btn-icon--next" disabled={countItem === 99} aria-label="увеличить количество товара">
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{count ? count * price : price} ₽</div>
      <button onClick={handlerDeleteItemButton} className="cross-btn" type="button" aria-label="Удалить товар">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </>
  );
}

export default ItemInBasket;
