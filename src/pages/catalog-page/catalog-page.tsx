import Banner from '../../components/banner/banner';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import PopupAddInBasket from '../../components/popup-add-in-basket/popup-add-in-basket';
import PopupAddSuccess from '../../components/popup-add-success/popup-add-success';
import SpinerLoading from '../../components/spinner-loading/spinner-loading';
import { useAppSelector } from '../../hooks';
import { getIsBasketSuccess, getStatusPopup } from '../../store/camera-data/selectors';
import { getIsDataLoad } from '../../store/camera-process/selecrots';

function CatalogPage () {
  const isAddSuccess = useAppSelector(getIsBasketSuccess);
  const isActivePopupBasket = useAppSelector(getStatusPopup);
  const isDataLoaded = useAppSelector(getIsDataLoad);

  return (
    <>
      <Header />
      <main>
        <Banner />
        <Catalog />
        {isDataLoaded ? <SpinerLoading /> : null}
        {isAddSuccess ? <PopupAddSuccess /> : null}
        {isActivePopupBasket ? <PopupAddInBasket /> : null}
      </main>
      <Footer />
    </>
  );
}

export default CatalogPage;
