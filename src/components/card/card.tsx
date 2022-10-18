import { Link } from 'react-router-dom';
import { CountStarsSvg } from '../../const';
import { useAppDisptach } from '../../hooks';
import { changeCardPopup, changeStatusPopup } from '../../store/camera-data/camera-data';
import { Camera } from '../../types/camera';

type CartType = {
  item: Camera;
};

function Card ({item}: CartType) {
  const dispatch = useAppDisptach();
  const {name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, rating, reviewCount, category} = item;

  const handleButtonChangeStatusCardClick = (evt : React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(changeStatusPopup(true));
    dispatch(changeCardPopup(item));
  };
  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x}`}></source><img src={previewImg} srcSet={previewImg2x} width="280" height="240" alt={`${category} «${name}»`}></img>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating >= CountStarsSvg.One ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating >= CountStarsSvg.Two ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating >= CountStarsSvg.Three ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating >= CountStarsSvg.Four ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating >= CountStarsSvg.Five ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{category} «{name}»</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button onClick={handleButtonChangeStatusCardClick} className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to="#">Подробнее</Link>
      </div>
    </div>
  );
}

export default Card;
