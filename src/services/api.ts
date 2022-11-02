import { Cameras, Promo } from '../types/camera';

export const api = async (url = 'https://camera-shop.accelerator.pages.academy/cameras/', typeParam = 'Cameres') => {
  const data = await fetch(url);
  let cameres;
  if (typeParam === 'Cameres') {
    cameres = await data.json() as Cameras;
  } else {
    cameres = await data.json() as Promo;
  }

  return cameres;
};
