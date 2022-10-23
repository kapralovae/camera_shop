import Banner from '../../components/banner/banner';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import PopupAddInBasket from '../../components/popup_add_in_basket/popup_add_in_basket';
import PopupAddSuccess from '../../components/popup_add_success/popup_add_success';
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
