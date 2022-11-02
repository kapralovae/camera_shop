import { Link } from 'react-router-dom';
import { CountStarsSvg } from '../../const';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { changeCardPopup, changeStatusPopup } from '../../store/camera-data/camera-data';
import { getCardsInBasket } from '../../store/camera-data/selectors';
import { Camera } from '../../types/camera';

type CartType = {
  item: Camera;
  isActive: boolean;
};


function Card ({item, isActive = true}: CartType) {
  const dispatch = useAppDisptach();
  const {id, name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, rating, reviewCount, category} = item;

  const cardsInBasket = useAppSelector(getCardsInBasket);

  const handleButtonChangeStatusCardClick = (evt : React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(changeStatusPopup(true));
    dispatch(changeCardPopup(item));
    document.body.style.overflow = 'hidden';
  };

  const isInBasket = () => {
    if (cardsInBasket.length > 0 && cardsInBasket.find((card) => card.id === item.id) !== undefined) {
      return true;
    }
    return false;
  };

  return (
    <div className={isActive ? 'product-card is-active' : 'product-card'}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`}></source><img src={`/${previewImg}`} srcSet={`/${previewImg2x}`} width="280" height="240" alt={`${category} «${name}»`}></img>
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
        {isInBasket() ?
          <>
            <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to="/basket">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-basket"></use>
              </svg>В корзине
            </Link>
            <Link className="btn btn--transparent" to={`/catalog/camera/${id}`}>Подробнее</Link>
          </>
          :
          <>
            <button onClick={handleButtonChangeStatusCardClick} className="btn btn--purple product-card__btn" type="button">Купить
            </button><Link className="btn btn--transparent" to={`/catalog/camera/${id}`}>Подробнее</Link>
          </>}
      </div>
    </div>
  );
}

export default Card;
