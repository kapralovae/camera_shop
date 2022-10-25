import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { addComment } from '../../store/api-actions';
import { setIsActivePopupReview, setIsAddReview } from '../../store/camera-data/camera-data';
import { getIsActivePopupReview } from '../../store/camera-data/selectors';

export default function PopupAddReview () {

  const dispatch = useAppDisptach();
  const IsActivePopupReview = useAppSelector(getIsActivePopupReview);

  const handleButtonClosePopupClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setIsActivePopupReview(false));
  };

  const id = useParams().id;

  const [data, setData] = useState({
    cameraId: Number(id),
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: 0,
  });

  const hanldeInputRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      rating: Number(evt.target.value),
    });
  };

  const hanldeTextareaReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setData({
      ...data,
      review: evt.target.value,
    });
  };

  const handleInputTextDataChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = evt.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const postForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(addComment(data));
    setData({
      cameraId: Number(id),
      userName: '',
      advantage: '',
      disadvantage: '',
      review: '',
      rating: 0,
    });
    dispatch(setIsAddReview(true));
  };


  return(
    <div className={IsActivePopupReview ? 'modal is-active' : 'modal'}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form onSubmit={postForm} method="post">
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      <input onChange={hanldeInputRatingChange} className="visually-hidden" id="star-5" name="rate" type="radio" value="5" />
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input onChange={hanldeInputRatingChange} className="visually-hidden" id="star-4" name="rate" type="radio" value="4" />
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input onChange={hanldeInputRatingChange} className="visually-hidden" id="star-3" name="rate" type="radio" value="3" />
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input onChange={hanldeInputRatingChange} className="visually-hidden" id="star-2" name="rate" type="radio" value="2" />
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input onChange={hanldeInputRatingChange} className="visually-hidden" id="star-1" name="rate" type="radio" value="1" />
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    </div>
                    <div className="rate__progress"><span className="rate__stars">{data.rating}</span> <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input onChange={handleInputTextDataChange} type="text" name="userName" placeholder="Введите ваше имя" required />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input onChange={handleInputTextDataChange} type="text" name="advantage" placeholder="Основные преимущества товара" required />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input onChange={handleInputTextDataChange} type="text" name="disadvantage" placeholder="Главные недостатки товара" required />
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea onChange={hanldeTextareaReviewChange} name="user-comment" minLength={5} placeholder="Поделитесь своим опытом покупки"></textarea>
                  </label>
                  <div className="custom-textarea__error">Нужно добавить комментарий</div>
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
            </form>
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
