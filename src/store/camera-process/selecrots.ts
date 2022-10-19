import { Camera, Cameras, Promo, State } from '../../types/camera';

export const getPromo = (state: State): Promo => state['serverReducer'].promo;
export const getCameras = (state: State): Cameras => state['serverReducer'].cameras;
export const getCamera = (state: State): Camera => state['serverReducer'].camera;
export const getIsDataLoad = (state: State): boolean => state['serverReducer'].isDataLoad;
