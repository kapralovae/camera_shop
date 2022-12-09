import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { getIsSort, getSortDirection, getSortType } from '../../store/camera-data/selectors';
import { Cameras } from '../../types/camera';
import { setCamerasCatalog, setCamerasForRender, setCatalogPage, setSortCards } from '../../store/camera-data/camera-data';
import { getCameras } from '../../store/camera-process/selecrots';


function CatalogAside () {
  const dispatch = useAppDisptach();
  const allCards = useAppSelector(getCameras);
  const copyAllCards = Array.from(allCards);
  const isSort = useAppSelector(getIsSort);
  const sortType = useAppSelector(getSortType);
  const sortDirection = useAppSelector(getSortDirection);
  const [inputPhotoChecked, setInputPhotoChecked] = useState(false);
  const [inputVideoChecked, setInputVideoChecked] = useState(false);
  const [inputDigitalChecked, setInputDigitalChecked] = useState(false);
  const [inputFilmChecked, setInputFilmChecked] = useState(false);
  const [inputSnapshotChecked, setInputSnapshotChecked] = useState(false);
  const [inputCollectionChecked, setInputCollectionChecked] = useState(false);
  const [inputZeroChecked, setInputZeroChecked] = useState(false);
  const [inputNonProfessionalChecked, setInputNonProfessionalChecked] = useState(false);
  const [inputProfessionalChecked, setInputProfessionalChecked] = useState(false);

  // type Filter = {
  //   'photocamera': string;
  //   'videocamera': string;
  //   'digital': string;
  //   'film': string;
  //   'snapshot': string;
  //   'collection': string;
  //   'zero': string;
  //   'non-professional': string;
  //   'professional': string;
  // };

  // const FILTER_NAME: Filter = {
  //   'photocamera': 'фото',
  //   'videocamera': 'видео',
  //   'digital': 'цифровая',
  //   'film': 'плёночная',
  //   'snapshot': 'моментальная',
  //   'collection': 'коллекционная',
  //   'zero': 'zero',
  //   'non-professional': 'любительский',
  //   'professional': 'профессиональный',
  // };

  const [renderedCards, setRenderedCards] = useState<Cameras>(copyAllCards);
  const [placeholderMax, setPlaceholderMax] = useState('0');
  const [placeholderMin, setPlaceholderMin] = useState('0');
  const [priceMinValue, setPriceMinValue] = useState(0);
  const [priceMaxValue, setPriceMaxValue] = useState(0);
  console.log(renderedCards);

  const dispatchCards = () => {
    if (isSort) {
      dispatch(setSortCards(renderedCards));
    } else {
      dispatch(setCamerasForRender(renderedCards));
      dispatch(setCamerasCatalog(renderedCards.slice(0, 9)));
    }
  };
  useEffect(() => {
    const copyAllForPlaceholder = Array.from(copyAllCards);
    const copyRenderCards = Array.from(renderedCards);
    if (inputPhotoChecked === false &&
      inputVideoChecked === false &&
      inputDigitalChecked === false &&
      inputFilmChecked === false &&
      inputSnapshotChecked === false &&
      inputCollectionChecked === false &&
      inputZeroChecked === false &&
      inputNonProfessionalChecked === false &&
      inputProfessionalChecked === false) {
      setPlaceholderMin(copyAllForPlaceholder === undefined || copyAllForPlaceholder.length === 0 ? placeholderMin : copyAllForPlaceholder.sort((a, b) => a.price - b.price)[0].price.toString());
      setPlaceholderMax(copyAllForPlaceholder === undefined || copyAllForPlaceholder.length === 0 ? placeholderMax : copyAllForPlaceholder.sort((a, b) => a.price - b.price)[copyAllForPlaceholder.length - 1].price.toString());
    } else {
      setPlaceholderMin(copyRenderCards === undefined || copyRenderCards.length === 0 ? placeholderMin : copyRenderCards.sort((a, b) => b.price - a.price)[copyRenderCards.length - 1].price.toString());
      setPlaceholderMax(copyRenderCards === undefined || copyRenderCards.length === 0 ? placeholderMax : copyRenderCards.sort((a, b) => b.price - a.price)[0].price.toString());
    }

  }, [copyAllCards, placeholderMax, placeholderMin, renderedCards]);

  useEffect(() => {
    console.log('prislo', renderedCards);
    dispatchCards();
    dispatch(setCatalogPage(1));
  }, [renderedCards, isSort, sortDirection, sortType]);

  useEffect(() => {
    console.log('popal', copyAllCards);
    globalFilteredCard();
  }, [inputPhotoChecked, inputVideoChecked, inputDigitalChecked, inputFilmChecked, inputSnapshotChecked, inputCollectionChecked, inputZeroChecked, inputNonProfessionalChecked, inputProfessionalChecked]);


  const globalFilteredCard = () => {
    let filteredCards = copyAllCards;

    if (inputPhotoChecked && inputVideoChecked) {
      filteredCards = filteredCards.filter((camera) => camera.category.toLowerCase().includes('фото') || camera.category.toLowerCase().includes('видео'));
    } else {
      if (inputPhotoChecked) {
        filteredCards = filteredCards.filter((camera) => camera.category.toLowerCase().includes('фото'));
      }

      if (inputVideoChecked) {
        // console.log('popal');
        setInputFilmChecked(false);
        setInputSnapshotChecked(false);
        filteredCards = filteredCards.filter((camera) => camera.category.toLowerCase().includes('видео'));
      }
    }

    if (inputDigitalChecked || inputFilmChecked || inputSnapshotChecked || inputCollectionChecked) {
      filteredCards = filteredCards.filter((camera) =>
        (inputDigitalChecked ? camera.type.toLowerCase().includes('цифровая') : false) ||
        (inputFilmChecked ? camera.type.toLowerCase().includes('плёночная') : false) ||
        (inputSnapshotChecked ? camera.type.toLowerCase().includes('моментальная') : false) ||
        (inputCollectionChecked ? camera.type.toLowerCase().includes('коллекционная') : false)
      );
    }

    if (inputZeroChecked || inputNonProfessionalChecked || inputProfessionalChecked) {
      filteredCards = filteredCards.filter((camera) =>
        (inputZeroChecked ? camera.level.toLowerCase().includes('нулевой') : false) ||
        (inputNonProfessionalChecked ? camera.level.toLowerCase().includes('любительский') : false) ||
        (inputProfessionalChecked ? camera.level.toLowerCase().includes('профессиональный') : false)
      );
    }
    console.log(priceMinValue, priceMaxValue, filteredCards);
    // setRenderedCards(filteredCards.filter((card) => card.price >= (priceMinValue !== 0 ? priceMinValue : Number(placeholderMin)) && card.price <= (priceMaxValue !== 0 ? priceMaxValue : Number(placeholderMax))));
    if (priceMinValue || priceMaxValue) {
      setRenderedCards(filteredCards.filter((card) => card.price >= priceMinValue && card.price <= priceMaxValue));
    } else if (priceMinValue !== 0 && priceMaxValue !== 0 && (priceMinValue === priceMaxValue)) {
      setRenderedCards(filteredCards.filter((card) => card.price === priceMinValue || card.price === priceMaxValue));
    } else if (!inputPhotoChecked && !inputVideoChecked && !inputDigitalChecked && !inputFilmChecked && !inputSnapshotChecked && !inputCollectionChecked && !inputZeroChecked && !inputNonProfessionalChecked && !inputProfessionalChecked && priceMinValue === 0 && priceMaxValue === 0) {
      setRenderedCards(copyAllCards);
    } else {
      setRenderedCards(filteredCards);
    }

    // if (!inputPhotoChecked && !inputVideoChecked && !inputDigitalChecked && !inputFilmChecked && !inputSnapshotChecked && !inputCollectionChecked && !inputZeroChecked && !inputNonProfessionalChecked && !inputProfessionalChecked && priceMinValue === 0 && priceMaxValue === 0) {
    //   setRenderedCards(copyAllCards);
    // }
  };

  // const handlerInputCheckedChange = (evt: ChangeEvent<HTMLInputElement>) => {
  //   // const {name} = evt.target;
  //   // const filterText = name as keyof Filter; // Попробовать оптимизмровать, чтобы было без текста

  //   // let filteredCards = (priceMinValue || priceMaxValue) && renderedCards.length !== 0 ? renderedCards : copyAllCards;
  //   let filteredCards = copyAllCards;

  //   if (inputPhotoChecked && inputVideoChecked) {
  //     filteredCards = filteredCards.filter((camera) => camera.category.toLowerCase().includes('фото') || camera.category.toLowerCase().includes('видео'));
  //   } else {
  //     if (inputPhotoChecked) {
  //       console.log('popal');
  //       filteredCards = filteredCards.filter((camera) => camera.category.toLowerCase().includes('фото'));
  //     }

  //     if (inputVideoChecked) {
  //       console.log('popal');
  //       filteredCards = filteredCards.filter((camera) => camera.category.toLowerCase().includes('видео'));
  //     }
  //   }

  //   if (inputDigitalChecked || inputFilmChecked || inputSnapshotChecked || inputCollectionChecked) {
  //     filteredCards = filteredCards.filter((camera) =>
  //       (inputDigitalChecked ? camera.type.toLowerCase().includes('цифровая') : false) ||
  //       (inputFilmChecked ? camera.type.toLowerCase().includes('плёночная') : false) ||
  //       (inputSnapshotChecked ? camera.type.toLowerCase().includes('моментальная') : false) ||
  //       (inputCollectionChecked ? camera.type.toLowerCase().includes('коллекционная') : false)
  //     );
  //   }

  //   if (inputZeroChecked || inputNonProfessionalChecked || inputProfessionalChecked) {
  //     filteredCards = filteredCards.filter((camera) =>
  //       (inputZeroChecked ? camera.level.toLowerCase().includes('нулевой') : false) ||
  //       (inputNonProfessionalChecked ? camera.level.toLowerCase().includes('любительский') : false) ||
  //       (inputProfessionalChecked ? camera.level.toLowerCase().includes('профессиональный') : false)
  //     );
  //   }
  //   console.log(priceMinValue, priceMaxValue);
  //   setRenderedCards(filteredCards.filter((card) => card.price >= (priceMinValue !== 0 ? priceMinValue : Number(placeholderMin)) && card.price <= (priceMaxValue !== 0 ? priceMaxValue : Number(placeholderMax))));

  //   if (!inputPhotoChecked && !inputVideoChecked && !inputDigitalChecked&& !inputFilmChecked && !inputSnapshotChecked && !inputCollectionChecked && !inputZeroChecked && !inputNonProfessionalChecked && !inputProfessionalChecked && (priceMinValue === 0 && priceMaxValue === 0)) {
  //     setRenderedCards(copyAllCards);
  //   }

  // };

  const handlerInputPriceMinChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // console.log(placeholderMin, priceMaxValue);

    // if (Number(evt.target.value) <= Number(placeholderMin)) {
    //   setPriceMinValue(Number(placeholderMin));
    // }

    // if (Number(evt.target.value) >= priceMaxValue ? priceMaxValue : Number(placeholderMax)) {
    //   setPriceMinValue(priceMaxValue ? priceMaxValue : Number(placeholderMax));
    // }
    setPriceMinValue(Number(evt.target.value));
    // if (Number(evt.target.value) < Number(placeholderMin) || Number(evt.target.value) > Number(placeholderMax)) {
    // }
    // console.log(priceMaxValue, placeholderMax);
  };


  const handlerInputPriceMinBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const copyRenderCards = Array.from(copyAllCards);

    console.log(priceMinValue, placeholderMin, placeholderMax, priceMaxValue);

    const priceMax = priceMaxValue ? priceMaxValue : Number(placeholderMax);

    const priceMinFilter = (priceMinValue >= priceMaxValue || priceMinValue >= Number(placeholderMax)) ? priceMax : priceMinValue;
    console.log(priceMinFilter);

    const filtered = copyRenderCards.filter((camera) => camera.price >= priceMinFilter);
    setRenderedCards(filtered);
    const minValue = (filtered.sort((a, b) => a.price - b.price)[0].price);
    // console.log(minValue, priceMinFilter);
    setPriceMinValue(minValue);
    globalFilteredCard();
  };

  const handlerInputPriceMaxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPriceMaxValue(Number(evt.target.value));
  };

  const handlerInputPriceMaxBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const copyRenderCards = Array.from(copyAllCards);

    console.log(priceMaxValue, placeholderMin, placeholderMax, priceMinValue, copyRenderCards);

    const priceMin = priceMinValue ? priceMinValue : Number(placeholderMin);

    const priceMaxFilter = (priceMaxValue <= priceMinValue || priceMaxValue <= Number(placeholderMin)) ? priceMin : priceMaxValue;
    console.log(priceMaxFilter);

    const filtered = copyRenderCards.filter((camera) => camera.price <= priceMaxFilter);
    setRenderedCards(filtered);
    const maxValue = (filtered.sort((a, b) => a.price - b.price)[filtered.length - 1].price);
    setPriceMaxValue(maxValue);
    globalFilteredCard();
    // if (Number(evt.target.value) > Number(placeholderMax)) {
    //   setPriceMaxValue(Number(placeholderMax));
    // }
    // if (Number(evt.target.value) < Number(priceMinValue)) {
    //   setPriceMaxValue(Number(priceMinValue));
    // }
  };

  const handlerButtonResetFilter = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setPriceMinValue(0);
    setPriceMaxValue(0);
    // inputPhoto.current?.checked == false;
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
                  <input onChange={handlerInputPriceMinChange} value={priceMinValue || ''} onBlur={handlerInputPriceMinBlur} type="number" name="price" min={0} placeholder={placeholderMin}></input>
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input onChange={handlerInputPriceMaxChange} value={priceMaxValue || ''} onBlur={handlerInputPriceMaxBlur} type="number" name="priceUp" min={0} placeholder={placeholderMax}></input>
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputPhotoChecked(!inputPhotoChecked);}} checked={inputPhotoChecked} type="checkbox" name="photocamera"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputVideoChecked(!inputVideoChecked);}} checked={inputVideoChecked} type="checkbox" name="videocamera"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputDigitalChecked(!inputDigitalChecked);}} checked={inputDigitalChecked} type="checkbox" name="digital"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputFilmChecked(!inputFilmChecked);}} checked={inputFilmChecked} disabled={inputVideoChecked} type="checkbox" name="film"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputSnapshotChecked(!inputSnapshotChecked);}} checked={inputSnapshotChecked} disabled={inputVideoChecked} type="checkbox" name="snapshot"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputCollectionChecked(!inputCollectionChecked);}} checked={inputCollectionChecked} type="checkbox" name="collection"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputZeroChecked(!inputZeroChecked);}} checked={inputZeroChecked} type="checkbox" name="zero"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputNonProfessionalChecked(!inputNonProfessionalChecked);}} checked={inputNonProfessionalChecked} type="checkbox" name="non-professional"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputProfessionalChecked(!inputProfessionalChecked);}} checked={inputProfessionalChecked} type="checkbox" name="professional"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button onClick={handlerButtonResetFilter} className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default CatalogAside;
