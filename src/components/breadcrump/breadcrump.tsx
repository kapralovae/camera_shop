import { Link, useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/camera-process/selecrots';

function Breadcrump () {

  const id = useParams().id;
  const location = useLocation();
  const cards = useAppSelector(getCameras);
  const card = cards.find((item) => item.id === Number(id));

  const createWay = () => {
    if (card !== undefined || (id && location.pathname === `/catalog/camera/${id}`)) {
      return(
        <>
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to="/">Каталог
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>

          </li>
          <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{card?.name}</span></li>
        </>
      );
    } else if (location.pathname === '/basket') {
      return(
        <>
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to="/">Каталог
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span></li>
        </>
      );
    } else {
      return(
        <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span></li>
      );
    }
  };

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to="/">Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          {createWay()}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrump;
