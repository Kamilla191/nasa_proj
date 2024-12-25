import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/types'; // Импортируем тип AppDispatch
import { fetchUserData, updateUserData } from '../../store/userSlice';
import './admin.css';


// Типизация для данных пользователя
interface User {
  _id: string;
  username: string;
  email: string;
  fio: string;
  phone: string;
  birth_dt: string;
}

export default function Admin() {
  const dispatch = useDispatch<AppDispatch>(); // Типизируем dispatch как AppDispatch
  const { user, loading, error, updateError } = useSelector((state: { user: { user: User | null; loading: boolean; error: string | null; updateError: string | null; }; }) => state.user);

  const [username, setUsername] = useState(user?.username || ''); // Инициализация значений с user
  const [email, setEmail] = useState(user?.email || '');
  const [fio, setFio] = useState(user?.fio || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [birth_dt, setBirth_dt] = useState(user?.birth_dt.split('T')[0] || ''); // Убираем время, если оно присутствует

  // Подгружаем данные пользователя из Redux при изменении user
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setFio(user.fio);
      setPhone(user.phone);
      setBirth_dt(user.birth_dt ? user.birth_dt.split('T')[0] : ''); // Проверка наличия даты
    }
  }, [user]);

  // Подгружаем данные пользователя при инициализации компонента
  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchUserData(user._id)); // Загружаем данные пользователя через Redux
    }
  }, [dispatch, user]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const updatedUser = {
      userId: user._id,
      username,
      email,
      fio,
      phone,
      birth_dt,
    };
    dispatch(updateUserData(updatedUser)); // Обновление данных через Redux
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
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
          <label>FML First name Middle name Last name:</label>
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
        <button className="admin_button" type="submit">
          Обновить данные
        </button>
        {updateError && <div className="error">{updateError}</div>}
      </form>
    </div>
  );
}
