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

export type CameraInBasket = {
    camera: Camera;
    count: number;
};

export type Basket = {[key:string] : CameraInBasket}

export type CameraData = {
  catalogPage: number;
  isActivePopupBasket: boolean;
  cardPopup: Camera;
  startSlice: number;
  countSlice: number;
  camerasCatalog: Cameras;
  isBasketSuccess: boolean;
  sliceStart: number;
  isAddReview: boolean;
  isActivePopupReview: boolean;
  sortType: string;
  sortDirection: string;
  isSort: boolean;
  sortCards: Cameras;
  camerasForRender: Cameras;
  countCamerasInBasket: number;
  camerasInBasket: Basket;
  isActivePopupDeleteCamera: boolean;
  summaryPrice: number;
  isDiscount: boolean;
  discount: number;
  borderInput: {
    border: string;
  };
  opacityError: {
    opacity: number;
  };
  opacityAccept: {
    opacity: number;
  };
};

export type Count = {
  id: number;
  countItem: number;
  doing: string;
  priceItem: number;
};


export type CamerasProsecc = {
  cameras: Cameras;
  camera: Camera;
  promo: Promo;
  isDataLoad: boolean;
  similarCameras: Cameras;
  comments: Comment[];
  couponPost: Coupon;
};

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
  api: Promise<Camera | Cameras | Promo>;
  apiPromo: Promise<Cameras | Promo>;
};

export type Comment = {
  id: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
  createAt: string;
  cameraId: number;
};

export type Review = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
};

export type Coupon = {
  coupon: string | null;
};
