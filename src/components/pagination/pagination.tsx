import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { COUNT_CARDS_ON_PAGE } from '../../const';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { decreaseCatalogPage, increaseCatalogPage, setCamerasCatalog, setCatalogPage, setStartSlice } from '../../store/camera-data/camera-data';
import { getCatalogPage, getIsSort, getSortCards, getStartSlice } from '../../store/camera-data/selectors';
import { getCameras } from '../../store/camera-process/selecrots';

function Pagination () {
  const dispatch = useAppDisptach();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(setCatalogPage(Number(id)));
    }
  }, [dispatch, id]);
  const catalogPage = useAppSelector(getCatalogPage);
  const allCards = useAppSelector(getCameras);
  const startSlice = useAppSelector(getStartSlice);
  const countPage = Math.ceil(allCards.length / COUNT_CARDS_ON_PAGE);
  const isSort = useAppSelector(getIsSort);
  const sortCards = useAppSelector(getSortCards);

  const handleLiNextpageClick = () => {
    dispatch(increaseCatalogPage(catalogPage + 1));
    dispatch(setStartSlice(startSlice + COUNT_CARDS_ON_PAGE));
    dispatch(setCamerasCatalog((isSort ? sortCards : allCards).slice(startSlice + COUNT_CARDS_ON_PAGE, startSlice + 2 * COUNT_CARDS_ON_PAGE)));
  };
  const handleLiBackpageClick = () => {
    dispatch(decreaseCatalogPage(catalogPage - 1));
    dispatch(setStartSlice(startSlice - COUNT_CARDS_ON_PAGE));
    dispatch(setCamerasCatalog((isSort ? sortCards : allCards).slice(startSlice - COUNT_CARDS_ON_PAGE, startSlice)));
  };
  const handleLiClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    dispatch(setCatalogPage(Number(evt.currentTarget.text)));
    dispatch(setStartSlice( Number(evt.currentTarget.text) === 1 ? 0 : (Number(evt.currentTarget.text) - 1) * (COUNT_CARDS_ON_PAGE)));
    dispatch(setCamerasCatalog((isSort ? sortCards : allCards).slice(Number(evt.currentTarget.text) === 1 ? 0 : (Number(evt.currentTarget.text) - 1) * COUNT_CARDS_ON_PAGE, Number(evt.currentTarget.text) * COUNT_CARDS_ON_PAGE)));
  };

  const paginationItemPages = (numberPage: number) => {
    const paginationItems = [];
    for (let i = 1; i <= countPage; i++) {
      paginationItems.push(<li key={`${i}abc`} className="pagination__item"><Link onClick={handleLiClick} className={numberPage === i ? 'pagination__link pagination__link--active' : 'pagination__link'} to={`/catalog/page/${i}`}>{i}</Link></li>);
    }
    return paginationItems;
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li onClick={handleLiBackpageClick} className="pagination__item"><Link className={catalogPage === 1 ? 'visually-hidden' : 'pagination__link pagination__link--text'} to={`/catalog/page/${catalogPage - 1}`}>Назад</Link>
        </li>
        {paginationItemPages(catalogPage).map((item) => item)}
        <li onClick={handleLiNextpageClick} className="pagination__item"><Link className={catalogPage === countPage ? 'visually-hidden' : 'pagination__link pagination__link--text'} to={`/catalog/page/${catalogPage + 1}`}>Далее</Link>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
