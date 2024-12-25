import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface FetchSolarFlaresParams {
    start_date: string;
    end_date: string;
}

// Явное указание типа для rejectWithValue
export const fetchSolarFlares = createAsyncThunk<
    // Тип возвращаемого значения, которое будет доступно в action.payload при успешном выполнении
    any[],
    // Параметры для запроса
    FetchSolarFlaresParams,
    // Тип для rejectWithValue (ошибка)
    { rejectValue: string }
>(
    'solarFlares/fetchSolarFlares',
    async ({ start_date, end_date }: FetchSolarFlaresParams, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_API}solar_flare`,
                { params: { start_date, end_date } },
            );
            return response.data;
        } catch (err) {
            // Здесь мы явно указываем строку в rejectWithValue
            return rejectWithValue('Ошибка при загрузке данных');
        }
    },
);

interface SolarFlaresState {
    solarFlares: any[];  // Можете уточнить тип для данных солнечных вспышек
    error: string | null;
}

const initialState: SolarFlaresState = {
    solarFlares: [],
    error: null,
};

const solarFlaresSlice = createSlice({
    name: 'solarFlares',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSolarFlares.fulfilled, (state, action) => {
                state.solarFlares = action.payload;
                state.error = null;
            })
            .addCase(fetchSolarFlares.rejected, (state, action) => {
                state.solarFlares = [];
                // Теперь payload имеет тип string, и мы можем безопасно присвоить его переменной error
                state.error = action.payload as string;
            });
    },
});

export default solarFlaresSlice.reducer;
