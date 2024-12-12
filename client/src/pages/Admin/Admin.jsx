import axios from "axios";
import React, { useEffect, useState } from "react";
import "./admin.css";

export default function Admin({ user }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(""); // Состояние для username
    const [email, setEmail] = useState(""); // Состояние для email
    const [fio, setFio] = useState(""); // Состояние для fio
    const [phone, setPhone] = useState(""); //Состояние для phone
    const [birth_dt, setBirth_dt] = useState(""); //Состояние для birth_dt
    const [updateError, setUpdateError] = useState(null); // Для обработки ошибок обновления

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3010/user/${user._id}`, {
                    params: {
                        userId: user._id,
                    },
                });
                console.log(response);
                setUsername(response.data.username || ""); // Устанавливаем начальное значение username
                setEmail(response.data.email || ""); // Устанавливаем начальное значение email
                setFio(response.data.fio || ""); // Устанавливаем начальное значение fio
                setPhone(response.data.phone || ""); // Устанавливаем начальное значение phone
                setBirth_dt(response.data.birth_dt ? response.data.birth_dt.split("T")[0] : ""); // Устанавливаем начальное значение birth_dt
            } catch (err) {
                setError('Ошибка при загрузке данных пользователя');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUser();
    }, [user._id]);

    const handleUpdate = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        setUpdateError(null); // Сбрасываем предыдущую ошибку

        try {
            const response = await axios.put(`http://localhost:3010/user/${user._id}`, {
                userId: user._id,
                username: username,
                email: email,
                phone: phone,
                fio: fio,
                birth_dt: birth_dt
                // password: newPassword, // Если нужно обновить пароль, добавьте состояние для него
            });
            alert(response.data); // Уведомление об успешном обновлении
        } catch (err) {
            setUpdateError('Ошибка при обновлении данных пользователя');
            console.error(err);
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="div_container_admin_main body_back">
            <h2>Профиль пользователя</h2>
            <form className="admin_form" onSubmit={handleUpdate}>
                <div>
                    <label>Username:</label>
                    <input
                        className="admin_input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        className="admin_input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>FML First name Middle name Last name</label>
                    <input
                        className="admin_input"
                        type="text"
                        value={fio}
                        onChange={(e) => setFio(e.target.value)}
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        className="admin_input"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Date of birth:</label>
                    <input
                        className="admin_input"
                        type="date"
                        value={birth_dt}
                        onChange={(e) => setBirth_dt(e.target.value)}
                        required
                    />
                </div>
                {/* Если необходимо добавить обновление пароля, добавьте соответствующие поля */}
                <button className="admin_button" type="submit">Обновить данные</button>
                {updateError && <div className="error">{updateError}</div>} {/* Показать ошибку обновления */}
            </form>
        </div>
    );
}