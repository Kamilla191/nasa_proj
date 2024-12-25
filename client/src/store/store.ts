import { configureStore, Store } from '@reduxjs/toolkit';
import apodReducer from './apodSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import solarFlaresReducer from './solarFlaresSlice';
import nearEarthObjectsReducer from './nearEarthObjectsSlice';
import earthImageReducer from './earthImageReducer';

export const store: Store = configureStore({
    reducer: {
        apod: apodReducer,
        auth: authReducer,
        user: userReducer,
        solarFlares: solarFlaresReducer,
        nearEarthObjects: nearEarthObjectsReducer,
        earthImage: earthImageReducer,
    },
});