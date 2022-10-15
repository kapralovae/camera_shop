import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CatalogPage from '../../pages/catalog-page/catalog-page';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<CatalogPage />}
        />

        <Route
          path='/catalog'
          element={<CatalogPage />}
        />

        <Route
          path='/catalog/camera/:id'
          element={<CatalogPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
