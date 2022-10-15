import { createSlice } from '@reduxjs/toolkit';

type CameraData = {
  catalogPage: number;
};

const initialState: CameraData = {
  catalogPage: 1,
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
    setCatalogPage : (state, action) => {
      state.catalogPage = action.payload as number;
    },
  },
});

export const {increaseCatalogPage, decreaseCatalogPage, setCatalogPage} = cameraData.actions;
