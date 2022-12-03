import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { getCamerasCatalog, getIsSort, getSortCards } from '../../store/camera-data/selectors';
import { Cameras } from '../../types/camera';
import { setCamerasCatalog, setCatalogPage, sortCards } from '../../store/camera-data/camera-data';
import { getCameras } from '../../store/camera-process/selecrots';


function CatalogAside () {
  const dispatch = useAppDisptach();
  const allCards = useAppSelector(getCameras);
  const isSort = useAppSelector(getIsSort);
  const cardsCatalog = useAppSelector(getCamerasCatalog);
  const sortedCards = useAppSelector(getSortCards);
  let copySortedCards: Cameras = [];
  const copyCardsCatalog: Cameras = Array.from(cardsCatalog);

  // type Filter = {
  //   photocamera: boolean;
  //   videocamera: boolean;
  //   digital: boolean;
  //   film: boolean;
  //   snapshot: boolean;
  //   collection: boolean;
  //   zero: boolean;
  //   nonProfessional: boolean;
  //   professional: boolean;
  // };

  const filterValues = {
    photocamera: 'photocamera',
    videocamera: 'videocamera',
    digital: 'digital',
    film: 'film',
    snapshot: 'snapshot',
    collection: 'collection',
    zero: 'zero',
    nonProfessional: 'non-professional',
    professional: 'professional',
  };

  // const [filterValues, setFilterValues] = useState({
  //   photocamera: 'photocamera',
  //   videocamera: 'videocamera',
  //   digital: 'digital',
  //   film: 'film',
  //   snapshot: 'snapshot',
  //   collection: 'collection',
  //   zero: 'zero',
  //   nonProfessional: 'non-professional',
  //   professional: 'professional',
  // });

  useEffect(() => {
    copySortedCards = Array.from(sortedCards);
    // copyCardsCatalog = Array.from(cardsCatalog);
  }, [cardsCatalog, cardsCatalog, sortedCards]);

  const [filteredCardsCatalog, setFilteredCardsCatalog] = useState(isSort ? copySortedCards : copyCardsCatalog);
  // const filteredCardsCatalog = isSort ? copyCardsCatalog : copyCardsCatalog;

  const dispatchCards = (isSorting: boolean) => {
    if (isSorting) {
      dispatch(sortCards(filteredCardsCatalog));
    } else {
      dispatch(setCamerasCatalog(filteredCardsCatalog));
    }
  };

  const handlerInputCheckedChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = evt.target;

    // if (name === 'non-professional') {
    //   setFilterValues({
    //     ...filterValues,
    //     nonProfessional: checked,
    //   });
    // } else {
    //   setFilterValues({
    //     ...filterValues,
    //     [name]: checked,
    //   });
    //   console.log(filterValues[name]);
    // }

    if (filterValues.photocamera === name && checked) {
      console.log(filteredCardsCatalog);
      setFilteredCardsCatalog(filteredCardsCatalog.filter((camera) => camera.category.toLowerCase().includes('фото')));
      console.log(filteredCardsCatalog);
    }

    if (filterValues.videocamera) {
      filteredCardsCatalog.filter((camera) => camera.category.toLowerCase().includes('видео'));
    }


    dispatchCards(isSort);
    dispatch(setCatalogPage(1));

    // switch (name) {
    //   case 'photocamera':
    //     includeKey = 'фото';
    //     if (checked) {
    //       if (isSort) {
    //         setFilteredCardsCatalog(copySortedCards.filter((camera) => camera.category.toLowerCase().includes(includeKey)));
    //         dispatch(sortCards(filteredCardsCatalog));
    //         dispatch(setCatalogPage(1));
    //       } else {
    //         setFilteredCardsCatalog(copyCardsCatalog.filter((camera) => camera.category.toLowerCase().includes(includeKey)));
    //         dispatch(sortCards(filteredCardsCatalog));
    //         dispatch(setCatalogPage(1));
    //       }
    //     } else {
    //       if (isSort) {
    //         setFilteredCardsCatalog(copySortedCards.filter((camera) => camera.category.toLowerCase().includes(includeKey)));
    //         dispatch(sortCards(filteredCardsCatalog));
    //         dispatch(setCatalogPage(1));
    //       } else {
    //         setFilteredCardsCatalog(copyCardsCatalog.filter((camera) => camera.category.toLowerCase().includes(includeKey)));
    //         dispatch(sortCards(filteredCardsCatalog));
    //         dispatch(setCatalogPage(1));
    //       }
    //     }

    //     break;
    // }

    // if (checked && (name === 'photocamera' || 'videocamera')) {
    //   const includeKey = name === 'photocamera' ? 'фото' : 'видео';
    //   if (isSort) {
    //     setFilteredCardsCatalog(copySortedCards.filter((camera) => camera.category.toLowerCase().includes(includeKey)));
    //     dispatch(sortCards(filteredCardsCatalog));
    //     dispatch(setCatalogPage(1));
    //   } else {
    //     setFilteredCardsCatalog(copyCardsCatalog.filter((camera) => camera.category.toLowerCase().includes(includeKey)));
    //     dispatch(setCamerasCatalog(filteredCardsCatalog));
    //     dispatch(setCatalogPage(1));
    //   }
    // } else {
    //   if (isSort) {
    //     dispatch(sortCards(allCards));
    //     dispatch(setCatalogPage(1));
    //   } else {
    //     dispatch(setCamerasCatalog(copyCardsCatalog));
    //     dispatch(setCatalogPage(1));
    //   }
    // }
    // // // filteredCardsCatalog.filter((camera) => camera.name.includes('фото'));
    // // dispatch();
    // if (name === 'non-professional') {
    //   setFilterValues({
    //     ...filterValues,
    //     nonProfessional: !filterValues.nonProfessional,
    //   });
    // } else {
    //   console.log(filterValues);
    //   setFilterValues({
    //     ...filterValues,
    //     [name]: !filterValues[name],
    //   });
    // }
  };

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input type="number" name="price" placeholder="от"></input>
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input type="number" name="priceUp" placeholder="до"></input>
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={handlerInputCheckedChange} type="checkbox" name="photocamera"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={handlerInputCheckedChange} type="checkbox" name="videocamera"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={handlerInputCheckedChange} type="checkbox" name="digital"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="film"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="snapshot"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={handlerInputCheckedChange} type="checkbox" name="collection"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={handlerInputCheckedChange} type="checkbox" name="zero"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={handlerInputCheckedChange} type="checkbox" name="non-professional"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="professional"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default CatalogAside;
