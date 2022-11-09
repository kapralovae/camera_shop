import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createFakeCamera } from '../../store/mock-store-data';
import { BrowserRouter } from 'react-router-dom';
import PopupAddInBasket from './popup-add-in-basket';

const mockStore = configureMockStore();

const store = mockStore({
  dataReducer:{
    isActivePopupBasket: true,
    cardPopup: createFakeCamera(),
  }
});

describe('PopupAddInBasket component', () => {
  it('correctly render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PopupAddInBasket />
        </BrowserRouter>
      </Provider>
    );
    const pElement = screen.getByText('Добавить товар в корзину');

    expect(pElement).toBeInTheDocument();
  });
});
