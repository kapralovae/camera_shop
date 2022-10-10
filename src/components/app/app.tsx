import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Catalog from '../../pages/catalog/catalog';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Catalog />}
        />

        <Route
          path='/catalog'
          element={<Catalog />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
