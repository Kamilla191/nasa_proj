import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Типизация для состояния
interface ApodState {
    date: string;
    imageUrl: ApodResponse | null;  // Теперь это объект, а не строка
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    title?: string;        // Заголовок (если есть в API)
    explanation?: string;  // Описание (если есть в API)
}

// Типизация для ответа API
interface ApodResponse {
    url: string;           // URL изображения
    title?: string;        // Заголовок
    explanation?: string;  // Описание
    date?: string;         // Дата
}

// Async thunk для получения данных APOD
export const fetchApod = createAsyncThunk<
    ApodResponse,          // Возвращаемое значение (весь объект данных)
    string,                // Аргумент (дата)
    { rejectValue: string } // Тип ошибки
>('apod/fetchApod', async (date, { rejectWithValue }) => {
    try {
        const response = await axios.get<ApodResponse>(`${process.env.REACT_APP_BACKEND_API}apod`, {
            params: { date },
        });
        console.log(response.data);
        return response.data; // Возвращаем весь объект данных
    } catch (err: any) {
        return rejectWithValue(
            err.response?.data?.error || err.message || 'Ошибка при загрузке данных'
        );
    }
});

// Initial state
const initialState: ApodState = {
    date: '',
    imageUrl: null,        // Изначально пустой объект
    error: null,
    status: 'idle',        // idle | loading | succeeded | failed
    title: '',
    explanation: '',
};

// Slice для APOD
const apodSlice = createSlice({
    name: 'apod',
    initialState,
    reducers: {
        setDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApod.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.imageUrl = null;  // Очистка данных при запросе
                state.title = '';
                state.explanation = '';
            })
            .addCase(fetchApod.fulfilled, (state, action: PayloadAction<ApodResponse>) => {
                console.log(action.payload);
                state.status = 'succeeded';
                state.imageUrl = action.payload;  // Сохраняем весь объект в imageUrl
                state.title = action.payload.title || '';  // Сохраняем заголовок (если есть)
                state.explanation = action.payload.explanation || '';  // Сохраняем описание (если есть)
            })
            .addCase(fetchApod.rejected, (state, action) => {
                console.error('Fetch APOD failed:', action.payload); // Логирование ошибки
                state.status = 'failed';
                state.error = action.payload || 'Неизвестная ошибка';
            });
    },
});

// Экспортируем действия и редьюсер
export const { setDate } = apodSlice.actions;

export default apodSlice.reducer;
