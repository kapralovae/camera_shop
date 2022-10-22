import { Cameras, Promo } from '../types/camera';

// export const api = async (url = 'https://camera-shop.accelerator.pages.academy/cameras/', typeParam = 'Cameras') => {
//   const data = await fetch(url);
//   if (typeParam === 'Cameras') {
//     return await data.json() as Cameras;
//   }
//   if (typeParam === 'Camera') {
//     return await data.json() as Camera;
//   }
//   if (typeParam === 'Promo') {
//     return await data.json() as Promo;
//   }
// };

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
