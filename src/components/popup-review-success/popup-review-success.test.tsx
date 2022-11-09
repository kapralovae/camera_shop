import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createFakeCamera } from '../../store/mock-store-data';
import { BrowserRouter } from 'react-router-dom';
import PopupReviewSuccess from './popup-review-success';

const mockStore = configureMockStore();

const store = mockStore({
  dataReducer:{
    isActivePopupBasket: true,
    cardPopup: createFakeCamera(),
  }
});

describe('PopupReviewSuccess component', () => {
  it('correctly render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PopupReviewSuccess />
        </BrowserRouter>
      </Provider>
    );
    const pElement = screen.getByText('Спасибо за отзыв');

    expect(pElement).toBeInTheDocument();
  });
});
