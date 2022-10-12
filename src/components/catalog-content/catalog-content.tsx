import Card from '../card/card';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/pagination';

function CatalogContent () {
  return (
    <div className="catalog__content">
      <CatalogSort />
      <div className="cards catalog__cards">
        <Card />
        <Card />
        <Card />
      </div>
      <Pagination />
    </div>
  );
}

export default CatalogContent;
