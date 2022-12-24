import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { postCoupon, postOrder } from '../../store/api-actions';
import { setBorderInput, setDiscount, setOpacityAccept, setOpacityError} from '../../store/camera-data/camera-data';
import { getBorderInput, getDiscount, getIsDiscount, getOpacityAccept, getOpacityError, getOrderPost, getSummaryPrice } from '../../store/camera-data/selectors';
import { getIsDataLoad } from '../../store/camera-process/selecrots';
import SpinerLoading from '../spinner-loading/spinner-loading';

function BasketSummary () {
  const dispatch = useAppDisptach();
  const navigate = useNavigate();
  const summaryPrice = useAppSelector(getSummaryPrice);
  const discount = useAppSelector(getDiscount);
  const isDiscount = useAppSelector(getIsDiscount);
  const [promo, setPromo] = useState('');
  const isDataLoaded = useAppSelector(getIsDataLoad);
  const borderPromo = useAppSelector(getBorderInput);
  const styleError = useAppSelector(getOpacityError);
  const styleAccept = useAppSelector(getOpacityAccept);
  const orderPost = useAppSelector(getOrderPost);

  useEffect(() => {
    dispatch(setBorderInput('2px solid #b4b4d7'));
    dispatch(setOpacityAccept(0));
    dispatch(setOpacityError(0));
    dispatch(setDiscount({
      discound: 1,
      promocode: null,
    }));
  }, []);

  const handlerChangePromoInput = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setPromo(evt.currentTarget.value);
  };

  const handlerSubmitDiscountButton = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(postCoupon({
      coupon: promo,
    }));
  };

  const handlerSubmitOrderButton = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (orderPost.camerasIds.length > 0) {
      dispatch(postOrder(orderPost));
      document.body.style.overflow = 'hidden';
    } else {
      navigate('/*');
    }
  };


  return(
    <div className="basket__summary">
      {isDataLoaded ? <SpinerLoading /> : null}
      <div className="basket__promo">
        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form action="#">
            <div className="custom-input">
              <label><span className="custom-input__label">Промокод</span>
                <input style={borderPromo} onChange={handlerChangePromoInput} type="text" name="promo" placeholder="Введите промокод"></input>
              </label>
              <p style={styleError} className="custom-input__error">Промокод неверный</p>
              <p style={styleAccept} className="custom-input__success">Промокод принят!</p>
            </div>
            <button onClick={handlerSubmitDiscountButton} className="btn" type="submit">Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{summaryPrice ? summaryPrice : '0'} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className={isDiscount ? 'basket__summary-value basket__summary-value--bonus' : 'basket__summary-value'}>{isDiscount ? Math.ceil(summaryPrice * (1 - discount)) : '0'} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{summaryPrice && isDiscount ? summaryPrice - Math.ceil(summaryPrice * (1 - discount)) : summaryPrice} ₽</span></p>
        <button onClick={handlerSubmitOrderButton} className="btn btn--purple" type="submit">Оформить заказ
        </button>
      </div>
    </div>

  );
}

export default BasketSummary;

