import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, Promo, State } from '../types/camera';

export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: any;
}>(
  'fetchPromo',
  async (_arg, {dispatch, extra: {apiPromo}}) => {
    const data = await apiPromo as Promo;
    return data;
  },
);
