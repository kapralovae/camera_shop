import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createFakeCamera } from '../../store/mock-store-data';
import { BrowserRouter } from 'react-router-dom';
import Catalog from './catalog';

const mockStore = configureMockStore();

const store = mockStore({
  serverReducer: {
    cameras: [createFakeCamera(), createFakeCamera()],
  },
  dataReducer:{
    camerasCatalog: [createFakeCamera(), createFakeCamera()],
    cardsInBasket: [createFakeCamera(), createFakeCamera()],
  }
});

describe('Catalog component', () => {
  it('correctly render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Catalog />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText('Каталог фото- и видеотехники');

    expect(linkElement).toBeInTheDocument();
  });
});
