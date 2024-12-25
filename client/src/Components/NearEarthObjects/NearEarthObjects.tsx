import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types'; // Импортируем тип состояния
import { NearEarthObjectsState, Asteroid, CloseApproachData } from '../../store/types'; // Импорт интерфейсов

const NearEarthObjects: React.FC = () => {
    // Типизация состояния Redux
    const { nearEarthObjects, error } = useSelector(
        (state: RootState) => state.nearEarthObjects
    ) as { nearEarthObjects: NearEarthObjectsState; error: string | null };

    if (error) {
        return <div className="error-message">Ошибка: {error}</div>;
    }

    return (
        <div>
            <h1>Близкие к Земле объекты</h1>
            {Object.keys(nearEarthObjects).length === 0 ? (
                <p>Нет данных для отображения.</p>
            ) : (
                Object.keys(nearEarthObjects).map((date: string) => (
                    <div key={date}>
                        <h2>Дата: {date}</h2>
                        <ul>
                            {nearEarthObjects[date].map((asteroid: Asteroid) => (
                                <li key={asteroid.id}>
                                    <h3>
                                        {asteroid.name} (ID: {asteroid.neo_reference_id})
                                    </h3>
                                    <p>
                                        <strong>Абсолютная величина:</strong>{' '}
                                        {asteroid.absolute_magnitude_h}
                                    </p>
                                    <p>
                                        <strong>Потенциально опасный:</strong>{' '}
                                        {asteroid.is_potentially_hazardous_asteroid
                                            ? 'Да'
                                            : 'Нет'}
                                    </p>
                                    <p>
                                        <strong>Диаметр:</strong>{' '}
                                        {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                                            2
                                        )}{' '}
                                        -{' '}
                                        {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                                            2
                                        )}{' '}
                                        км
                                    </p>
                                    <h4>Данные о близком подходе:</h4>
                                    {asteroid.close_approach_data.map(
                                        (approach: CloseApproachData, index: number) => (
                                            <div key={index}>
                                                <p>
                                                    <strong>Дата близкого подхода:</strong>{' '}
                                                    {approach.close_approach_date}
                                                </p>
                                                <p>
                                                    <strong>Скорость:</strong>{' '}
                                                    {approach.relative_velocity.kilometers_per_hour}{' '}
                                                    км/ч
                                                </p>
                                                <p>
                                                    <strong>Расстояние:</strong>{' '}
                                                    {approach.miss_distance.kilometers} км
                                                </p>
                                            </div>
                                        )
                                    )}
                                    <a
                                        href={asteroid.nasa_jpl_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Дополнительная информация
                                    </a>
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default NearEarthObjects;
