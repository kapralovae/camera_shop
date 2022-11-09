import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createFakeCamera } from '../../store/mock-store-data';
import { BrowserRouter } from 'react-router-dom';
import ModalAddItem from './modal-add-item';

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

describe('ModalAddItem component', () => {
  it('correctly render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ModalAddItem />
        </BrowserRouter>
      </Provider>
    );
    const pElement = screen.getByText('Добавить товар в корзину');

    expect(pElement).toBeInTheDocument();
  });
});
