import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SolarFlaresCom from '../../Components/SolarFlaresCom/SolarFlaresCom';

const SolarFlares = () => {
    const [start_date, setStartDate] = useState(''); // Состояние для хранения даты
    const [end_date, setEndDate] = useState(''); // Состояние для хранения даты
    const [solarFlaresObjects, setSolarFlaresObjects] = useState([]); // Изменили на массив
    const [error, setError] = useState('');

    const fetchFlaresOptions = async () => {
        try {
            const response = await axios.get('http://localhost:3010/solar_flare', {
                params: { start_date, end_date } // Передаем дату как параметр запроса
            });
            setSolarFlaresObjects(response.data); // Устанавливаем данные как массив
            console.log(response.data); // Логируем данные
        } catch (err) {
            setError('Ошибка при загрузке данных');
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Солнечные вспышки за указанный период</h1>
            <input
                className='first_input' 
                type="date" 
                value={start_date} 
                onChange={(e) => setStartDate(e.target.value)} // Обновляем состояние даты
            />
            <input
                className='first_input'
                type="date" 
                value={end_date} 
                onChange={(e) => setEndDate(e.target.value)} // Обновляем состояние даты
            />
            <button className='first_button' onClick={fetchFlaresOptions}>Пересчитать по указанным датам</button>
            <SolarFlaresCom solarFlaresObjects={solarFlaresObjects} />
        </div>
    );
};

export default SolarFlares;