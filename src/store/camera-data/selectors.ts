import { Camera, State } from '../../types/camera';

export const getCatalogPage = (state: State): number => state['dataReducer'].catalogPage;

export const getStatusPopup = (state: State): boolean => state['dataReducer'].isActivePopup;

export const getCardPopup = (state: State): Camera => state['dataReducer'].cardPopup;

export const getStartSlice = (state: State): number => state['dataReducer'].startSlice;

export const getCountSlice = (state: State): number => state['dataReducer'].countSlice;

export const getCamerasCatalog = (state: State): Camera[] => state['dataReducer'].camerasCatalog;

