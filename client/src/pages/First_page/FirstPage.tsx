import './firstPage.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/types'; // Импорт типов RootState и AppDispatch
import { setDate, fetchApod } from '../../store/apodSlice';

export default function FirstPage() {
    // Используем типизированный dispatch
    const dispatch: AppDispatch = useDispatch();

    // Типизация состояния
    const { date, imageUrl, error, status, title, explanation } = useSelector(
        (state: RootState) => state.apod
    );

    const handleFetchApod = () => {
        if (date) {
            dispatch(fetchApod(date)); // Теперь dispatch знает о thunk
        }
    };


    return (
        <div className="first-page">
            <h1>Astronomy Picture of the Day (APOD)</h1>
            <div className="input-container">
                <input
                    className="first_input"
                    type="date"
                    value={date}
                    onChange={(e) => dispatch(setDate(e.target.value))}
                />
                <button
                    className="first_button"
                    onClick={handleFetchApod}
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Loading...' : 'Fetch APOD'}
                </button>
            </div>
            {error && <p className="error-text">{error}</p>}
            {status === 'succeeded' && (
                <div className="apod-content">
                    {title && <h2 className="apod-title">{title}</h2>}
                    {imageUrl && (
                        <img
                            src={String(imageUrl)}
                            alt={title || 'Astronomy Picture of the Day'}
                            className="apod-image"
                        />
                    )}
                    {explanation && <p className="apod-explanation">{explanation}</p>}
                </div>
            )}
        </div>
    );
}
