import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createFakeCamera } from '../../store/mock-store-data';
import { BrowserRouter } from 'react-router-dom';
import Pagination from './pagination';

const mockStore = configureMockStore();

const mockPage = 1;
const mockstartSlice = 0;

const store = mockStore({
  serverReducer: {
    cameras: [createFakeCamera(), createFakeCamera()],
  },
  dataReducer:{
    camerasCatalog: [createFakeCamera(), createFakeCamera()],
    cardsInBasket: [createFakeCamera(), createFakeCamera()],
    catalogPage: mockPage,
    startSlice: mockstartSlice
  }
});

describe('Pagination component', () => {
  it('correctly render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination />
        </BrowserRouter>
      </Provider>
    );
    const pElement = screen.getByText(`${String(mockPage)}`);

    expect(pElement).toBeInTheDocument();
  });
});
