import { ChangeEvent, useEffect, useRef, useState } from 'react';
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
  const inputPhoto = useRef<HTMLInputElement>(null);
  const inputVideo = useRef<HTMLInputElement>(null);
  const inputDigital = useRef<HTMLInputElement>(null);
  const inputFilm = useRef<HTMLInputElement>(null);
  const inputSnapshot = useRef<HTMLInputElement>(null);
  const inputCollection = useRef<HTMLInputElement>(null);
  const inputZero = useRef<HTMLInputElement>(null);
  const inputNonProfessional = useRef<HTMLInputElement>(null);
  const inputProfessional = useRef<HTMLInputElement>(null);

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
    if (inputPhoto.current?.checked === false &&
      inputVideo.current?.checked === false &&
      inputDigital.current?.checked === false &&
      inputSnapshot.current?.checked === false &&
      inputCollection.current?.checked === false &&
      inputZero.current?.checked === false &&
      inputNonProfessional.current?.checked === false &&
      inputProfessional.current?.checked === false) {
      setPlaceholderMin(copyAllForPlaceholder === undefined || copyAllForPlaceholder.length === 0 ? placeholderMin : copyAllForPlaceholder.sort((a, b) => a.price - b.price)[0].price.toString());
      setPlaceholderMax(copyAllForPlaceholder === undefined || copyAllForPlaceholder.length === 0 ? placeholderMax : copyAllForPlaceholder.sort((a, b) => a.price - b.price)[copyAllForPlaceholder.length - 1].price.toString());
    } else {
      setPlaceholderMin(copyRenderCards === undefined || copyRenderCards.length === 0 ? placeholderMin : copyRenderCards.sort((a, b) => b.price - a.price)[copyRenderCards.length - 1].price.toString());
      setPlaceholderMax(copyRenderCards === undefined || copyRenderCards.length === 0 ? placeholderMax : copyRenderCards.sort((a, b) => b.price - a.price)[0].price.toString());
    }

  }, [copyAllCards, placeholderMax, placeholderMin, renderedCards]);

  useEffect(() => {
    dispatchCards();
    dispatch(setCatalogPage(1));
  }, [renderedCards, isSort, sortDirection, sortType]);

  const handlerInputCheckedChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // const {name} = evt.target;
    // const filterText = name as keyof Filter; // Попробовать оптимизмровать, чтобы было без текста

    let filteredCards = (priceMinValue || priceMaxValue) && renderedCards.length !== 0 ? renderedCards : copyAllCards;

    if (inputPhoto.current?.checked && inputVideo.current?.checked) {
      filteredCards = filteredCards.filter((camera) => camera.category.toLowerCase().includes('фото') || camera.category.toLowerCase().includes('видео'));
    } else {
      if (inputPhoto.current?.checked) {
        filteredCards = filteredCards.filter((camera) => camera.category.toLowerCase().includes('фото'));
      }

      if (inputVideo.current?.checked) {
        filteredCards = filteredCards.filter((camera) => camera.category.toLowerCase().includes('видео'));
      }
    }

    if (inputDigital.current?.checked || inputFilm.current?.checked || inputSnapshot.current?.checked || inputCollection.current?.checked) {
      filteredCards = filteredCards.filter((camera) =>
        (inputDigital.current?.checked ? camera.type.toLowerCase().includes('цифровая') : false) ||
        (inputFilm.current?.checked ? camera.type.toLowerCase().includes('плёночная') : false) ||
        (inputSnapshot.current?.checked ? camera.type.toLowerCase().includes('моментальная') : false) ||
        (inputCollection.current?.checked ? camera.type.toLowerCase().includes('коллекционная') : false)
      );
    }

    if (inputZero.current?.checked || inputNonProfessional.current?.checked || inputProfessional.current?.checked) {
      filteredCards = filteredCards.filter((camera) =>
        (inputZero.current?.checked ? camera.level.toLowerCase().includes('нулевой') : false) ||
        (inputNonProfessional.current?.checked ? camera.level.toLowerCase().includes('любительский') : false) ||
        (inputProfessional.current?.checked ? camera.level.toLowerCase().includes('профессиональный') : false)
      );
    }
    console.log(priceMinValue, priceMaxValue);
    setRenderedCards(filteredCards.filter((card) => card.price >= (priceMinValue !== 0 ? priceMinValue : Number(placeholderMin)) && card.price <= (priceMaxValue !== 0 ? priceMaxValue : Number(placeholderMax))));

    if (!inputPhoto.current?.checked && !inputVideo.current?.checked && !inputDigital.current?.checked && !inputFilm.current?.checked && !inputSnapshot.current?.checked && !inputCollection.current?.checked && !inputZero.current?.checked && !inputNonProfessional.current?.checked && !inputProfessional.current?.checked) {
      setRenderedCards(copyAllCards);
    }

  };

  const handlerInputPriceMinChange = (evt: ChangeEvent<HTMLInputElement>) => {
    console.log(placeholderMin);
    if (Number(evt.target.value) <= Number(placeholderMin)) {
      setPriceMinValue(Number(placeholderMin));
    }

    if (Number(evt.target.value) >= Number(placeholderMax)) {
      setPriceMinValue(Number(placeholderMax));
    }

    setPriceMinValue(Number(evt.target.value));
    // if (Number(evt.target.value) < Number(placeholderMin) || Number(evt.target.value) > Number(placeholderMax)) {
    // }
    console.log(priceMaxValue, placeholderMax);
  };


  const handlerInputPriceMinBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const copyRenderCards = Array.from(
      inputPhoto.current?.checked === false &&
      inputVideo.current?.checked === false &&
      inputDigital.current?.checked === false &&
      inputSnapshot.current?.checked === false &&
      inputCollection.current?.checked === false &&
      inputZero.current?.checked === false &&
      inputNonProfessional.current?.checked === false &&
      inputProfessional.current?.checked === false ? copyAllCards : renderedCards);
    console.log(priceMinValue, placeholderMin, placeholderMax, priceMaxValue);
    const priceMinFilter = priceMinValue >= Number(placeholderMax) ? placeholderMax : priceMinValue;

    const filtered = copyRenderCards.filter((camera) => camera.price >= priceMinFilter);
    const minValue = (filtered.sort((a, b) => a.price - b.price)[0].price);
    setPriceMinValue(Number(minValue));
    setRenderedCards(filtered);
  };

  const handlerInputPriceMaxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) >= Number(placeholderMax)) {
      setPriceMaxValue(Number(placeholderMax));
    }

    if (Number(evt.target.value) <= Number(placeholderMin)) {
      setPriceMaxValue(Number(placeholderMin));
    }
    console.log(priceMaxValue, placeholderMin, placeholderMax);
    setPriceMaxValue(Number(evt.target.value));
  };

  const handlerInputPriceMaxBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const copyRenderCards = Array.from(
      inputPhoto.current?.checked === false &&
      inputVideo.current?.checked === false &&
      inputDigital.current?.checked === false &&
      inputSnapshot.current?.checked === false &&
      inputCollection.current?.checked === false &&
      inputZero.current?.checked === false &&
      inputNonProfessional.current?.checked === false &&
      inputProfessional.current?.checked === false ? copyAllCards : renderedCards);

      console.log(priceMaxValue, placeholderMin, placeholderMax, priceMinValue);


    const priceMaxFilter = priceMaxValue <= Number(placeholderMin) ? placeholderMin : priceMaxValue;

    const filtered = copyRenderCards.filter((camera) => camera.price <= priceMaxFilter);
    setRenderedCards(filtered);
    const maxValue = (filtered.sort((a, b) => a.price - b.price)[filtered.length - 1].price);
    setPriceMaxValue(Number(maxValue));

    // if (Number(evt.target.value) > Number(placeholderMax)) {
    //   setPriceMaxValue(Number(placeholderMax));
    // }
    // if (Number(evt.target.value) < Number(priceMinValue)) {
    //   setPriceMaxValue(Number(priceMinValue));
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
