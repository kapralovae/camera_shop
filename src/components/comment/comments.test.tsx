import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createComment, createFakeCamera } from '../../store/mock-store-data';
import { BrowserRouter } from 'react-router-dom';
import CommentCard from './comments';

const mockStore = configureMockStore();

const comment = createComment();

const store = mockStore({
  serverReducer: {
    cameras: [createFakeCamera(), createFakeCamera()],
  },
  dataReducer:{
    camerasCatalog: [createFakeCamera(), createFakeCamera()],
    cardsInBasket: [createFakeCamera(), createFakeCamera()],
  }
});

describe('CommentCard component', () => {
  it('correctly render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommentCard item={comment} />
        </BrowserRouter>
      </Provider>
    );
    const pElement = screen.getByText(comment.userName);

    expect(pElement).toBeInTheDocument();
  });
});
