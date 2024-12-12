import "./firstPage.css";
import React, { useState } from "react";
import axios from "axios";

export default function FirstPage() {
    const [date, setDate] = useState(''); // Состояние для хранения даты
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null); // Состояние для обработки ошибок

    const fetchApod = async () => {
        try {
            setError(''); // Сбрасываем ошибку перед новым запросом
            console.log("Fetching APOD for date:", date); // Логируем дату
            const response = await axios.get(`http://localhost:3010/apod`, {
                params: { date } // Передаем дату как параметр запроса
            });
            setImageUrl(response.data); // Теперь ответ содержит только URL
        } catch (err) {
            setError(err.response ? err.response.data.error : 'Error fetching data');
            setImageUrl(''); // Очищаем изображение в случае ошибки
        }
    };

    return (
        <>
            <div>
                <h1>Astronomy Picture of the Day (APOD)</h1>
                <input
                    className="first_input"
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} // Обновляем состояние даты
                />
                <button className="first_button" onClick={fetchApod}>Fetch APOD</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {imageUrl && (
                    <div>
                        <h2>Image:</h2>
                        <img src={imageUrl} alt="Astronomy Picture of the Day" style={{ width: '100%' }} /> <br/> <br />
                    </div>
                )}
            </div>
        </>
    );
}
