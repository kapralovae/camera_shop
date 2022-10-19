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

export type Cameras = Camera[];

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
  api: (arg0: string | undefined, arg1: string) => Promise<Camera | Cameras | Promo>;
  apiPromo: Promise<Cameras | Promo>;
};
