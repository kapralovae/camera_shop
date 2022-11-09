import { configureMockStore } from '@jedmao/redux-mock-store';
import { createPromoCamera } from '../../store/mock-store-data';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import Banner from './banner';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore();
const mockPromo = createPromoCamera();

const store = mockStore({
  serverReducer: {
    promo: mockPromo,
  }
});

describe('Component: Banner', () => {
  it('render correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Banner />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Новинка!')).toBeInTheDocument();
  });
});
