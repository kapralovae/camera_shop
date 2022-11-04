import Banner from '../../components/banner/banner';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import PopupAddInBasket from '../../components/popup-add-in-basket/popup-add-in-basket';
import PopupAddSuccess from '../../components/popup-add-success/popup-add-success';
import { useAppSelector } from '../../hooks';
import { getIsBasketSuccess } from '../../store/camera-data/selectors';

function CatalogPage () {
  const isAddSuccess = useAppSelector(getIsBasketSuccess);

  return (
    <>
      <Header />
      <main>
        <Banner />
        <Catalog />
        {isAddSuccess ? <PopupAddSuccess /> : <PopupAddInBasket />}
      </main>
      <Footer />
    </>
  );
}

export default CatalogPage;
