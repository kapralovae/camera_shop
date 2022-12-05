import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
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
    if (renderedCards === undefined || renderedCards.length === 0) {
      setPlaceholderMin(copyAllForPlaceholder === undefined || copyAllForPlaceholder.length === 0 ? '0' : copyAllForPlaceholder.sort((a, b) => b.price - a.price)[copyAllForPlaceholder.length - 1].price.toString());
      setPlaceholderMax(copyAllForPlaceholder === undefined || copyAllForPlaceholder.length === 0 ? '0' : copyAllForPlaceholder.sort((a, b) => b.price - a.price)[0].price.toString());
    } else {
      setPlaceholderMin(copyRenderCards === undefined || copyRenderCards.length === 0 ? '0' : copyRenderCards.sort((a, b) => b.price - a.price)[copyRenderCards.length - 1].price.toString());
      setPlaceholderMax(copyRenderCards === undefined || copyRenderCards.length === 0 ? '0' : copyRenderCards.sort((a, b) => b.price - a.price)[0].price.toString());
    }

  }, [copyAllCards, renderedCards]);


  useEffect(() => {
    dispatchCards();
    dispatch(setCatalogPage(1));
  }, [renderedCards, isSort, sortDirection, sortType]);

  const handlerInputCheckedChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // const {name} = evt.target;
    // const filterText = name as keyof Filter; // Попробовать оптимизмровать, чтобы было без текста

    let filteredCards = copyAllCards;

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

    setRenderedCards(filteredCards);

    if (!inputPhoto.current?.checked && !inputVideo.current?.checked && !inputDigital.current?.checked && !inputFilm.current?.checked && !inputSnapshot.current?.checked && !inputCollection.current?.checked && !inputZero.current?.checked && !inputNonProfessional.current?.checked && !inputProfessional.current?.checked) {
      setRenderedCards(copyAllCards);
    }

  };

  const handlerInputPriceInput = (evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value, placeholderMin);
    if (evt.target.value < placeholderMin) {
      evt.target.textContent = placeholderMin;
    }
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
                  <input onInput={handlerInputPriceInput} type="number" name="price" min={0} placeholder={placeholderMin}></input>
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input type="number" name="priceUp" min={0} placeholder={placeholderMax}></input>
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
