import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginStart, loginSuccess, loginFailure } from '../../store/authSlice'; // Импорт действий из authSlice
import { RootState } from '../../store/types'; // Импорт RootState для типизации состояния

export default function Register() {
    // Указываем тип для useRef
    const username = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const passwordAgain = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Типизация состояния с помощью RootState
    const { isFetching } = useSelector((state: RootState) => state.auth);

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        // Проверяем, что ссылки не null
        if (passwordAgain.current && password.current && passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                username: username.current?.value,
                email: email.current?.value,
                password: password.current?.value,
                followings: [], // Добавляем свойство followings
            };

            dispatch(loginStart()); // Установка состояния загрузки
            try {
                await axios.post(
                    `${process.env.REACT_APP_BACKEND_API}auth/register`,
                    user
                );
                alert('Registration successful');
                dispatch(loginSuccess(user)); // Можно также добавить редирект или сохранение пользователя
                navigate('/login');
            } catch (err) {
                console.error(err);
                dispatch(loginFailure()); // Установка ошибки
            }
        }
    };

    const moveLogin = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className="body_back">
            <form className="login_form" onSubmit={handleClick}>
                <input
                    className="login_input"
                    type="text"
                    placeholder="Username"
                    ref={username}
                    required
                />
                <input
                    className="login_input"
                    type="email"
                    placeholder="Email"
                    ref={email}
                    required
                />
                <input
                    className="login_input"
                    type="password"
                    placeholder="Password"
                    ref={password}
                    required
                />
                <input
                    className="login_input"
                    type="password"
                    placeholder="Password again"
                    ref={passwordAgain}
                    required
                />
                <button
                    className="login_button"
                    type="submit"
                    disabled={isFetching} // Блокировка кнопки во время загрузки
                >
                    {isFetching ? 'Processing...' : 'Sign up'}
                </button>
                <button onClick={moveLogin}>Log into account</button>
            </form>
        </div>
    );
}
