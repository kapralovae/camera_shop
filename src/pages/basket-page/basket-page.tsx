import Basket from '../../components/basket/basket';
import Breadcrump from '../../components/breadcrump/breadcrump';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import PopupDeleteCamera from '../../components/popup-delete-camera/popup-delete-camera';
import { useAppSelector } from '../../hooks';
import { getIsActivePopupDeleteCamera } from '../../store/camera-data/selectors';


function BasketPage () {
  const isActivePopupDeleteCamera = useAppSelector(getIsActivePopupDeleteCamera);
  return (
    <>
      <Header />
      <main>
        <div className="page-content">
          <Breadcrump />
          <Basket />
        </div>
        {isActivePopupDeleteCamera ? <PopupDeleteCamera /> : null}
      </main>
      <Footer />
    </>
  );
}

export default BasketPage;
