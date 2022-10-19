// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import PopupAddInBasket from '../../components/popup_add_in_basket/popup_add_in_basket';
// import { useAppDisptach } from '../../hooks';
// import { setCatalogPage } from '../../store/camera-data/camera-data';

function CatalogPage () {
  // const dispatch = useAppDisptach();
  // const {id} = useParams();

  // useEffect(() => {
  //   if (id) {
  //     dispatch(setCatalogPage(Number(id)));
  //   }
  // }, [dispatch, id]);
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
