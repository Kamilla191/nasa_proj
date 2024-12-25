import { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import { AuthActionTypes } from './AuthActionTypes';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
    }, [state.user]);

    const logout = () => {
        dispatch({ type: AuthActionTypes.LOGOUT });
        localStorage.removeItem('user'); // Удаляем пользователя из локального хранилища при выходе
    };

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
