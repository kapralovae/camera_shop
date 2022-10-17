import { Cameres, Promo, State } from '../../types/camera';

export const getPromo = (state: State): Promo => state['serverReducer'].promo;
export const getCameres = (state: State): Cameres => state['serverReducer'].cameres;
export const getIsDataLoad = (state: State): boolean => state['serverReducer'].isDataLoad;
