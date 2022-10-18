import { useAppSelector } from '../../hooks';
import { getCameresCatalog} from '../../store/camera-data/selectors';
import Card from '../card/card';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/pagination';

function CatalogContent () {
  const cardsCatalog = useAppSelector(getCameresCatalog);

  return (
    <div className="catalog__content">
      <CatalogSort />
      <div className="cards catalog__cards">
        {cardsCatalog.map((camera) => <Card item={camera} key={camera.id}></Card>)}
      </div>
      <Pagination />
    </div>
  );
}

export default CatalogContent;
