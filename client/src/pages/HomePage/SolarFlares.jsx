import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSolarFlares } from '../../store/solarFlaresSlice';
import SolarFlaresCom from '../../Components/SolarFlaresCom/SolarFlaresCom';

const SolarFlares = () => {
    const [startDate, setStartDate] = useState(''); // Локальное состояние для даты начала
    const [endDate, setEndDate] = useState(''); // Локальное состояние для даты окончания
    const dispatch = useDispatch();
    const { solarFlares, error } = useSelector((state) => state.solarFlares); // Доступ к состоянию из Redux

    const handleFetch = () => {
        dispatch(fetchSolarFlares({ start_date: startDate, end_date: endDate })); // Диспатчим асинхронное действие
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Солнечные вспышки за указанный период</h1>
            <input
                className="first_input"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)} // Обновляем состояние даты
            />
            <input
                className="first_input"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)} // Обновляем состояние даты
            />
            <button className="first_button" onClick={handleFetch}>
                Пересчитать по указанным датам
            </button>
            <SolarFlaresCom solarFlaresObjects={solarFlares} />
        </div>
    );
};

export default SolarFlares;
