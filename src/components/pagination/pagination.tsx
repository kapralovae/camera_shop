import React from 'react';
import { Link } from 'react-router-dom';
import { COUNT_CARDS_ON_PAGE, getNumberPage } from '../../const';
import { useAppDisptach, useAppSelector } from '../../hooks';
import { decreaseCatalogPage, increaseCatalogPage, setCatalogPage } from '../../store/camera-data/camera-data';
import { getCatalogPage } from '../../store/camera-data/selectors';
import { getCameres } from '../../store/camera-process/selecrots';

function Pagination () {
  const dispatch = useAppDisptach();
  const catalogPage = useAppSelector(getCatalogPage);
  const countCard = useAppSelector(getCameres).length;
  const countPage = Math.ceil(countCard / COUNT_CARDS_ON_PAGE);
  const pagination = getNumberPage(catalogPage, countPage);

  const handleLiNextpageClick = () => {
    dispatch(increaseCatalogPage(catalogPage + 1));
  };
  const handleLiBackpageClick = () => {
    dispatch(decreaseCatalogPage(catalogPage - 1));
  };
  const handleLiClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    dispatch(setCatalogPage(Number(evt.currentTarget.text)));
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li onClick={handleLiBackpageClick} className="pagination__item"><Link className={catalogPage === 1 ? 'visually-hidden' : 'pagination__link pagination__link--text'} to={`/catalog/page/${catalogPage - 1}`}>Назад</Link>
        </li>
        <li className="pagination__item"><Link onClick={handleLiClick} className={catalogPage === 1 ? 'pagination__link pagination__link--active' : 'pagination__link'} to={`/catalog/page/${pagination ? pagination[0] : 1}`}>{pagination ? pagination[0] : 1}</Link>
        </li>
        <li className="pagination__item"><Link onClick={handleLiClick} className={(catalogPage > 1 && catalogPage <= countPage - 1) ? 'pagination__link pagination__link--active' : 'pagination__link'} to={`/catalog/page/${pagination ? pagination[1] : 2}`}>{pagination ? pagination[1] : 2}</Link>
        </li>
        <li className="pagination__item"><Link onClick={handleLiClick} className={catalogPage === countPage ? 'pagination__link pagination__link--active' : 'pagination__link'} to={`/catalog/page/${pagination ? pagination[2] : 3}`}>{pagination ? pagination[2] : 3}</Link>
        </li>
        <li onClick={handleLiNextpageClick} className="pagination__item"><Link className={catalogPage === countPage ? 'visually-hidden' : 'pagination__link pagination__link--text'} to={`/catalog/page/${catalogPage + 1}`}>Далее</Link>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
