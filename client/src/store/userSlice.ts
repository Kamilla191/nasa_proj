import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Типизация данных пользователя
interface User {
  _id: string;
  username: string;
  email: string;
  fio: string;
  phone: string;
  birth_dt: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  updateError: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  updateError: null,
};

// Экшены для загрузки и обновления данных пользователя
export const fetchUserData = createAsyncThunk<User, string, { rejectValue: string }>(
  'user/fetchUserData',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}user/${userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue('Ошибка при загрузке данных пользователя');
    }
  }
);

export const updateUserData = createAsyncThunk<User, { userId: string; username: string; email: string; fio: string; phone: string; birth_dt: string }, { rejectValue: string }>(
  'user/updateUserData',
  async (updatedUser, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}user/${updatedUser.userId}`,
        updatedUser
      );
      return response.data;
    } catch (err) {
      return rejectWithValue('Ошибка при обновлении данных пользователя');
    }
  }
);

// Слайс для пользователя
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserData.pending, (state) => {
        state.updateError = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.updateError = action.payload as string;
      });
  },
});

export default userSlice.reducer;
