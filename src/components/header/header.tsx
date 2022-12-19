import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/camera-process/selecrots';
import { Cameras } from '../../types/camera';

function Header () {
  const camerasAll = useAppSelector(getCameras);

  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCameras = (cameras: Cameras, textFilter: string) => cameras.filter((camera) => camera.name.toLocaleLowerCase().includes(textFilter.toLocaleLowerCase()));

  const [style, setStyle] = useState({
    visibility: 'hidden',
    opacity: 0,
  } as React.CSSProperties);

  const [styleButton, setStyleButton] = useState({
    display: 'none',
  } as React.CSSProperties);


  const handlerOnFocusInput = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value === '') {
      setStyleButton({
        display: 'none',
      });
    } else {
      setStyleButton({
        display: 'block',
      });
    }
  };

  const handlerInputChangeText = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setValue(evt.target.value);
    if (evt.target.value === '') {
      setStyle({
        visibility: 'hidden',
        opacity: 0,
      });
      setStyleButton({
        display: 'none',
      });
    } else {
      setStyleButton({
        display: 'block',
      });
      setStyle({
        visibility: 'visible',
        opacity: 1,
      });
    }
  };

  const handlerClickResetSearchButton = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setValue('');
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    document.onclick = (evt: MouseEvent) => {
      if (inputRef && inputRef.current && evt.target) {
        if (document.contains(inputRef.current) && evt.target !== inputRef.current) {
          setStyle({
            visibility: 'hidden',
            opacity: 0,
          });
          setStyleButton({
            display: 'none',
          });
        }
      }
    };
  }, []);

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to="/" aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to="/catalog">Каталог</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="/">Гарантии</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="/">Доставка</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="/">О компании</Link>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form>
            <label>
              <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-lens"></use>
              </svg>
              <input ref={inputRef} onChange={handlerInputChangeText} onFocus={handlerOnFocusInput} className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту"></input>
            </label>
            <ul className="form-search__select-list scroller" style={style}>
              {filteredCameras(camerasAll, value).map((camera) => <li key={camera.vendorCode} className="form-search__select-item"><Link to={`/catalog/camera/${camera.id}`}>{camera.name}</Link></li>)}
            </ul>
          </form>
          <button onClick={handlerClickResetSearchButton} style={styleButton} className="form-search__reset" type="reset">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg><span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link className="header__basket-link" to="/">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </Link>
      </div>
    </header>
  );
}

export default Header;

