import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    followings: string[];
    // Add other user properties as needed
}

interface AuthState {
    user: User | null;
    isFetching: boolean;
    error: boolean;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') as string) || null,
    isFetching: false,
    error: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state: AuthState) => {
            state.isFetching = true;
            state.error = false;
            state.user = null;
        },
        loginSuccess: (state: AuthState, action: PayloadAction<User>) => {
            state.isFetching = false;
            state.error = false;
            state.user = action.payload;
        },
        loginFailure: (state: AuthState) => {
            state.isFetching = false;
            state.error = true;
            state.user = null;
        },
        logout: (state: AuthState) => {
            state.user = null;
            state.isFetching = false;
            state.error = false;
        },
        follow: (state: AuthState, action: PayloadAction<string>) => {
            if (state.user) {
                state.user.followings.push(action.payload);
            }
        },
        unfollow: (state: AuthState, action: PayloadAction<string>) => {
            if (state.user) {
                state.user.followings = state.user.followings.filter(
                    (id: string) => id !== action.payload
                );
            }
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    follow,
    unfollow,
} = authSlice.actions;

export default authSlice.reducer;