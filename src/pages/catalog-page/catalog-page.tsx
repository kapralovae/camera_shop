import { useEffect } from 'react';
import Banner from '../../components/banner/banner';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import PopupAddInBasket from '../../components/popup-add-in-basket/popup-add-in-basket';
import PopupAddSuccess from '../../components/popup-add-success/popup-add-success';
import { useAppSelector } from '../../hooks';
import { getIsBasketSuccess, getStatusPopup } from '../../store/camera-data/selectors';

function CatalogPage () {
  const isAddSuccess = useAppSelector(getIsBasketSuccess);
  const isActivePopupBasket = useAppSelector(getStatusPopup);

  return (
    <>
      <Header />
      <main>
        <Banner />
        <Catalog />
        {isAddSuccess ? <PopupAddSuccess /> : null}
        {isActivePopupBasket ? <PopupAddInBasket /> : null}
      </main>
      <Footer />
    </>
  );
}

export default CatalogPage;
