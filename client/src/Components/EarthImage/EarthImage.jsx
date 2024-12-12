import React, { useState } from 'react';
import axios from 'axios';

const EarthImage = () => {
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [dim, setDim] = useState('');
    const [date, setDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    const fetchEarthImage = async () => {
        try {
            const response = await axios.get('http://localhost:3010/earth', {
                params: { lat, lon, dim, date },
                responseType: 'blob', // Устанавливаем тип ответа как blob
            });

            // Создаем URL для отображения изображения
            const url = URL.createObjectURL(new Blob([response.data]));
            setImageUrl(url); // Устанавливаем URL изображения
            setError(''); // Сбрасываем ошибку
        } catch (err) {
            setError('Ошибка при загрузке изображения');
            setImageUrl(''); // Сбрасываем изображение в случае ошибки
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        fetchEarthImage(); // Вызываем функцию для получения изображения
    };

    return (
        <div className='body_back'>
            <h1>Получить изображение Земли</h1>
            <form className='admin_form' onSubmit={handleSubmit}>
                <div>
                    <label>
                        Широта:
                        <input
                            className='admin_input'
                            type="number"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Долгота:
                        <input
                            className='admin_input'
                            type="number"
                            value={lon}
                            onChange={(e) => setLon(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Размер:
                        <input
                            className='admin_input'
                            type="text"
                            value={dim}
                            onChange={(e) => setDim(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Дата:
                        <input
                            className='admin_input'
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button className='admin_button' type="submit">Рассчитать</button>
            </form>
            {error && <div>{error}</div>}
            {imageUrl && (
                <img src={imageUrl} alt="Earth" style={{ maxWidth: '100%', height: 'auto', padding: '20px', marginTop: '50px' }} />
            )}
        </div>
    );
};

export default EarthImage;