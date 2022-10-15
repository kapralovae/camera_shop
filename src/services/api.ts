import { Cameras, Promo } from '../types/camera';

export const api = async (url = 'https://camera-shop.accelerator.pages.academy/cameras/', typeParam = 'Cameras') => {
  const data = await fetch(url);
  let cameras;
  if (typeParam === 'Cameras') {
    cameras = await data.json() as Cameras;
  } else {
    cameras = await data.json() as Promo;
  }

  return cameras;
};
