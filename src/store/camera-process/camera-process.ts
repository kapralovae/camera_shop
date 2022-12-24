import { createSlice } from '@reduxjs/toolkit';
import { CamerasProsecc} from '../../types/camera';
import { addComment, fetchCameraAction, fetchCamerasAction, fetchCommentsCameraAction, fetchPromoAction, fetchSimilarCamerasAction, postCoupon } from '../api-actions';


const initialState : CamerasProsecc = {
  cameras: [],
  camera: {
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
  promo: {
    id: 7,
    name: 'Look 54',
    previewImg: 'img/content/promo.jpg',
    previewImg2x: 'img/content/promo@2x.jpg',
    previewImgWebp: 'img/content/promo.webp',
    previewImgWebp2x: 'img/content/promo@2x.webp'
  },
  isDataLoad: false,
  similarCameras: [],
  comments: [],
  couponPost: {
    coupon: null,
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
        state.isDataLoad = false;
      })
      .addCase(fetchPromoAction.pending, (state, actions) => {
        state.isDataLoad = true;
      })
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.isDataLoad = false;
      })
      .addCase(fetchCameraAction.pending, (state, action) => {
        state.isDataLoad = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isDataLoad = false;
      })
      .addCase(fetchCamerasAction.pending, (state, action) => {
        state.isDataLoad = true;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
        state.isDataLoad = false;
      })
      .addCase(fetchSimilarCamerasAction.pending, (state, action) => {
        state.isDataLoad = true;
      })
      .addCase(fetchCommentsCameraAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isDataLoad = false;
      })
      .addCase(fetchCommentsCameraAction.pending, (state, action) => {
        state.isDataLoad = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isDataLoad = false;
      })
      .addCase(addComment.pending, (state, action) => {
        state.isDataLoad = true;
      })
      .addCase(postCoupon.fulfilled, (state, action) => {
        state.isDataLoad = false;
      })
      .addCase(postCoupon.pending, (state, action) => {
        state.isDataLoad = true;
      });
  },
});
