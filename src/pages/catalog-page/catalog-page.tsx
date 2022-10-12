import Banner from '../../components/banner/banner';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

function CatalogPage () {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <Catalog />
      </main>
      <Footer />
    </>
  );
}

export default CatalogPage;
