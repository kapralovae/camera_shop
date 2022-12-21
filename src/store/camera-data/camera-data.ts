import { createSlice } from '@reduxjs/toolkit';
import { Camera, CameraData, Cameras, Count } from '../../types/camera';

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
  isBasketSuccess: false,
  sliceStart: 0,
  isAddReview: false,
  isActivePopupReview: false,
  sortType: 'sortPrice',
  sortDirection: 'up',
  isSort: false,
  sortCards: [],
  camerasForRender: [],
  countCamerasInBasket: 0,
  camerasInBasket: {},
  isActivePopupDeleteCamera: false,
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
    setCamerasForRender: (state, action) => {
      state.camerasForRender = action.payload as Cameras;
    },
    setCamerasCatalog: (state, action) => {
      state.camerasCatalog = action.payload as Cameras;
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
    setCamerasInBasket: (state, action) => {
      const {id} = action.payload as Camera;
      if (state.camerasInBasket[id] === undefined) {
        state.camerasInBasket[`${id}`] = {
          camera: action.payload as Camera,
          count: 1,
        };
      } else {
        state.camerasInBasket[`${id}`].count += 1;
      }
      state.countCamerasInBasket += 1;
    },
    setCountCamerasInBasket: (state, action) => {
      const {id, countItem, doing} = action.payload as Count;
      state.camerasInBasket[`${id}`] = {
        ...state.camerasInBasket[`${id}`],
        count: countItem,
      };

      switch (doing) {
        case 'plus':
          state.countCamerasInBasket += 1;
          break;
        case 'minus':
          state.countCamerasInBasket -= 1;
          break;
        case '':
          break;
      }
    },
    setIsActivePopupDeleteCamera: (state, action) => {
      state.isActivePopupDeleteCamera = action.payload as boolean;
    },
    deleteCameraInBasket: (state, action) => {
      const {id} = action.payload as Camera;
      state.countCamerasInBasket -= state.camerasInBasket[`${id}`].count;
      delete state.camerasInBasket[`${id}`];
    },
  },
});

export const {increaseCatalogPage, decreaseCatalogPage, setCatalogPage, changeStatusPopup, changeCardPopup, setStartSlice, setCountSlice, setCamerasCatalog, changeIsBasketSuccess, setIsAddReview, setIsActivePopupReview, setSortType, setSortDirection, setIsSort, setSortCards, setCamerasForRender, setCountCamerasInBasket, setCamerasInBasket, setIsActivePopupDeleteCamera, deleteCameraInBasket} = cameraData.actions;
