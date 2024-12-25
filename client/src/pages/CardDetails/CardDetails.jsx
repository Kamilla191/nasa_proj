import './cardDetails.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function CardDetails() {
    const { id } = useParams(); // Получаем ID карточки из URL
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_API}admin/${id}`,
                );
                setCard(response.data);
            } catch (err) {
                setError('Error fetching card details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCard();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_BACKEND_API}admin/delete/${id}`,
            );
            alert('Card deleted successfully!');
            navigate('/'); // Перенаправляем на главную страницу после удаления
        } catch (err) {
            console.error('Error deleting card:', err);
            alert('Failed to delete card.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!card) return <p>Card not found.</p>;

    return (
        <div className="card-details">
            <h2>{card.name}</h2>
            <p>Description: {card.description}</p>
            <p>Conditions: {card.conditions}</p>
            <p>Expiration Date: {card.expiration_date}</p>
            <p>Calories: {card.kilo_kal}</p>
            <p>Proteins: {card.belki}</p>
            <p>Fats: {card.jiri}</p>
            <p>Carbohydrates: {card.uglevods}</p>
            <p>Mass: {card.massa}</p>
            <p>Tag: {card.tag}</p>
            <button onClick={handleDelete} className="delete-button">
                Delete Card
            </button>
        </div>
    );
}
