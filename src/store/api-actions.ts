import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api, AppDispatch, Camera, Cameras, Comment, Promo, State } from '../types/camera';
import { setCamerasCatalog } from './camera-data/camera-data';

export const fetchCamerasAction = createAsyncThunk<Cameras, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: Api;
}>(
  'fetchCameras',
  async (_arg, {dispatch, extra: {api}}) => {
    const data = await api as unknown as Promise<Cameras>;
    dispatch(setCamerasCatalog((await data).slice(0, 9)));
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
    const data = (await fetch(`https://camera-shop.accelerator.pages.academy/cameras/${id}`)).json() as unknown as Promise<Camera>;
    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: Api;
}>(
  'fetchPromo',
  async (_arg, {dispatch, extra: {apiPromo}}) => {
    const data = await apiPromo as unknown as Promise<Promo>;
    return data;
  },
);

export const fetchSimilarCamerasAction = createAsyncThunk<Cameras, string, {
  dispatch: AppDispatch;
  state: State;
  extra: Api;
}>(
  'fetchSimilarCameras',
  async (id, {dispatch, extra: {api}}) => {
    const data = (await fetch(`https://camera-shop.accelerator.pages.academy/cameras/${id}/similar`)).json() as unknown as Promise<Cameras>;
    return data;
  },
);

export const fetchCommentsCameraAction = createAsyncThunk<Comment[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: Api;
}>(
  'fetchCommentsCamera',
  async (id, {dispatch, extra: {api}}) => {
    const data = (await fetch(`https://camera-shop.accelerator.pages.academy/cameras/${id}/reviews`)).json() as unknown as Promise<Comment[]>;
    return data;
  },
);
