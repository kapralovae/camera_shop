import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { getIsSort, getSortDirection, getSortType } from '../../store/camera-data/selectors';
import { Cameras } from '../../types/camera';
import { setCamerasCatalog, setCamerasForRender, setCatalogPage, setSortCards } from '../../store/camera-data/camera-data';
import { getCameras } from '../../store/camera-process/selecrots';
import { useSearchParams } from 'react-router-dom';


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

  const [renderedCards, setRenderedCards] = useState<Cameras>(copyAllCards);
  const [placeholderMax, setPlaceholderMax] = useState('0');
  const [placeholderMin, setPlaceholderMin] = useState('0');
  const [priceMinValue, setPriceMinValue] = useState(0);
  const [priceMaxValue, setPriceMaxValue] = useState(0);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setRenderedCards(copyAllCards);
  }, [allCards]);

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
    dispatchCards();
    dispatch(setCatalogPage(1));
  }, [renderedCards, isSort, sortDirection, sortType]);

  useEffect(() => {
    if (inputPhotoChecked || inputVideoChecked || inputDigitalChecked || inputFilmChecked || inputSnapshotChecked || inputCollectionChecked || inputZeroChecked || inputNonProfessionalChecked || inputProfessionalChecked || priceMinValue || priceMaxValue) {
      setSearchParams({
        'priceMin': priceMinValue ? String(priceMinValue) : placeholderMin,
        'priceMax': priceMaxValue ? String(priceMaxValue) : placeholderMax,
        'photo': String(inputPhotoChecked),
        'video': String(inputVideoChecked),
        'digital': String(inputDigitalChecked),
        'film': String(inputFilmChecked),
        'snapshot':String(inputSnapshotChecked),
        'collection': String(inputCollectionChecked),
        'zero': String(inputZeroChecked),
        'nonProfessional': String(inputNonProfessionalChecked),
        'professional': String(inputProfessionalChecked),
      });
    } else {
      setSearchParams(undefined);
    }

  }, [priceMinValue, priceMaxValue, inputCollectionChecked, inputDigitalChecked, inputFilmChecked, inputNonProfessionalChecked, inputPhotoChecked, inputProfessionalChecked, inputSnapshotChecked, inputVideoChecked, inputZeroChecked]);

  useEffect(() => {
    globalFilteredCard();
  }, [inputPhotoChecked, inputVideoChecked, inputDigitalChecked, inputFilmChecked, inputSnapshotChecked, inputCollectionChecked, inputZeroChecked, inputNonProfessionalChecked, inputProfessionalChecked, priceMinValue, priceMaxValue]);


  const globalFilteredCard = () => {
    let filteredCards = copyAllCards;

    if (inputPhotoChecked && inputVideoChecked) {
      filteredCards = filteredCards.filter((camera) => camera.category.toLowerCase().includes('????????') || camera.category.toLowerCase().includes('??????????'));
    } else {
      if (inputPhotoChecked) {
        filteredCards = filteredCards.filter((camera) => camera.category.toLowerCase().includes('????????'));
      }

      if (inputVideoChecked) {
        setInputFilmChecked(false);
        setInputSnapshotChecked(false);
        filteredCards = filteredCards.filter((camera) => camera.category.toLowerCase().includes('??????????'));
      }
    }

    if (inputDigitalChecked || inputFilmChecked || inputSnapshotChecked || inputCollectionChecked) {
      filteredCards = filteredCards.filter((camera) =>
        (inputDigitalChecked ? camera.type.toLowerCase().includes('????????????????') : false) ||
        (inputFilmChecked ? camera.type.toLowerCase().includes('??????????????????') : false) ||
        (inputSnapshotChecked ? camera.type.toLowerCase().includes('????????????????????????') : false) ||
        (inputCollectionChecked ? camera.type.toLowerCase().includes('??????????????????????????') : false)
      );
    }

    if (inputZeroChecked || inputNonProfessionalChecked || inputProfessionalChecked) {
      filteredCards = filteredCards.filter((camera) =>
        (inputZeroChecked ? camera.level.toLowerCase().includes('??????????????') : false) ||
        (inputNonProfessionalChecked ? camera.level.toLowerCase().includes('????????????????????????') : false) ||
        (inputProfessionalChecked ? camera.level.toLowerCase().includes('????????????????????????????????') : false)
      );
    }

    if (priceMinValue || priceMaxValue) {
      if (priceMinValue && priceMaxValue) {
        setRenderedCards(filteredCards.filter((card) => card.price >= priceMinValue && card.price <= priceMaxValue));
      } else if (!priceMinValue && priceMaxValue) {
        setRenderedCards(filteredCards.filter((card) => card.price <= priceMaxValue));
      } else if (priceMinValue && !priceMaxValue) {
        setRenderedCards(filteredCards.filter((card) => card.price >= priceMinValue));
      }
    } else if (priceMinValue !== 0 && priceMaxValue !== 0 && (priceMinValue === priceMaxValue)) {
      setRenderedCards(filteredCards.filter((card) => card.price === priceMinValue || card.price === priceMaxValue));
    } else if (!inputPhotoChecked && !inputVideoChecked && !inputDigitalChecked && !inputFilmChecked && !inputSnapshotChecked && !inputCollectionChecked && !inputZeroChecked && !inputNonProfessionalChecked && !inputProfessionalChecked && priceMinValue === 0 && priceMaxValue === 0) {
      setRenderedCards(copyAllCards);
    } else {
      setRenderedCards(filteredCards);
    }

  };

  const handlerInputPriceMinChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPriceMinValue(Number(evt.target.value));
  };

  const handlerInputPriceMinBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const copyRenderCards = Array.from(copyAllCards);
    const priceMax = priceMaxValue ? priceMaxValue : Number(placeholderMax);

    let priceMin: number;
    if (priceMinValue === 0) {
      setPriceMinValue(0);
    } else if (priceMinValue <= Number(placeholderMin)) {
      priceMin = Number(placeholderMin);
    } else if (priceMinValue > Number(placeholderMin) && priceMinValue <= priceMax) {
      priceMin = priceMinValue;
    } else if (priceMinValue >= priceMax) {
      priceMin = priceMax;
    }

    const filtered = copyRenderCards.filter((camera) => camera.price >= priceMin);
    const minValue = (filtered.sort((a, b) => a.price - b.price)[0].price);
    setPriceMinValue(minValue);
  };

  const handlerInputPriceMaxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPriceMaxValue(Number(evt.target.value));
  };

  const handlerInputPriceMaxBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const copyRenderCards = Array.from(copyAllCards);
    const priceMin = priceMinValue ? priceMinValue : Number(placeholderMin);

    let priceMax: number;
    if (priceMaxValue === 0) {
      setPriceMaxValue(0);
    } else if (priceMaxValue >= Number(placeholderMax)) {
      priceMax = Number(placeholderMax);
    } else if (priceMaxValue < Number(placeholderMax) && priceMaxValue >= priceMin) {
      priceMax = priceMaxValue;
    } else if (priceMaxValue <= priceMin) {
      priceMax = priceMin;
    }

    const filtered = copyRenderCards.filter((camera) => camera.price <= priceMax);
    const maxValue = (filtered.sort((a, b) => a.price - b.price)[filtered.length - 1].price);
    setPriceMaxValue(maxValue);
  };

  const handlerButtonResetFilter = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setPriceMinValue(0);
    setPriceMaxValue(0);
    setRenderedCards(copyAllCards);
    setInputPhotoChecked(false);
    setInputVideoChecked(false);
    setInputDigitalChecked(false);
    setInputFilmChecked(false);
    setInputSnapshotChecked(false);
    setInputCollectionChecked(false);
    setInputZeroChecked(false);
    setInputNonProfessionalChecked(false);
    setInputProfessionalChecked(false);
    setSearchParams({});
  };


  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">????????????</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">????????, ???</legend>
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
            <legend className="title title--h5">??????????????????</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={(evt: ChangeEvent<HTMLInputElement>) => {setInputPhotoChecked(!inputPhotoChecked);}} checked={inputPhotoChecked} type="checkbox" name="photocamera"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">????????????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputVideoChecked(!inputVideoChecked);}} checked={inputVideoChecked} type="checkbox" name="videocamera"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">??????????????????????</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">?????? ????????????</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputDigitalChecked(!inputDigitalChecked);}} checked={inputDigitalChecked} type="checkbox" name="digital"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">????????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputFilmChecked(!inputFilmChecked);}} checked={inputFilmChecked} disabled={inputVideoChecked} type="checkbox" name="film"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">??????????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputSnapshotChecked(!inputSnapshotChecked);}} checked={inputSnapshotChecked} disabled={inputVideoChecked} type="checkbox" name="snapshot"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">????????????????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputCollectionChecked(!inputCollectionChecked);}} checked={inputCollectionChecked} type="checkbox" name="collection"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">??????????????????????????</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">??????????????</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputZeroChecked(!inputZeroChecked);}} checked={inputZeroChecked} type="checkbox" name="zero"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">??????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputNonProfessionalChecked(!inputNonProfessionalChecked);}} checked={inputNonProfessionalChecked} type="checkbox" name="non-professional"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">????????????????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input onChange={() => {setInputProfessionalChecked(!inputProfessionalChecked);}} checked={inputProfessionalChecked} type="checkbox" name="professional"></input><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">????????????????????????????????</span>
              </label>
            </div>
          </fieldset>
          <button onClick={handlerButtonResetFilter} className="btn catalog-filter__reset-btn" type="reset">???????????????? ??????????????
          </button>
        </form>
      </div>
    </div>
  );
}

export default CatalogAside;
