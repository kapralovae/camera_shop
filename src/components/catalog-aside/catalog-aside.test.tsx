import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createFakeCamera } from '../../store/mock-store-data';
import { BrowserRouter } from 'react-router-dom';
import CatalogAside from './catalog-aside';

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

describe('CatalogAside component', () => {
  it('correctly render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CatalogAside />
        </BrowserRouter>
      </Provider>
    );
    const legendElement = screen.getByText('Категория');

    expect(legendElement).toBeInTheDocument();
  });
});
