import { useAppSelector } from '../../hooks';
import { getCamerasCatalog} from '../../store/camera-data/selectors';
import Card from '../card/card';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/pagination';

function CatalogContent () {
  const cardsCatalog = useAppSelector(getCamerasCatalog);

  return (
    <div className="catalog__content">
      <CatalogSort />
      <div className="cards catalog__cards">
        {cardsCatalog.map((camera) => <Card item={camera} isActive={false} key={camera.id}></Card>)}
      </div>
      <Pagination />
    </div>
  );
}

export default CatalogContent;
