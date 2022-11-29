import { useAppDisptach, useAppSelector } from '../../hooks';
import { sortCards } from '../../store/camera-data/camera-data';
import { getCamerasCatalog, getIsSort, getSortCards, getSortDirection, getSortType } from '../../store/camera-data/selectors';
import Card from '../card/card';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/pagination';

function CatalogContent () {
  const dispatch = useAppDisptach();
  const cardsCatalog = useAppSelector(getCamerasCatalog);
  const isSort = useAppSelector(getIsSort);
  const sortType = useAppSelector(getSortType);
  const sortDirection = useAppSelector(getSortDirection);
  const go = useAppSelector(getSortCards);

  if (isSort) {
    switch (sortType) {
      case 'sortPrice':
        if (sortDirection === 'up') {
          cardsCatalog.sort((a, b) => b.price - a.price);
        }
        if (sortDirection === 'down') {
          cardsCatalog.sort((a, b) => b.price - a.price);
        }
        break;
    }
    dispatch(sortCards(cardsCatalog));
  }

  console.log(go);


  return (
    <div className="catalog__content" data-testid="testid">
      <CatalogSort />
      <div className="cards catalog__cards">
        {isSort ? go.map((camera) => <Card item={camera} isActive={false} key={camera.id}></Card>) : cardsCatalog.map((camera) => <Card item={camera} isActive={false} key={camera.id}></Card>)}
      </div>
      <Pagination />
    </div>
  );
}

export default CatalogContent;
