import { ChangeEvent, useState, useEffect } from 'react';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { setDiscount } from '../../store/camera-data/camera-data';
import { getDiscount, getIsDiscount, getSummaryPrice } from '../../store/camera-data/selectors';

function BasketSummary () {
  const dispatch = useAppDisptach();
  const summaryPrice = useAppSelector(getSummaryPrice);
  const discount = useAppSelector(getDiscount);
  const IsDiscount = useAppSelector(getIsDiscount);
  const [promo, setPromo] = useState('');
  const [styleError, setStyleError] = useState({
    opacity: 0,
  });
  const [click, setClick] = useState(false);
  const [borderPromo, setBorderPromo] = useState({
    border: '2px solid #b4b4d7',
  });

  useEffect(() => {
    if (discount !== 1 && click) {
      setStyleError({
        opacity: 0,
      });
      setBorderPromo({
        border: '2px solid #65cd54',
      });
    } else if (discount === 1 && click) {
      setStyleError({
        opacity: 1,
      });
      setBorderPromo({
        border: '2px solid #ed6041',
      });
    }
    setClick(false);
  }, [click]);


  const handlerChangePromoInput = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setPromo(evt.currentTarget.value);
  };

  const handlerSubmitDiscountButton = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setDiscount(promo));
    setClick(true);
  };

  return(
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form action="#">
            <div className="custom-input">
              <label><span className="custom-input__label">Промокод</span>
                <input style={borderPromo} onChange={handlerChangePromoInput} type="text" name="promo" placeholder="Введите промокод"></input>
              </label>
              <p style={styleError} className="custom-input__error">Промокод неверный</p>
              <p style={{opacity: IsDiscount ? 1 : 0}} className="custom-input__success">Промокод принят!</p>
            </div>
            <button onClick={handlerSubmitDiscountButton} className="btn" type="submit">Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{summaryPrice ? summaryPrice : '0'} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className={IsDiscount ? 'basket__summary-value basket__summary-value--bonus' : 'basket__summary-value'}>{IsDiscount ? Math.ceil(summaryPrice * (1 - discount)) : '0'} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{summaryPrice ? summaryPrice * discount : '0'} ₽</span></p>
        <button className="btn btn--purple" type="submit">Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default BasketSummary;

