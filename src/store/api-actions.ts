import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api, AppDispatch, Cameres, Promo, State } from '../types/camera';

export const fetchCameresAction = createAsyncThunk<Cameres, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: Api;
}>(
  'fetchCameres',
  async (_arg, {dispatch, extra: {api}}) => {
    const data = await api as unknown as Promise<Cameres>;
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
    const data = await apiPromo as Promo;
    return data;
  },
);
