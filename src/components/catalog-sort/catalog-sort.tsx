import React, { ChangeEvent, useRef, useState } from 'react';
// import { useAppDisptach, useAppSelector } from '../../hooks';
// import { setSortType } from '../../store/camera-data/camera-data';
// import { getSortType } from '../../store/camera-data/selectors';
// import { useAppDisptach, useAppSelector } from '../../hooks';
// import { setSortType } from '../../store/camera-data/camera-data';
// import { getSortType } from '../../store/camera-data/selectors';

function CatalogSort () {
  // const dispatch = useAppDisptach();
  // const sortType = useAppSelector(getSortType);
  const inputSortPrice = useRef<HTMLInputElement>(null);
  const inputSortPopular = useRef<HTMLInputElement>(null);

  const [selectedType, setSelectedType] = useState('sortPrice');

  // useEffect(() => {
  //   dispatch(setSortType(selectedType));
  // }, [selectedType]);

  const handlerInputCheckedChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // evt.preventDefault();
    if (evt.currentTarget.checked) {
      // console.log(evt.currentTarget.id);
    }
    setSelectedType(evt.currentTarget.id);
  };

  // const click = (evt: React.ChangeEvent<HTMLInputElement>) => {
  //   // evt.preventDefault();
  //   if (inputSortPopular && inputSortPopular.current) {
  //     inputSortPopular.current.checked = true;
  //     setSelectedType(inputSortPopular.current.id);
  //   }
  // };
  // const click1 = (evt: React.ChangeEvent<HTMLInputElement>) => {
  //   // evt.preventDefault();
  //   if (inputSortPrice && inputSortPrice.current) {
  //     inputSortPrice.current.checked = true;
  //     setSelectedType(inputSortPrice.current.id);
  //   }
  // };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input ref={inputSortPrice} type="radio" id="sortPrice" name="sort" onChange={handlerInputCheckedChange} checked={selectedType === 'sortPrice'}></input>
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input ref={inputSortPopular} type="radio" id="sortPopular" name="sort" onChange={handlerInputCheckedChange} checked={selectedType === 'sortPopular'}></input>
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию"></input>
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input type="radio" id="down" name="sort-icon" aria-label="По убыванию"></input>
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
