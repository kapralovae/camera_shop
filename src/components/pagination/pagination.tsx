import { Link } from 'react-router-dom';

function Pagination () {
  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item"><Link className="pagination__link pagination__link--active" to="/">1</Link>
        </li>
        <li className="pagination__item"><Link className="pagination__link" to="/">2</Link>
        </li>
        <li className="pagination__item"><Link className="pagination__link" to="/">3</Link>
        </li>
        <li className="pagination__item"><Link className="pagination__link pagination__link--text" to="/">Далее</Link>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
