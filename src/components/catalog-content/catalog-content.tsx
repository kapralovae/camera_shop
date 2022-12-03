import { useEffect } from 'react';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { setSortCards } from '../../store/camera-data/camera-data';
import { getCamerasCatalog, getIsSort, getSortDirection, getSortType } from '../../store/camera-data/selectors';
import { getCameras } from '../../store/camera-process/selecrots';
import Card from '../card/card';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/pagination';

function CatalogContent () {
  const dispatch = useAppDisptach();
  const allCards = useAppSelector(getCameras);
  const cardsCatalog = useAppSelector(getCamerasCatalog);
  const isSort = useAppSelector(getIsSort);
  const sortType = useAppSelector(getSortType);
  const sortDirection = useAppSelector(getSortDirection);

  useEffect(() => {
    dispatch(setSortCards(allCards));
  }, [isSort, sortDirection, sortType]);

  return (
    <div className="catalog__content" data-testid="testid">
      <CatalogSort />
      <div className="cards catalog__cards">
        {cardsCatalog.map((camera) => <Card item={camera} isActive={false} key={camera.id}></Card>)}
      </div>
      <Pagination />
    </div>
  );
}

export default CatalogContent;
