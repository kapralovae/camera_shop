import { Camera, Cameras, Promo } from '../types/camera';

export const api = async (url: string, typeParam: string) => {
  const data = await fetch(url);
  if (typeParam === 'Cameras') {
    return await data.json() as unknown as Cameras;
  }
  if (typeParam === 'Camera') {
    return await data.json() as unknown as Camera;
  }
  if (typeParam === 'Promo') {
    return await data.json() as unknown as Promo;
  }
};

