import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createFakeCamera } from '../../store/mock-store-data';
import { BrowserRouter } from 'react-router-dom';
import PopupProductBasketSuccess from './popup-product-basket-success';

const mockStore = configureMockStore();

const store = mockStore({
  dataReducer:{
    isActivePopupBasket: true,
    cardPopup: createFakeCamera(),
  }
});

describe('PopupProductBasketSuccess component', () => {
  it('correctly render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PopupProductBasketSuccess />
        </BrowserRouter>
      </Provider>
    );
    const pElement = screen.getByText('Спасибо за покупку');

    expect(pElement).toBeInTheDocument();
  });
});
