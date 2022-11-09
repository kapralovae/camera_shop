import { configureMockStore } from '@jedmao/redux-mock-store';
import {render} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import SpinerLoading from './spinner-loading';

const mockStore = configureMockStore();

const mockIsLoader = true;

const store = mockStore({
  serverReducer:{
    getIsDataLoad: mockIsLoader,
  }
});

describe('PopupReviewSuccess component', () => {
  it('correctly render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SpinerLoading />
        </BrowserRouter>
      </Provider>
    );

    expect(mockIsLoader).toEqual(true);
  });
});


