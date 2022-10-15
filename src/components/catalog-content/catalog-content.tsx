import { useAppSelector } from '../../hooks';
import { getCameres } from '../../store/camera-process/selecrots';
import Card from '../card/card';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/pagination';

function CatalogContent () {
  const cameres = useAppSelector(getCameres);
  return (
    <div className="catalog__content">
      <CatalogSort />
      <div className="cards catalog__cards">
        {cameres.map((camera) => <Card item={camera} key={camera.id}></Card>)}
      </div>
      <Pagination />
    </div>
  );
}

export default CatalogContent;
