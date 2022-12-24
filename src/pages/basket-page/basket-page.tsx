import Basket from '../../components/basket/basket';
import Breadcrump from '../../components/breadcrump/breadcrump';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import PopupProductBasketSuccess from '../../components/popup-add-in-basket/popup-product-basket-success/popup-product-basket-success';
import PopupDeleteCamera from '../../components/popup-delete-camera/popup-delete-camera';
import { useAppSelector } from '../../hooks';
import { getIsActivePopupDeleteCamera, getIsActivePopupSuccessBasket } from '../../store/camera-data/selectors';


function BasketPage () {
  const isActivePopupDeleteCamera = useAppSelector(getIsActivePopupDeleteCamera);
  const isActivePopupSuccessBasket = useAppSelector(getIsActivePopupSuccessBasket);
  return (
    <>
      <Header />
      <main>
        <div className="page-content">
          <Breadcrump />
          <Basket />
        </div>
        {isActivePopupDeleteCamera ? <PopupDeleteCamera /> : null}
        {isActivePopupSuccessBasket ? <PopupProductBasketSuccess /> : null}
      </main>
      <Footer />
    </>
  );
}

export default BasketPage;
