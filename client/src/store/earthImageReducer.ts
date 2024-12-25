import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Интерфейс состояния
interface EarthImageState {
    lat: string;
    lon: string;
    dim: string;
    date: string;
    imageUrl: string;
    error: string;
}

// Начальное состояние
const initialState: EarthImageState = {
    lat: '',
    lon: '',
    dim: '',
    date: '',
    imageUrl: '',
    error: '',
};

// Слайс с типизацией действий с помощью PayloadAction
const earthImageSlice = createSlice({
    name: 'earthImage',
    initialState,
    reducers: {
        setLat: (state, action: PayloadAction<string>) => {
            state.lat = action.payload;
        },
        setLon: (state, action: PayloadAction<string>) => {
            state.lon = action.payload;
        },
        setDim: (state, action: PayloadAction<string>) => {
            state.dim = action.payload;
        },
        setDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload;
        },
        setImageUrl: (state, action: PayloadAction<string>) => {
            state.imageUrl = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

// Экспортируем действия для использования в компонентах
export const { setLat, setLon, setDim, setDate, setImageUrl, setError } = earthImageSlice.actions;

// Экспортируем редьюсер
export default earthImageSlice.reducer;
