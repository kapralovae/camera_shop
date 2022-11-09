import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import CardPage from '../../pages/card-page/card-page';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import { getIsDataLoad } from '../../store/camera-process/selecrots';
import NotFound from '../not-found/not-found';
import SpinerLoading from '../spinner-loading/spinner-loading';

function App(): JSX.Element {
  const isDataLoaded = useAppSelector(getIsDataLoad);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={ isDataLoaded ? <SpinerLoading /> : <CatalogPage />}
        />

        <Route
          path='/catalog/page/:id'
          element={<CatalogPage />}
        />

        <Route
          path='/catalog/camera/:id'
          element={<CardPage />}
        />

        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
