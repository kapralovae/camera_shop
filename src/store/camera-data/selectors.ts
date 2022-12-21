import { Basket, Camera, Cameras, State } from '../../types/camera';

export const getCatalogPage = (state: State): number => state['dataReducer'].catalogPage;

export const getStatusPopup = (state: State): boolean => state['dataReducer'].isActivePopupBasket;

export const getCardPopup = (state: State): Camera => state['dataReducer'].cardPopup;

export const getStartSlice = (state: State): number => state['dataReducer'].startSlice;

export const getCountSlice = (state: State): number => state['dataReducer'].countSlice;

export const getCamerasCatalog = (state: State): Camera[] => state['dataReducer'].camerasCatalog;

export const getIsBasketSuccess = (state: State): boolean => state['dataReducer'].isBasketSuccess;

export const getSliceStart = (state: State): number => state['dataReducer'].sliceStart;

export const getIsAddReview = (state: State): boolean => state['dataReducer'].isAddReview;

export const getIsActivePopupReview = (state: State): boolean => state['dataReducer'].isActivePopupReview;

export const getSortType = (state: State): string => state['dataReducer'].sortType;

export const getSortDirection = (state: State): string => state['dataReducer'].sortDirection;

export const getIsSort = (state: State): boolean => state['dataReducer'].isSort;

export const getSortCards = (state: State): Cameras => state['dataReducer'].sortCards;

export const getCamerasForRender = (state: State): Cameras => state['dataReducer'].camerasForRender;

export const getCountCamerasInBasket = (state: State): number => state['dataReducer'].countCamerasInBasket;

export const getCamerasInBasket = (state: State): Basket => state['dataReducer'].camerasInBasket;

export const getIsActivePopupDeleteCamera = (state: State): boolean => state['dataReducer'].isActivePopupDeleteCamera;
