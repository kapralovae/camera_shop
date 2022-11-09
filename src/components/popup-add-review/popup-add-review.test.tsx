import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createFakeCamera } from '../../store/mock-store-data';
import { BrowserRouter } from 'react-router-dom';
import PopupAddReview from './popup-add-review';

const mockStore = configureMockStore();

const store = mockStore({
  dataReducer:{
    isActivePopupBasket: true,
    cardPopup: createFakeCamera(),
  }
});

describe('PopupAddReview component', () => {
  it('correctly render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PopupAddReview />
        </BrowserRouter>
      </Provider>
    );
    const pElement = screen.getByText('Оставить отзыв');

    expect(pElement).toBeInTheDocument();
  });
});
