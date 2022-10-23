import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getPromo } from '../../store/camera-process/selecrots';

function Banner (): JSX.Element {
  const promo = useAppSelector(getPromo);
  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`/${promo.previewImgWebp}, /${promo.previewImgWebp2x}`}></source><img src={`/${promo.previewImg}`} srcSet={`/${promo.previewImg2x}`} width="1280" height="280" alt="баннер"></img>
      </picture>
      <p className="banner__info"><span className="banner__message">Новинка!</span><span className="title title--h1">{promo.name}</span><span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span><Link className="btn" to={`/catalog/camera/${promo.id}`}>Подробнее</Link></p>
    </div>
  );
}

export default Banner;
