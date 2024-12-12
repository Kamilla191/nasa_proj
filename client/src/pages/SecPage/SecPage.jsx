import "./secPage.css"
import React, { useState } from "react";
import axios from "axios";
import NearEarthObjects from "../../Components/NearEarthObjects/NearEarthObjects ";

export default function SecPage() {

    const [start_date, setStartDate] = useState(''); // Состояние для хранения даты
    const [end_date, setEndtDate] = useState(''); // Состояние для хранения даты
    const [nearEarthObjects, setNearEarthObjects] = useState({});
    const [error, setError] = useState(null); // Состояние для обработки ошибок


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3010/neofedd', {
                params: { start_date, end_date } // Передаем дату как параметр запроса
            });
            setNearEarthObjects(response.data.near_earth_objects);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    };


    return(
        <>
            <div>
                <h1>Near Earth Object Web Service (NeoWs)</h1>
                <input
                    className="first_input" 
                    type="date" 
                    value={start_date} 
                    onChange={(e) => setStartDate(e.target.value)} // Обновляем состояние даты
                />
                <input
                    className="first_input"
                    type="date" 
                    value={end_date} 
                    onChange={(e) => setEndtDate(e.target.value)} // Обновляем состояние даты
                />
            </div>
            <button className="first_button" onClick={fetchData}>NASA Near Earth Objects Data</button>
            <NearEarthObjects nearEarthObjects={nearEarthObjects} />
        </>
    )
}