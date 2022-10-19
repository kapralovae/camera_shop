import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api, AppDispatch, Camera, Cameras, Promo, State } from '../types/camera';
import { setCamerasCatalog } from './camera-data/camera-data';

export const fetchCamerasAction = createAsyncThunk<Cameras, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: Api;
}>(
  'fetchCameras',
  async (_arg, {dispatch, extra: {api}}) => {
    const data = await api('https://camera-shop.accelerator.pages.academy/cameras', 'Cameras') as unknown as Promise<Cameras>;

    dispatch(setCamerasCatalog(data));
    return data;
  },
);

export const fetchCameraAction = createAsyncThunk<Camera, string, {
  dispatch: AppDispatch;
  state: State;
  extra: Api;
}>(
  'fetchCamera',
  async (id, {dispatch, extra: {api}}) => {
    const data = await api(`https://camera-shop.accelerator.pages.academy/cameras/${id}`, 'Camera') as unknown as Camera;
    console.log(data);
    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: Api;
}>(
  'fetchPromo',
  async (_arg, {dispatch, extra: {api}}) => {
    const data = api('https://camera-shop.accelerator.pages.academy/promo', 'Camera') as unknown as Promise<Promo>;
    return data;
  },
);
