import { useEffect } from 'react';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { setSummaryPrice } from '../../store/camera-data/camera-data';
import { getCamerasInBasket } from '../../store/camera-data/selectors';
import BasketSummary from '../basket-summary/basket-summary';
import ItemInBasket from '../item-in-basket/item-in-basket';

function Basket() {
  const dispatch = useAppDisptach();
  const camerasInBasket = useAppSelector(getCamerasInBasket);
  const camerasRender = [];
  let summaryPrice = 0;

  for (const key in camerasInBasket) {
    summaryPrice += camerasInBasket[key].camera.price * camerasInBasket[key].count;
    camerasRender.push(camerasInBasket[key]);
  }

  useEffect(() => {
    dispatch(setSummaryPrice(summaryPrice));
  }, [summaryPrice]);

  return (
    <section className="basket">
      <div className="container">
        <h1 className="title title--h2">Корзина</h1>
        <ul className="basket__list">
          {camerasRender.map((item) => <li className="basket-item" key={item.camera.id}><ItemInBasket item={item.camera} count={item.count}></ItemInBasket></li>)}
        </ul>
        <BasketSummary />
      </div>
    </section>
  );
}

export default Basket;

