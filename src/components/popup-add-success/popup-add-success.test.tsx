import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createFakeCamera } from '../../store/mock-store-data';
import { BrowserRouter } from 'react-router-dom';
import PopupAddSuccess from './popup-add-success';

const mockStore = configureMockStore();

const store = mockStore({
  dataReducer:{
    isActivePopupBasket: true,
    cardPopup: createFakeCamera(),
  }
});

describe('PopupAddSuccess component', () => {
  it('correctly render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PopupAddSuccess />
        </BrowserRouter>
      </Provider>
    );
    const pElement = screen.getByText('Товар успешно добавлен в корзину');

    expect(pElement).toBeInTheDocument();
  });
});
