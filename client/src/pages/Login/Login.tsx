import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/authSlice';
import axios from 'axios';
import './login.css';
import { RootState } from '../../store/types'; // Импорт RootState для типизации состояния

export default function Login() {
    // Указываем тип для useRef
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    
    // Типизация состояния с использованием RootState
    const { isFetching } = useSelector((state: RootState) => state.auth);

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}auth/login`, {
                email: email.current?.value, // Добавляем защиту от null
                password: password.current?.value, // Добавляем защиту от null
            });
            dispatch(loginSuccess(res.data));
            alert('Authorization was completed successfully');
        } catch (error) {
            dispatch(loginFailure());
            alert('Login failed');
        }
    };

    return (
        <div className="body_back">
            <form className="login_form" onSubmit={handleClick}>
                <input
                    className="login_input"
                    type="email"
                    placeholder="Email"
                    required
                    ref={email}
                />
                <input
                    className="login_input"
                    type="password"
                    placeholder="Password"
                    required
                    ref={password}
                />
                <button className="login_button" type="submit" disabled={isFetching}>
                    {isFetching ? 'Loading...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
