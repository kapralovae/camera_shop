import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api, AppDispatch, Camera, Cameras, Comment, Coupon, OrderPost, Promo, Review, State } from '../types/camera';
import { setBorderInput, setCamerasCatalog, setDiscount, setIsActivePopupSuccessBasket, setOpacityAccept, setOpacityError } from './camera-data/camera-data';

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

export const addComment = createAsyncThunk<void, Review, {
  dispatch: AppDispatch;
  state: State;
  extra: Api;
}>(
  'postComment',
  async (data, {dispatch, extra: api}) => {
    await fetch('https://camera-shop.accelerator.pages.academy/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    });
    dispatch(fetchCommentsCameraAction(String(data.cameraId)));
  },
);

export const postCoupon = createAsyncThunk<void, Coupon, {
  dispatch: AppDispatch;
  state: State;
  extra: Api;
}>(
  'postCoupon',
  async (data, {dispatch, extra: api}) => {
    const promise = fetch('https://camera-shop.accelerator.pages.academy/coupons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    });
    const response = await promise;

    if (response.ok) {
      const json = await response.json() as Coupon;
      dispatch(setDiscount({
        discound: json,
        promocode: data.coupon,
      }));
      dispatch(setBorderInput('2px solid #65cd54'));
      dispatch(setOpacityAccept(1));
      dispatch(setOpacityError(0));
    } else {
      dispatch(setDiscount({
        discound: 1,
        promocode: null,
      }));
      dispatch(setBorderInput('2px solid #ed6041'));
      dispatch(setOpacityAccept(0));
      dispatch(setOpacityError(1));
    }
  },
);

export const postOrder = createAsyncThunk<void, OrderPost, {
  dispatch: AppDispatch;
  state: State;
  extra: Api;
}>(
  'postOrder',
  async (data, {dispatch, extra: api}) => {
    const promise = fetch('https://camera-shop.accelerator.pages.academy/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    });

    const response = await promise;

    if (response.ok) {
      dispatch(setIsActivePopupSuccessBasket(true));
    }
  },
);
