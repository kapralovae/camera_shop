import Header from '../../components/header/header';
import Breadcrump from '../../components/breadcrump/breadcrump';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { CountStarsSvg, COUNT_SHOW_COMMENTS } from '../../const';
import { getCamera, getComments, getSimilarCameras } from '../../store/camera-process/selecrots';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchCameraAction, fetchCommentsCameraAction, fetchSimilarCamerasAction } from '../../store/api-actions';
import Card from '../../components/card/card';
import CommentCard from '../../components/comment/comments';
import Footer from '../../components/footer/footer';
import PopupAddInBasket from '../../components/popup-add-in-basket/popup-add-in-basket';
import { getCardsInBasket, getIsActivePopupReview, getIsAddReview, getIsBasketSuccess } from '../../store/camera-data/selectors';
import PopupAddSuccess from '../../components/popup-add-success/popup-add-success';
import { changeCardPopup, changeStatusPopup, setIsActivePopupReview } from '../../store/camera-data/camera-data';
import PopupReviewSuccess from '../../components/popup-review-success/popup-review-success';
import PopupAddReview from '../../components/popup-add-review/popup-add-review';

function CardPage () {
  const dispatch = useAppDisptach();
  const {id} = useParams();
  const isAddSuccess = useAppSelector(getIsBasketSuccess);
  const isAddReview = useAppSelector(getIsAddReview);
  const IsActivePopupReview = useAppSelector(getIsActivePopupReview);

  const [activeTabs, setActiveTabs] = useState('description');
  const [startSlice, setStartSlice] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchCameraAction(`${id}`));
      dispatch(fetchSimilarCamerasAction(`${id}`));
      dispatch(fetchCommentsCameraAction(`${id}`));
    }
  }, [dispatch, id]);

  const card = useAppSelector(getCamera);
  const similarCameras = useAppSelector(getSimilarCameras).slice(0, 4);
  const comments = useAppSelector(getComments);
  const cardsInBasket = useAppSelector(getCardsInBasket);

  const handleButtonBackSimilarClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setStartSlice(startSlice - 3);
  };

  const handleButtonNextSimilarClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setStartSlice(startSlice + 3);
  };

  const [countComment, setCountComment] = useState(COUNT_SHOW_COMMENTS);

  const handleMoreCommentsButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setCountComment(countComment + COUNT_SHOW_COMMENTS);
  };

  const handleButtonChangeStatusCardClick = (evt : React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(changeStatusPopup(true));
    dispatch(changeCardPopup(card));
    document.body.style.overflow = 'hidden';
  };

  const handleButtonChangeTabsClick = (evt : React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    switch(evt.currentTarget.textContent) {
      case 'Описание':
        setActiveTabs('description');
        break;
      case 'Характеристики':
        setActiveTabs('specifications');
        break;
    }
  };

  const isInBasket = () => {
    if (cardsInBasket.length > 0 && cardsInBasket.find((item) => item.id === card.id) !== undefined) {
      return true;
    }
    return false;
  };

  const handlerButtonAddReviewClick = (evt : React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setIsActivePopupReview(true));
    document.body.style.overflow = 'hidden';
  };

  const {category, description, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name, rating, reviewCount, price, vendorCode, type, level} = card;

  return(
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <Breadcrump />
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`}></source><img src={`/${previewImg}`} srcSet={`/${previewImg2x}`} width="560" height="480" alt={`${category} ${name}`}></img>
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{`${category} «${name}»`}</h1>
                  <div className="rate product__rate">
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
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>

                  {isInBasket() ?
                    <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to="/basket">
                      <svg width="16" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-basket"></use>
                      </svg>В корзине
                    </Link>
                    :
                    <button onClick={handleButtonChangeStatusCardClick} className="btn btn--purple" type="button">
                      <svg width="24" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-add-basket"></use>
                      </svg>Добавить в корзину
                    </button>}


                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button onClick={handleButtonChangeTabsClick} className={activeTabs === 'specifications' ? 'tabs__control is-active' : 'tabs__control'} type="button">Характеристики</button>
                      <button onClick={handleButtonChangeTabsClick} className={activeTabs === 'description' ? 'tabs__control is-active' : 'tabs__control'} type="button">Описание</button>
                    </div>
                    <div className="tabs__content">
                      <div className={activeTabs === 'specifications' ? 'tabs__element is-active' : 'tabs__element'}>
                        <ul className="product__tabs-list">
                          <li className="item-list"><span className="item-list__title">Артикул:</span>
                            <p className="item-list__text"> {vendorCode}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{category}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{type}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className={activeTabs === 'description' ? 'tabs__element is-active' : 'tabs__element'}>
                        <div className="product__tabs-text">
                          <p>{description}</p>
                          <p>Вы&nbsp;тоже можете прикоснуться к&nbsp;волшебству аналоговой съёмки, заказав этот чудо-аппарат. Кто знает, может с&nbsp;Das Auge IV&nbsp;начнётся ваш путь к&nbsp;наградам всех престижных кинофестивалей.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <section className="product-similar">
              <div className="container">
                <h2 className="title title--h3">Похожие товары</h2>
                <div className="product-similar__slider">
                  <div className="product-similar__slider-list">
                    {similarCameras.slice(startSlice, startSlice + 3).map((camera) =>
                      <Card item={camera} isActive key={camera.id}/>
                    )}
                  </div>
                  <button onClick={handleButtonBackSimilarClick} className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled={startSlice < 3}>
                    <svg width="7" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-arrow"></use>
                    </svg>
                  </button>
                  <button onClick={handleButtonNextSimilarClick} className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" disabled={startSlice + 3 >= similarCameras.length}>
                    <svg width="7" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-arrow"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  <button onClick={handlerButtonAddReviewClick} className="btn" type="button">Оставить свой отзыв</button>
                </div>
                <ul className="review-block__list">
                  {comments.slice(0, countComment).map((comment) => <CommentCard item={comment} key={comment.id}/>)}

                </ul>
                <div className="review-block__buttons">
                  <button onClick={handleMoreCommentsButtonClick} className={countComment >= comments.length ? 'btn btn--purple visually-hidden' : 'btn btn--purple'} type="button">Показать больше отзывов
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      {isAddSuccess ? <PopupAddSuccess /> : <PopupAddInBasket />}
      {IsActivePopupReview ? <PopupAddReview /> : null}
      {isAddReview ? <PopupReviewSuccess /> : null}
      <Footer />
    </div>
  );
}

export default CardPage;
