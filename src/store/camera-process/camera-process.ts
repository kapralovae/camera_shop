import { createSlice } from '@reduxjs/toolkit';
import { Cameres, Promo } from '../../types/camera';
import { fetchCameresAction, fetchPromoAction } from '../api-actions';

type CameresProsecc = {
  cameres: Cameres;
  promo: Promo;
  isDataLoad: boolean;
};

const initialState : CameresProsecc = {
  cameres: [],
  promo: {
    id: 7,
    name: 'Look 54',
    previewImg: 'img/content/promo.jpg',
    previewImg2x: 'img/content/promo@2x.jpg',
    previewImgWebp: 'img/content/promo.webp',
    previewImgWebp2x: 'img/content/promo@2x.webp'
  },
  isDataLoad: false,
};

export const cameraProcess = createSlice({
  name: 'Process',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.fulfilled, (state, actions) => {
        state.promo = actions.payload;
        state.isDataLoad = false;
      })
      .addCase(fetchPromoAction.pending, (state, actions) => {
        state.isDataLoad = true;
      })
      .addCase(fetchCameresAction.fulfilled, (state, action) => {
        state.cameres = action.payload;
        state.isDataLoad = false;
      })
      .addCase(fetchCameresAction.pending, (state, action) => {
        state.isDataLoad = true;
      });
  },
});
