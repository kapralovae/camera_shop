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
  sortType: 'sortPrice',
  sortDirection: 'up',
  isSort: false,
  sortCards: [],
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
    setSortType: (state, action) => {
      state.sortType = action.payload as string;
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload as string;
    },
    setIsSort: (state, action) => {
      state.isSort = action.payload as boolean;
    },
    setSortCards: (state, action) => {
      const cards = action.payload as Cameras;
      state.sortCards = Array.from(cards);
      switch (state.sortType) {
        case 'sortPrice':
          if (state.sortDirection === 'up') {
            state.sortCards.sort((a, b) => a.price - b.price);
            state.camerasCatalog = state.sortCards.slice(0, 9);
          }

          if (state.sortDirection === 'down') {
            state.sortCards.sort((a, b) => b.price - a.price);
            state.camerasCatalog = state.sortCards.slice(0, 9);
          }
          break;

        case 'sortPopular':
          if (state.sortDirection === 'up') {
            state.sortCards.sort((a, b) => a.rating - b.rating);
            state.camerasCatalog = state.sortCards.slice(0, 9);
          }

          if (state.sortDirection === 'down') {
            state.sortCards.sort((a, b) => b.rating - a.rating);
            state.camerasCatalog = state.sortCards.slice(0, 9);
          }
          break;
      }
    },
  },
});

export const {increaseCatalogPage, decreaseCatalogPage, setCatalogPage, changeStatusPopup, changeCardPopup, setStartSlice, setCountSlice, setCamerasCatalog, addCardInBasket, deleteCardInBasket, changeIsBasketSuccess, setIsAddReview, setIsActivePopupReview, setSortType, setSortDirection, setIsSort, setSortCards} = cameraData.actions;
