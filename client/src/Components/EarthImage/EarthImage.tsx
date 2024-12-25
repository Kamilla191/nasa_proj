import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setLat, setLon, setDim, setDate, setImageUrl, setError } from '../../store/actions';
import { RootState } from '../../store/types'; // Импортируйте тип корневого состояния

const EarthImage: React.FC = () => {
    const dispatch = useDispatch();
    
    // Используем тип RootState для типизации состояния Redux
    const { lat, lon, dim, date, imageUrl, error } = useSelector((state: RootState) => state.earthImage);

    const fetchEarthImage = async () => {
        try {
            const response = await axios.get('http://localhost:3010/earth', {
                params: { lat, lon, dim, date },
                responseType: 'blob', // Установим тип ответа как blob
            });

            // Создаем URL для отображения изображения
            const url = URL.createObjectURL(new Blob([response.data]));
            dispatch(setImageUrl(url)); // Устанавливаем URL изображения
            dispatch(setError('')); // Сбрасываем ошибку
        } catch (err) {
            dispatch(setError('Ошибка при загрузке изображения'));
            dispatch(setImageUrl('')); // Сбрасываем изображение в случае ошибки
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        fetchEarthImage(); // Вызываем функцию для получения изображения
    };

    return (
        <div className="body_back">
            <h1>Получить изображение Земли</h1>
            <form className="admin_form" onSubmit={handleSubmit}>
                <div>
                    <label>
                        Широта:
                        <input
                            className="admin_input"
                            type="number"
                            value={lat}
                            onChange={(e) => dispatch(setLat(Number(e.target.value)))}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Долгота:
                        <input
                            className="admin_input"
                            type="number"
                            value={lon}
                            onChange={(e) => dispatch(setLon(Number(e.target.value)))}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Размер:
                        <input
                            className="admin_input"
                            type="text"
                            value={dim}
                            onChange={(e) => dispatch(setDim(Number(e.target.value)))}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Дата:
                        <input
                            className="admin_input"
                            type="date"
                            value={date}
                            onChange={(e) => dispatch(setDate(e.target.value))}
                            required
                        />
                    </label>
                </div>
                <button className="admin_button" type="submit">
                    Рассчитать
                </button>
            </form>
            {error && <div>{error}</div>}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Earth"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        padding: '20px',
                        marginTop: '50px',
                    }}
                />
            )}
        </div>
    );
};

export default EarthImage;
