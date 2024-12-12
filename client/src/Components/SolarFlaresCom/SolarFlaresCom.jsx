import React from 'react';

const SolarFlaresCom = ({ solarFlaresObjects }) => {
    return (
        <div>
            <h1>Солнечные вспышки</h1>
            <ul style={{ listStyleType: 'none' }}>
                {solarFlaresObjects.length > 0 ? (
                    solarFlaresObjects.map((flare) => (
                        <li key={flare.flrID} style={{ marginBottom: '20px' }}>
                            <h3><strong>Прибор:</strong> {flare.instruments.map(instrument => instrument.displayName).join(', ')}</h3>
                            <h3><strong>Время начала:</strong> {new Date(flare.beginTime).toLocaleString()}</h3>
                            <h3><strong>Пик:</strong> {new Date(flare.peakTime).toLocaleString()}</h3>
                            <h3><strong>Время окончания:</strong> {flare.endTime ? new Date(flare.endTime).toLocaleString() : 'Не указано'}</h3>
                            <h3><strong>Класс:</strong> {flare.classType}</h3>
                            <h3><strong>Местоположение:</strong> {flare.sourceLocation}</h3>
                            <h3><strong>Номер активной области:</strong> {flare.activeRegionNum}</h3>
                            <h3><strong>Примечание:</strong> {flare.note || 'Нет примечаний'}</h3>
                            <h3><strong>Время отправки:</strong> {new Date(flare.submissionTime).toLocaleString()}</h3>
                            <h3><strong>Ссылка:</strong> <a href={flare.link} target="_blank" rel="noopener noreferrer">Дополнительная информация</a></h3>
                            <h4>Связанные события:</h4>
                            <ul>
                                {flare.linkedEvents && flare.linkedEvents.length > 0 ? (
                                    flare.linkedEvents.map((event) => (
                                        <li key={event.activityID}>ID события: {event.activityID}</li>
                                    ))
                                ) : (
                                    <li>Нет связанных событий</li>
                                )}
                            </ul>
                        </li>
                    ))
                ) : (
                    <li>Нет данных о солнечных вспышках за данный период.</li>
                )}
            </ul>
        </div>
    );
};

export default SolarFlaresCom;