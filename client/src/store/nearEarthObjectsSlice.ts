import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface FetchNearEarthObjectsParams {
    start_date: string;
    end_date: string;
}

// Явное указание типа для rejectWithValue
export const fetchNearEarthObjects = createAsyncThunk<
    // Тип возвращаемого значения, которое будет доступно в action.payload при успешном выполнении
    Record<string, unknown>,
    // Параметры для запроса
    FetchNearEarthObjectsParams,
    // Тип для rejectWithValue (ошибка)
    { rejectValue: string }
>(
    'nearEarthObjects/fetchNearEarthObjects',
    async ({ start_date, end_date }: FetchNearEarthObjectsParams, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_API}neofedd`,
                { params: { start_date, end_date } },
            );
            return response.data.near_earth_objects;
        } catch (err) {
            // Здесь мы явно указываем строку в rejectWithValue
            return rejectWithValue('Ошибка при получении данных с сервера');
        }
    },
);

interface NearEarthObjectsState {
    nearEarthObjects: Record<string, unknown>;
    error: string | null;
}

const nearEarthObjectsSlice = createSlice({
    name: 'nearEarthObjects',
    initialState: {
        nearEarthObjects: {},
        error: null,
    } as NearEarthObjectsState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNearEarthObjects.fulfilled, (state, action) => {
                state.nearEarthObjects = action.payload;
                state.error = null;
            })
            .addCase(fetchNearEarthObjects.rejected, (state, action) => {
                state.nearEarthObjects = {};
                // Теперь payload имеет тип string, и мы можем безопасно присвоить его переменной error
                state.error = action.payload as string;
            });
    },
});

export default nearEarthObjectsSlice.reducer;
