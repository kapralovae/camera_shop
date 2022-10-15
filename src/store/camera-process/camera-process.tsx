import { createSlice } from '@reduxjs/toolkit';
import { Cameras, Promo } from '../../types/camera';
import { fetchPromoAction } from '../api-actions';

type CameresProsecc = {
  cameres: Cameras;
  promo: Promo;
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
};

export const cameraProcess = createSlice({
  name: 'Process',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.fulfilled, (state, actions) => {
        state.promo = actions.payload;
      });
  },
});
