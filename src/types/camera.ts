import { store } from '../store';

export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  level: string;
  rating: number;
  price: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  reviewCount: number;
};

export type Cameres = Camera[];

export type Promo = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
};

export type AppDispatch = typeof store.dispatch;

export type State = ReturnType<typeof store.getState>;

export type Api = {
  api: Promise<Cameres | Promo>;
  apiPromo: Promise<Cameres | Promo>;
};
