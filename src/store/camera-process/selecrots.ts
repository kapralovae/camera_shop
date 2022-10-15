import { Promo, State } from '../../types/camera';

export const getPromo = (state: State): Promo => state['serverReducer'].promo;
