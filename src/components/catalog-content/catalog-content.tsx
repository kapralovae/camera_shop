import { useEffect } from 'react';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { setCamerasForRender } from '../../store/camera-data/camera-data';
import { getCamerasCatalog } from '../../store/camera-data/selectors';
import { getCameras } from '../../store/camera-process/selecrots';
import Card from '../card/card';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/pagination';

function CatalogContent () {
  const dispatch = useAppDisptach();
  const allCards = useAppSelector(getCameras);
  const cardsCatalog = useAppSelector(getCamerasCatalog);

  useEffect(() => {
    dispatch(setCamerasForRender(allCards));
  }, [allCards]);

  return (
    <div className="catalog__content" data-testid="testid">
      <CatalogSort />
      <div className="cards catalog__cards">
        {cardsCatalog.length > 0 ? cardsCatalog.map((camera) => <Card item={camera} isActive={false} key={camera.id}></Card>) : <h2>Такого товара нет</h2>}
      </div>
      {cardsCatalog.length > 0 ? <Pagination /> : null }
    </div>
  );
}

export default CatalogContent;
