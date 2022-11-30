import React, { useEffect, useState } from 'react';
import { useAppDisptach } from '../../hooks';
import { setIsSort, setSortDirection, setSortType } from '../../store/camera-data/camera-data';

function CatalogSort () {
  const dispatch = useAppDisptach();

  const [selectedType, setSelectedType] = useState('sortPrice');
  const [selectedDirection , setSelectedDirection] = useState('up');

  useEffect(() => {
    dispatch(setSortType(selectedType));
    dispatch(setSortDirection(selectedDirection));
  }, [selectedType, selectedDirection]);


  const handlerInputChangeTypeSort = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsSort(true));
    setSelectedType(evt.target.id);
    evt.target.style.display = 'none';
  };

  const handlerInputChangeDirectionSort = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsSort(true));
    setSelectedDirection(evt.target.id);
    evt.target.style.display = 'none';
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input onChange={handlerInputChangeTypeSort} type="radio" id="sortPrice" name="sort" checked={selectedType === 'sortPrice'}></input>
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input onChange={handlerInputChangeTypeSort} type="radio" id="sortPopular" name="sort" checked={selectedType === 'sortPopular'}></input>
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input onChange={handlerInputChangeDirectionSort} type="radio" id="up" name="sort-icon" aria-label="По возрастанию" checked={selectedDirection === 'up'}></input>
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input onChange={handlerInputChangeDirectionSort} type="radio" id="down" name="sort-icon" aria-label="По убыванию" checked={selectedDirection === 'down'}></input>
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CatalogSort;
