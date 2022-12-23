import { CamerasProsecc, Camera, Promo } from '../../types/camera';
import { fetchCameraAction, fetchCamerasAction, fetchCommentsCameraAction, fetchPromoAction, fetchSimilarCamerasAction } from '../api-actions';
import { createComment, createFakeCamera, createPromoCamera } from '../mock-store-data';
import { cameraProcess } from './camera-process';

describe('Reducer: cameraProcess', () => {
  const state : CamerasProsecc = {
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

  const fakeCamera: Camera = createFakeCamera();
  const promoCamera: Promo = createPromoCamera();
  const cameras = [createFakeCamera(), createFakeCamera(),createFakeCamera()];
  const comments = [createComment(), createComment()];

  describe('fetchPromoAction', () => {
    it('fetchPromoAction fullfilled', () => {
      expect(cameraProcess.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: promoCamera}))
        .toEqual({
          ...state,
          promo: promoCamera,
          isDataLoad: false,
        });
    });

    it('fetchPromoAction pending', () => {
      expect(cameraProcess.reducer(state, {type: fetchPromoAction.pending.type}))
        .toEqual({
          ...state,
          isDataLoad: true,
        });
    });

  });

  describe('fetchCameraAction', () => {
    it('fetchCameraAction fulfilled', () => {
      expect(cameraProcess.reducer(state, {type: fetchCameraAction.fulfilled.type, payload: fakeCamera}))
        .toEqual({
          ...state,
          camera: fakeCamera,
          isDataLoad: false,
        });
    });

    it('fetchCameraAction pending', () => {
      expect(cameraProcess.reducer(state, {type: fetchCameraAction.pending.type}))
        .toEqual({
          ...state,
          isDataLoad: true,
        });
    });
  });

  describe('fetchCamerasAction', () => {
    it('fetchCamerasAction fulfilled', () => {
      expect(cameraProcess.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: cameras}))
        .toEqual({
          ...state,
          cameras: cameras,
          isDataLoad: false,
        });
    });

    it('fetchCamerasAction pending', () => {
      expect(cameraProcess.reducer(state, {type: fetchCamerasAction.pending.type}))
        .toEqual({
          ...state,
          isDataLoad: true,
        });
    });
  });

  describe('fetchSimilarCamerasAction', () => {
    it('fetchCamerasAction fulfilled', () => {
      expect(cameraProcess.reducer(state, {type: fetchSimilarCamerasAction.fulfilled.type, payload: cameras}))
        .toEqual({
          ...state,
          similarCameras: cameras,
          isDataLoad: false,
        });
    });

    it('fetchCamerasAction pending', () => {
      expect(cameraProcess.reducer(state, {type: fetchSimilarCamerasAction.pending.type}))
        .toEqual({
          ...state,
          isDataLoad: true,
        });
    });
  });

  describe('fetchCommentsCameraAction', () => {
    it('fetchCommentsCameraAction fulfilled', () => {
      expect(cameraProcess.reducer(state, {type: fetchCommentsCameraAction.fulfilled.type, payload: comments}))
        .toEqual({
          ...state,
          comments: comments,
          isDataLoad: false,
        });
    });

    it('fetchCommentsCameraAction pending', () => {
      expect(cameraProcess.reducer(state, {type: fetchCommentsCameraAction.pending.type}))
        .toEqual({
          ...state,
          isDataLoad: true,
        });
    });
  });
});
