// import { configureMockStore } from '@jedmao/redux-mock-store';
// import {render, screen} from '@testing-library/react';

// import { Provider } from 'react-redux';
// import { createFakeCamera } from '../../store/mock-store-data';
// import { BrowserRouter } from 'react-router-dom';
// import Breadcrump from './breadcrump';

// const mockStore = configureMockStore();


// const store = mockStore({
//   cameras: [createFakeCamera(), createFakeCamera()],
// });


// describe('Breadcrump component', () => {
//   it('correctly render', () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Breadcrump />
//         </BrowserRouter>
//       </Provider>
//     );
//     const linkElement = screen.getByAltText('Каталог');

//     expect(linkElement).toBeInTheDocument();
//   });
// });
