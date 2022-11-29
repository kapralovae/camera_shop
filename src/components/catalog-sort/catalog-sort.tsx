import React, { useEffect, useRef, useState } from 'react';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { setIsSort, setSortDirection, setSortType } from '../../store/camera-data/camera-data';
import { getSortDirection, getSortType } from '../../store/camera-data/selectors';
// import { setSortType } from '../../store/camera-data/camera-data';
// import { getSortType } from '../../store/camera-data/selectors';
// import { useAppDisptach, useAppSelector } from '../../hooks';
// import { setSortType } from '../../store/camera-data/camera-data';
// import { getSortType } from '../../store/camera-data/selectors';

function CatalogSort () {
  const dispatch = useAppDisptach();
  const sortType = useAppSelector(getSortType);
  const sortDirection = useAppSelector(getSortDirection);
  const inputSortPrice = useRef<HTMLInputElement>(null);
  const inputSortPopular = useRef<HTMLInputElement>(null);
  const inputSortUp = useRef<HTMLInputElement>(null);
  const inputSortDown = useRef<HTMLInputElement>(null);

  const [selectedType, setSelectedType] = useState('sortPrice');
  const [selectedDirection , setSelectedDirection] = useState(sortDirection);

  // useEffect(() => {
  //   dispatch(setSortType(selectedType));
  // }, [selectedType]);

  // const handlerInputCheckedChange = (evt: ChangeEvent<HTMLInputElement>) => {
  //   // evt.preventDefault();
  //   if (evt.currentTarget.checked) {
  //     // console.log(evt.currentTarget.id);
  //   }
  //   setSelectedType(evt.currentTarget.id);
  // };

  useEffect(() => {
    dispatch(setSortType(selectedType));
    dispatch(setSortDirection(selectedDirection));
  }, [selectedType, selectedDirection]);

  const click = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsSort(true));
    // evt.preventDefault();
    setSelectedType(evt.target.value);
    // dispatch(setSortType(evt.target.id));
    // console.log(evt.target.value);
    // if (inputSortPrice && inputSortPrice.current && inputSortPopular && inputSortPopular.current && evt.target.value === 'sortPrice') {
    //   inputSortPrice.current.checked = true;
    //   inputSortPopular.current.checked = false;
    // }
    // if (inputSortPopular && inputSortPopular.current && inputSortPrice && inputSortPrice.current && evt.target.value === 'sortPopular') {
    //   inputSortPopular.current.checked = true;
    //   inputSortPrice.current.checked = false;
    // }
  };
  // const click1 = (evt: React.ChangeEvent<HTMLInputElement>) => {
  //   // evt.preventDefault();
  //   if (inputSortPrice && inputSortPrice.current) {
  //     inputSortPrice.current.checked = true;
  //     setSelectedType(inputSortPrice.current.id);
  //   }
  // };

  const change = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsSort(true));
    // evt.preventDefault();
    setSelectedDirection(evt.target.id);
    // if (evt.target.id === sortDirection) {
    //   evt.target.checked = true;
    // } else {
    //   evt.target.checked = false;
    // }
    // dispatch(setSortDirection(evt.target.id));
  };

  // const clickLabel = (evt: React.MouseEvent<HTMLLabelElement>) => {
  //   evt.preventDefault();
  //   // evt.currentTarget.click();
  //   if (evt.currentTarget.htmlFor === inputSortUp.current?.id) {
  //     inputSortUp.current.checked = true;
  //   } else {
  //     if (inputSortUp.current !== null) {
  //       inputSortUp.current.checked = false;
  //     }
  //   }

  //   if (evt.currentTarget.htmlFor === inputSortDown.current?.id) {
  //     inputSortDown.current.checked = true;
  //   } else {
  //     if (inputSortDown.current !== null) {
  //       inputSortDown.current.checked = false;
  //     }
  //   }
  // };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input onChange={click} ref={inputSortPrice} type="radio" id="sortPrice" value={'sortPrice'} name="sort" checked={selectedType === 'sortPrice'}></input>
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input onChange={click} ref={inputSortPopular} type="radio" id="sortPopular" value={'sortPopular'} name="sort1" checked={selectedType === 'sortPopular'}></input>
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input onChange={change} type="radio" id="up" name="sort-icon" aria-label="По возрастанию" checked={selectedDirection === 'up'}></input>
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input onChange={change} type="radio" id="down" name="sort-icon" aria-label="По убыванию" checked={selectedDirection === 'down'}></input>
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
