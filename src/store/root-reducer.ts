import { combineReducers } from '@reduxjs/toolkit';
import { cameraProcess } from './camera-process/camera-process';

export const rootReducer = combineReducers({
  // 'modalReducer': modalReducer.reducer,
  'serverReducer': cameraProcess.reducer,
});
