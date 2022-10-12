import Breadcrump from '../breadcrump/breadcrump';
import CatalogAside from '../catalog-aside/catalog-aside';
import CatalogContent from '../catalog-content/catalog-content';

function Catalog() {
  return (
    <div className="page-content">
      <Breadcrump />
      <section className='catalog'>
        <div className="container">
          <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
          <div className="page-content__columns">
            <CatalogAside />
            <CatalogContent />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Catalog;
