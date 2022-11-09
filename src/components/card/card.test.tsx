import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createFakeCamera } from '../../store/mock-store-data';
import { BrowserRouter } from 'react-router-dom';
import Card from './card';

const mockStore = configureMockStore();

const store = mockStore({
  dataReducer: {
    cardsInBasket: [createFakeCamera(), createFakeCamera()],
  }
});

describe('Card component', () => {
  it('correctly render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card item={createFakeCamera()} isActive />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText('Подробнее');

    expect(linkElement).toBeInTheDocument();
  });
});
