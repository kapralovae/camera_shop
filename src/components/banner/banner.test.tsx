import { configureMockStore } from '@jedmao/redux-mock-store';
// import {render, screen} from '@testing-library/react';
// import Banner from './banner';
// import { Provider } from 'react-redux';
import { createPromoCamera } from '../../store/mock-store-data';
// import { BrowserRouter } from 'react-router-dom';

import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import Banner from './banner';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore();
const mockPromo = createPromoCamera();

const store = mockStore({
  promo: mockPromo,
});
// console.log(mockStore);
// describe('Banner component', () => {
//   it('correctly render', () => {

//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Banner />
//         </BrowserRouter>
//       </Provider>
//     );
//     const bannerMessage = screen.getByAltText('Новинка!');

//     expect(bannerMessage).toBeInTheDocument();
//   });
// });


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
