import Banner from '../../components/banner/banner';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import PopupAddInBasket from '../../components/popup_add_in_basket/popup_add_in_basket';

function CatalogPage () {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <Catalog />
        <PopupAddInBasket />
      </main>
      <Footer />
    </>
  );
}

export default CatalogPage;
