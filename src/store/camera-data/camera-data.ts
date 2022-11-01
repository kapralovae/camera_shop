import { createSlice } from '@reduxjs/toolkit';
import { Camera, CameraData, Cameras } from '../../types/camera';

const initialState: CameraData = {
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
  cardsInBasket: [],
  isBasketSuccess: false,
  sliceStart: 0,
  isAddReview: false,
  isActivePopupReview: false,
};

export const cameraData = createSlice({
  name: 'Data',
  initialState,
  reducers: {
    increaseCatalogPage: (state , action) => {
      state.catalogPage = action.payload as number;
    },
    decreaseCatalogPage: (state, action) => {
      state.catalogPage = action.payload as number;
    },
    setCatalogPage: (state, action) => {
      state.catalogPage = action.payload as number;
    },
    changeStatusPopup: (state, action) => {
      state.isActivePopupBasket = action.payload as boolean;
    },
    changeCardPopup: (state, action) => {
      state.cardPopup = action.payload as Camera;
    },
    setStartSlice: (state, action) => {
      state.startSlice = action.payload as number;
    },
    setCountSlice: (state, action) => {
      state.countSlice = action.payload as number;
    },
    setCamerasCatalog: (state, action) => {
      state.camerasCatalog = action.payload as Camera[];
    },
    addCardInBasket: (state, action) => {
      const camera = action.payload as Camera;
      state.cardsInBasket.push(camera) as unknown as Cameras;
    },
    deleteCardInBasket: (state, action) => {
      state.cardsInBasket = state.cardsInBasket.filter((card) => card.id !== action.payload as number);
    },
    changeIsBasketSuccess: (state, action) => {
      state.isBasketSuccess = action.payload as boolean;
    },
    setIsAddReview: (state, action) => {
      state.isAddReview = action.payload as boolean;
    },
    setIsActivePopupReview: (state, action) => {
      state.isActivePopupReview = action.payload as boolean;
    },

  },
});

export const {increaseCatalogPage, decreaseCatalogPage, setCatalogPage, changeStatusPopup, changeCardPopup, setStartSlice, setCountSlice, setCamerasCatalog, addCardInBasket, deleteCardInBasket, changeIsBasketSuccess, setIsAddReview, setIsActivePopupReview} = cameraData.actions;
