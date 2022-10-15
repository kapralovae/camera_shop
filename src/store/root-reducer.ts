import { combineReducers } from '@reduxjs/toolkit';
import { cameraData } from './camera-data/camera-data';
import { cameraProcess } from './camera-process/camera-process';

export const rootReducer = combineReducers({
  'dataReducer': cameraData.reducer,
  'serverReducer': cameraProcess.reducer,
});
