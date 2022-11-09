import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createFakeCamera } from '../../store/mock-store-data';
import { BrowserRouter } from 'react-router-dom';
import CatalogContent from './catalog-content';

const mockStore = configureMockStore();

const cards = [createFakeCamera(), createFakeCamera()];

const store = mockStore({
  serverReducer: {
    cameras: [createFakeCamera(), createFakeCamera()],
  },
  dataReducer:{
    camerasCatalog: [createFakeCamera(), createFakeCamera()],
    cardsInBasket: cards,
  }
});

describe('CatalogContent component', () => {
  it('correctly render', () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CatalogContent />
        </BrowserRouter>
      </Provider>
    );
    const testElement = screen.getByTestId('testid');

    expect(testElement).toHaveClass('catalog__content');
  });
});
