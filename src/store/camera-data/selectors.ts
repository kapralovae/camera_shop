import { State } from '../../types/camera';

export const getCatalogPage = (state: State): number => state['dataReducer'].catalogPage;
