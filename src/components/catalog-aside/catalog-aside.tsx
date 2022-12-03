import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { getCamerasCatalog, getIsSort, getSortCards } from '../../store/camera-data/selectors';
import { Cameras } from '../../types/camera';
import { setCamerasCatalog, setCatalogPage, setSortCards } from '../../store/camera-data/camera-data';
import { getCameras } from '../../store/camera-process/selecrots';


function CatalogAside () {
  const dispatch = useAppDisptach();
  const allCards = useAppSelector(getCameras);
  const copyAllCards = Array.from(allCards);
  const isSort = useAppSelector(getIsSort);
  const cardsCatalog = useAppSelector(getCamerasCatalog);
  const sortedCards = useAppSelector(getSortCards);
  // let copySortedCards: Cameras = [];
  // let copyCardsCatalog: Cameras = [];

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

  const [filterIsCheck, setFilterIsCheck] = useState({
    photocamera: false,
    videocamera: false,
    digital: false,
    film: false,
    snapshot: false,
    collection: false,
    zero: false,
    nonProfessional: false,
    professional: false,
  });

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
  // const [filteredCardsCatalog, setFilteredCardsCatalog] = useState<Cameras>([]);
  // useEffect(() => {
  //   if (isSort) {
  //     setFilteredCardsCatalog(copySortedCards);
  //   } else {
  //     setFilteredCardsCatalog(copyCardsCatalog);
  //   }
  // }, []);

  // useEffect(() => {
  //   copySortedCards = Array.from(sortedCards);
  //   copyCardsCatalog = Array.from(cardsCatalog);
  // }, [cardsCatalog, cardsCatalog, sortedCards]);


  const dispatchCards = (isSorting: boolean) => {
    if (isSorting) {
      dispatch(setSortCards(qwe));
    } else {
      console.log('da');
      dispatch(setCamerasCatalog(qwe.slice(0, 9)));
    }
  };

  const [qwe, setQwe] = useState(copyAllCards);

  useEffect(() => {
    dispatchCards(isSort);
  }, [qwe, filterIsCheck]);

  const handlerInputCheckedChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = evt.target;

    if (name === 'non-professional') {
      setFilterIsCheck({
        ...filterIsCheck,
        nonProfessional: checked,
      });
    } else {
      setFilterIsCheck({
        ...filterIsCheck,
        [name]: checked,
      });
      console.log(filterIsCheck);
    }

    if (filterIsCheck.photocamera && filterIsCheck.videocamera) {
      setQwe(copyAllCards.filter((camera) => camera.category.toLowerCase().includes('фото') || camera.category.toLowerCase().includes('видео')));
    } else {
      if (filterValues.photocamera === name && checked) {
        setQwe(copyAllCards.filter((camera) => camera.category.toLowerCase().includes('фото')));
      }

      if (filterValues.videocamera === name && checked) {
        setQwe(copyAllCards.filter((camera) => camera.category.toLowerCase().includes('видео')));
      }
    }


    if (filterValues.digital === name && checked) {
      setQwe(copyAllCards.filter((camera) => camera.type.toLowerCase().includes('цифровая')));
    }

    // dispatchCards(isSort);
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
