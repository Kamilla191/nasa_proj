import { combineReducers } from 'redux';
import earthImageReducer from './earthImageReducer';
import solarFlaresSlice from './solarFlaresSlice';
import nearEarthObjectsSlice from './nearEarthObjectsSlice';
import userSlice from './userSlice';
import authSlice from './authSlice';
import apodSlice from './apodSlice';
import { configureStore } from '@reduxjs/toolkit';

// Типизация для близких к Земле объектов
export interface EstimatedDiameter {
    kilometers: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
    };
}

export interface CloseApproachData {
    close_approach_date: string;
    relative_velocity: {
        kilometers_per_hour: string;
    };
    miss_distance: {
        kilometers: string;
    };
}

export interface Asteroid {
    id: string;
    neo_reference_id: string;
    name: string;
    absolute_magnitude_h: number;
    is_potentially_hazardous_asteroid: boolean;
    estimated_diameter: EstimatedDiameter;
    close_approach_data: CloseApproachData[];
    nasa_jpl_url: string;
}

export interface NearEarthObjectsState {
    [date: string]: Asteroid[]; // Состояние для объектов, ближайших к Земле, по датам
}

export interface NearEarthObjectsReduxState {
    nearEarthObjects: NearEarthObjectsState;
    error: string | null;
}

// Типизация для состояния APOD (Astronomy Picture of the Day)
export interface ApodState {
    date: string;
    imageUrl: string;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// Типизация для состояния пользователя (например, для авторизации или профиля)
export interface UserState {
    user: {
        _id: string;
        username: string;
        email: string;
        fio: string;
        phone: string;
        birth_dt: string;
    } | null;
    loading: boolean;
    error: string | null;
    updateError: string | null;
}

// Типизация для состояния авторизации
export interface AuthState {
    isAuthenticated: boolean;
    user: UserState['user'] | null;
    loading: boolean;
    error: string | null;
}

// Типизация для корневого состояния (глобальное состояние всего приложения)
const rootReducer = combineReducers({
    earthImage: earthImageReducer,
    solarFlares: solarFlaresSlice,
    nearEarthObjects: nearEarthObjectsSlice,
    apod: apodSlice,
    auth: authSlice,
    user: userSlice,
});

// Типизация для корневого состояния
export type RootState = ReturnType<typeof rootReducer>;

// Создание store для определения AppDispatch
export const store = configureStore({
    reducer: rootReducer,
});

// Типизация dispatch
export type AppDispatch = typeof store.dispatch;

export default rootReducer;
