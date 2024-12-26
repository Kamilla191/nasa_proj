import './secPage.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNearEarthObjects } from '../../store/nearEarthObjectsSlice';
import NearEarthObjects from '../../Components/NearEarthObjects/NearEarthObjects';
import { RootState } from '../../store/types';
import { AppDispatch } from '../../store/types';
import { NearEarthObjectsState } from '../../store/types';

export default function SecPage() {
    const [startDate, setStartDate] = useState(''); // Локальное состояние для даты начала
    const [endDate, setEndDate] = useState(''); // Локальное состояние для даты окончания
    const dispatch = useDispatch<AppDispatch>();

    // Указываем типы для состояния из Redux
    const { nearEarthObjects, error } = useSelector(
        (state: RootState) => state.nearEarthObjects
    ) as {
        nearEarthObjects: NearEarthObjectsState;
        error: string | null;
    };

    // Обработчик загрузки данных
    const handleFetchData = () => {
        dispatch(fetchNearEarthObjects({ start_date: startDate, end_date: endDate }));
    };

    return (
        <div className="sec-page">
            <div>
                <h1>Near Earth Object Web Service (NeoWs)</h1>
                <input
                    className="first_input"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)} // Обновляем состояние даты начала
                />
                <input
                    className="first_input"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)} // Обновляем состояние даты окончания
                />
            </div>
            <button className="first_button" onClick={handleFetchData}>
                NASA Near Earth Objects Data
            </button>
            {error && <div className="error-message">Ошибка: {error}</div>}
            <NearEarthObjects nearEarthObjects={nearEarthObjects} />
        </div>
    );
}
