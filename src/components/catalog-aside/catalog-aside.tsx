import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { getCamerasCatalog, getIsSort, getSortCards, getSortDirection, getSortType } from '../../store/camera-data/selectors';
import { Cameras } from '../../types/camera';
import { setCamerasCatalog, setCamerasForRender, setCatalogPage, setSortCards } from '../../store/camera-data/camera-data';
import { getCameras } from '../../store/camera-process/selecrots';


function CatalogAside () {
  const dispatch = useAppDisptach();
  const allCards = useAppSelector(getCameras);
  const copyAllCards = Array.from(allCards);
  const isSort = useAppSelector(getIsSort);
  const cardsCatalog = useAppSelector(getCamerasCatalog);
  const sortedCards = useAppSelector(getSortCards);
  const sortType = useAppSelector(getSortType);
  const sortDirection = useAppSelector(getSortDirection);
  const inputPhoto = useRef<HTMLInputElement>(null);
  const inputVideo = useRef<HTMLInputElement>(null);
  const inputDigital = useRef<HTMLInputElement>(null);
  const inputFilm = useRef<HTMLInputElement>(null);
  const inputSnapshot = useRef<HTMLInputElement>(null);
  const inputCollection = useRef<HTMLInputElement>(null);
  const inputZero = useRef<HTMLInputElement>(null);
  const inputNonProfessional = useRef<HTMLInputElement>(null);
  const inputProfessional = useRef<HTMLInputElement>(null);

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
    'photocamera': 'фото',
    'videocamera': 'видео',
    'digital': 'цифровая',
    'film': 'плёночная',
    'snapshot': 'моментальная',
    'collection': 'коллекционная',
    'zero': 'zero',
    'non-professional': 'любительский',
    'professional': 'профессиональный',
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

  const [qwe, setQwe] = useState<Cameras>(copyAllCards);

  const dispatchCards = () => {
    console.log('popal sort', isSort);
    if (isSort) {
      dispatch(setSortCards(qwe));
    } else {
      dispatch(setCamerasForRender(qwe));
      dispatch(setCamerasCatalog(qwe.slice(0, 9)));
    }
  };

  // useEffect(() => {
  //   setQwe(sortedCards);
  //   setSortCards(sortedCards);
  //   dispatch(setCatalogPage(1));
  // }, [isSort]);


  useEffect(() => {
    dispatchCards();
    dispatch(setCatalogPage(1));
  }, [qwe, isSort, sortDirection, sortType]);
  console.log(qwe, cardsCatalog);


  // const handlerInputPhotoVideoCameraChange = (evt: ChangeEvent<HTMLInputElement>) => {
  //   // console.log(qwe, copyAllCards);
  //   const {name, checked} = evt.target;
  //   setFilterIsCheck({
  //     ...filterIsCheck,
  //     [name]: checked,
  //   });

  //   // if (filterIsCheck.photocamera && filterIsCheck.videocamera) {
  //   if (inputPhoto.current?.checked && inputVideo.current?.checked) {
  //     setQwe(copyAllCards.filter((camera) => camera.category.toLowerCase().includes('фото') || camera.category.toLowerCase().includes('видео')));
  //   } else {
  //     if (inputPhoto.current?.checked) {
  //       console.log('popal', qwe);
  //       setQwe(copyAllCards.filter((camera) => camera.category.toLowerCase().includes('фото')));
  //     }

  //     if (inputVideo.current?.checked) {
  //       setQwe(copyAllCards.filter((camera) => camera.category.toLowerCase().includes('видео')));
  //     }
  //   }

  //   if (!inputPhoto.current?.checked && !inputVideo.current?.checked) {
  //     setQwe(copyAllCards); // возможно изменить
  //   }
  // };

  const handlerInputCheckedChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = evt.target;
    // setQwe(copyAllCards);

    let filteredCards = copyAllCards;

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
    }


    if (inputPhoto.current?.checked && inputVideo.current?.checked) {
      filteredCards = filteredCards.filter((camera) => camera.category.toLowerCase().includes('фото') || camera.category.toLowerCase().includes('видео'));
      // setQwe(copyAllCards.filter((camera) => camera.category.toLowerCase().includes('фото') || camera.category.toLowerCase().includes('видео')));
    } else {
      if (inputPhoto.current?.checked) {
        // setQwe(copyAllCards.filter((camera) => camera.category.toLowerCase().includes('фото')));
        filteredCards = filteredCards.filter((camera) => camera.category.toLowerCase().includes('фото'));
      }

      if (inputVideo.current?.checked) {
        // setQwe(copyAllCards.filter((camera) => camera.category.toLowerCase().includes('видео')));
        filteredCards = filteredCards.filter((camera) => camera.category.toLowerCase().includes('видео'));
      }
    }



    // if (filterIsCheck.photocamera === true && filterIsCheck.videocamera === true) {
    //   setQwe(qwe.filter((camera) => camera.category.toLowerCase().includes('фото') || camera.category.toLowerCase().includes('видео')));
    // } else {
    //   if (filterValues.photocamera === name && checked) {
    //     setQwe(qwe.filter((camera) => camera.category.toLowerCase().includes('фото')));
    //   }

    //   if (filterValues.videocamera === name && checked) {
    //     setQwe(qwe.filter((camera) => camera.category.toLowerCase().includes('видео')));
    //   }
    // }
    if (inputDigital.current?.checked || inputFilm.current?.checked || inputSnapshot.current?.checked || inputCollection.current?.checked || inputZero.current?.checked || inputNonProfessional.current?.checked || inputProfessional.current?.checked) {
      filteredCards = filteredCards.filter((camera) =>
        (inputDigital.current?.checked ? camera.type.toLowerCase().includes('цифровая') : false) ||
        (inputFilm.current?.checked ? camera.type.toLowerCase().includes('плёночная') : false) ||
        (inputSnapshot.current?.checked ? camera.type.toLowerCase().includes('моментальная') : false) ||
        (inputCollection.current?.checked ? camera.type.toLowerCase().includes('коллекционная') : false) ||
        (inputZero.current?.checked ? camera.level.toLowerCase().includes('нулевой') : false) ||
        (inputNonProfessional.current?.checked ? camera.level.toLowerCase().includes('любительский') : false) ||
        (inputProfessional.current?.checked ? camera.level.toLowerCase().includes('профессиональный') : false)
      );
    }
    // if (inputDigital.current?.checked) {
    //   filteredCards = filteredCards.filter((camera) => camera.type.toLowerCase().includes('цифровая'));
    //   // setQwe(qwe.filter((camera) => camera.type.toLowerCase().includes('цифровая')));
    // }

    // if (inputFilm.current?.checked) {
    //   filteredCards = filteredCards.filter((camera) => camera.type.toLowerCase().includes('плёночная'));
    // }

    // if (inputSnapshot.current?.checked) {
    //   filteredCards = filteredCards.filter((camera) => camera.type.toLowerCase().includes('моментальная'));
    // }

    // if (inputCollection.current?.checked) {
    //   filteredCards = filteredCards.filter((camera) => camera.type.toLowerCase().includes('коллекционная'));
    // }

    // if (inputZero.current?.checked) {
    //   filteredCards = filteredCards.filter((camera) => camera.level.toLowerCase().includes('нулевой'));
    // }

    // if (inputNonProfessional.current?.checked) {
    //   filteredCards = filteredCards.filter((camera) => camera.level.toLowerCase().includes('любительский'));
    // }

    // if (inputProfessional.current?.checked) {
    //   filteredCards = filteredCards.filter((camera) => camera.level.toLowerCase().includes('профессиональный'));
    // }
    console.log(filteredCards);
    setQwe(filteredCards);

    if (!inputPhoto.current?.checked && !inputVideo.current?.checked && !inputDigital.current?.checked && !inputFilm.current?.checked && !inputSnapshot.current?.checked && !inputCollection.current?.checked && !inputZero.current?.checked && !inputNonProfessional.current?.checked && !inputProfessional.current?.checked) {
      setQwe(copyAllCards);
    }
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
                <input onChange={handlerInputCheckedChange} ref={inputPhoto} type="checkbox" name="photocamera"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={handlerInputCheckedChange} ref={inputVideo} type="checkbox" name="videocamera"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={handlerInputCheckedChange} ref={inputDigital} type="checkbox" name="digital"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={handlerInputCheckedChange} ref={inputFilm} type="checkbox" name="film"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={handlerInputCheckedChange} ref={inputSnapshot} type="checkbox" name="snapshot"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={handlerInputCheckedChange} ref={inputCollection} type="checkbox" name="collection"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={handlerInputCheckedChange} ref={inputZero} type="checkbox" name="zero"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={handlerInputCheckedChange} ref={inputNonProfessional} type="checkbox" name="non-professional"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={handlerInputCheckedChange} ref={inputProfessional} type="checkbox" name="professional"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
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
