import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createFakeCamera } from '../../store/mock-store-data';
import { BrowserRouter } from 'react-router-dom';
import Footer from './footer';

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

describe('Footer component', () => {
  it('correctly render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </Provider>
    );
    const pElement = screen.getByText('Интернет-магазин фото- и видеотехники');

    expect(pElement).toBeInTheDocument();
  });
});
