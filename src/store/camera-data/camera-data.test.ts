import faker from 'faker';
import { Camera, CameraData } from '../../types/camera';
import { createFakeCamera } from '../mock-store-data';
import { cameraData, changeCardPopup, changeIsBasketSuccess, changeStatusPopup, deleteCameraInBasket, increaseCatalogPage, setCamerasCatalog, setCamerasInBasket, setCountSlice, setIsActivePopupReview, setIsAddReview, setStartSlice } from './camera-data';

describe('Reducer: cameraData', () => {

  const state: CameraData = {
    catalogPage: 1,
    isActivePopupBasket: false,
    cardPopup: {
      id: 1,
      name: '',
      vendorCode: '',
      type: '',
      category: '',
      description: '',
      level: '',
      rating: 1,
      price: 1,
      previewImg: '',
      previewImg2x: '',
      previewImgWebp: '',
      previewImgWebp2x: '',
      reviewCount: 1,
    },
    startSlice: 0,
    countSlice: 9,
    camerasCatalog: [],
    isBasketSuccess: false,
    sliceStart: 0,
    isAddReview: false,
    isActivePopupReview: false,
    sortType: 'price',
    sortDirection: 'up',
    isSort: false,
    sortCards: [],
    camerasForRender: [],
    countCamerasInBasket: 0,
    camerasInBasket: {},
    isActivePopupDeleteCamera: false,
    summaryPrice: 0,
    isDiscount: false,
    discount: 1,
    borderInput: {
      border: '2px solid #b4b4d7',
    },
    opacityError: {
      opacity: 0,
    },
    opacityAccept: {
      opacity: 0,
    },
    orderPost: {
      camerasIds: [],
      coupon: null,
    },
    isActivePopupSuccessBasket: false,
  };

  beforeAll(() => {
    state.camerasInBasket = {};
  });

  const fakeNumber = faker.random.alphaNumeric();
  const fakeCamera: Camera = createFakeCamera();
  const cameres = [createFakeCamera(), createFakeCamera(),createFakeCamera()];

  it('without parametrs', () => {
    expect(cameraData.reducer(undefined, {type: 'UNKNOW_ACTION'}))
      .toEqual(state);
  });

  it('increaseCatalogPage', () => {

    expect(cameraData.reducer(state, increaseCatalogPage(2)))
      .toEqual({
        ...state,
        catalogPage : 2,
      });
    expect(cameraData.reducer(state, increaseCatalogPage(5)))
      .toEqual({
        ...state,
        catalogPage : 5,
      });
  });

  it('changeStatusPopup', () => {

    expect(cameraData.reducer(state, changeStatusPopup(true)))
      .toEqual({
        ...state,
        isActivePopupBasket : true,
      });

    expect(cameraData.reducer(state, changeStatusPopup(false)))
      .toEqual({
        ...state,
        isActivePopupBasket : false,
      });
  });

  it('changeCardPopup', () => {
    expect(cameraData.reducer(state, changeCardPopup(fakeCamera)))
      .toEqual({
        ...state,
        cardPopup: fakeCamera,
      });
  });

  it('setStartSlice', () => {
    expect(cameraData.reducer(state, setStartSlice(fakeNumber)))
      .toEqual({
        ...state,
        startSlice: fakeNumber,
      });
  });

  it('setCountSlice', () => {
    expect(cameraData.reducer(state, setCountSlice(fakeNumber)))
      .toEqual({
        ...state,
        countSlice: fakeNumber,
      });
  });

  it ('setCamerasCatalog', () => {
    expect(cameraData.reducer(state, setCamerasCatalog(cameres)))
      .toEqual({
        ...state,
        camerasCatalog: cameres,
      });
  });

  it('addCardInBasket', () => {
    const fakeCamer: Camera = createFakeCamera();

    expect(cameraData.reducer(state, setCamerasInBasket(fakeCamer)))
      .toEqual({
        ...state,
        cardsInBasket: [fakeCamer],
      });
  });

  it('deleteCardInBasket', () => {

    expect(cameraData.reducer(state, deleteCameraInBasket(fakeCamera)))
      .toEqual({
        ...state,
        cardsInBasket: [],
      });
  });

  it('changeIsBasketSuccess', () => {

    expect(cameraData.reducer(state, changeIsBasketSuccess(true)))
      .toEqual({
        ...state,
        isBasketSuccess: true,
      });

    expect(cameraData.reducer(state, changeIsBasketSuccess(false)))
      .toEqual({
        ...state,
        isBasketSuccess: false,
      });
  });

  it('setIsAddReview', () => {

    expect(cameraData.reducer(state, setIsAddReview(true)))
      .toEqual({
        ...state,
        isAddReview: true,
      });

    expect(cameraData.reducer(state, setIsAddReview(false)))
      .toEqual({
        ...state,
        isAddReview: false,
      });
  });

  it('setIsActivePopupReview', () => {

    expect(cameraData.reducer(state, setIsActivePopupReview(true)))
      .toEqual({
        ...state,
        isActivePopupReview: true,
      });

    expect(cameraData.reducer(state, setIsActivePopupReview(false)))
      .toEqual({
        ...state,
        isActivePopupReview: false,
      });
  });
});
