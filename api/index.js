const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const router = require("express").Router();
const fetch = require("node-fetch");

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');

const PORT = process.env.PORT || 3010;
const API_KEY = process.env.API_KEY
const app = express();

const db = 'mongodb+srv://ismailovakamilla193:Love_anime19@clustervkr.nm7uq.mongodb.net/Nasa_proj'
mongoose
    .connect(db)
    .then((res) => {console.log('Connected to DB')})
    .catch((err) => {console.log(err)});


app.use(express.json());
app.use(cors());

app.use('/auth', authRoute);
app.use('/user', userRoute);


app.get("/apod", async (req, res) => {
    console.log("/apod endpoint called");
    const { date } = req.query; // Извлекаем дату из параметров запроса
    console.log(date)
    const url = `https://api.nasa.gov/planetary/apod?${date ? `date=${date}`: ''}&api_key=${API_KEY}`;
    console.log(url)
    

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Преобразуем ответ в JSON
        console.log(data); // Логируем данные для отладки
        res.send(data.url); // Отправляем URL изображения
    } catch (error) {
        console.error({
            "message": "ошибка",
            error: error,
        });
        res.status(500).send("Internal Server Error"); // Отправляем ошибку клиенту
    }
});

app.get("/neofedd", async (req, res) => {
    console.log("/neofedd endpoint called");
    const { start_date,  end_date} = req.query; // Извлекаем дату из параметров запроса
    console.log(start_date)
    console.log(end_date)
    const url = `https://api.nasa.gov/neo/rest/v1/feed?${start_date ? `start_date=${start_date}`: ''}${end_date ? `&end_date=${end_date}`: ''}&api_key=${API_KEY}`;
    console.log(url)
    

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Преобразуем ответ в JSON
        console.log(data); // Логируем данные для отладки
        res.send(data); // Отправляем URL изображения
    } catch (error) {
        console.error({
            "message": "ошибка",
            error: error,
        });
        res.status(500).send("Internal Server Error"); // Отправляем ошибку клиенту
    }
});

app.get("/solar_flare", async (req, res) => {
    console.log("/neofedd endpoint called");
    const { start_date,  end_date} = req.query; // Извлекаем дату из параметров запроса
    console.log(start_date)
    console.log(end_date)
    const url = `https://api.nasa.gov/DONKI/FLR?${start_date ? `start_date=${start_date}`: ''}${end_date ? `&end_date=${end_date}`: ''}&api_key=${API_KEY}`;
    console.log(url)
    

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Преобразуем ответ в JSON
        //console.log(data); // Логируем данные для отладки
        res.send(data); // Отправляем URL изображения
    } catch (error) {
        console.error({
            "message": "ошибка",
            error: error,
        });
        res.status(500).send("Internal Server Error"); // Отправляем ошибку клиенту
    }
});

app.get("/earth", async (req, res) => {
    console.log("/earth endpoint called");
    const { lat, lon, dim, date } = req.query;
    const url = `https://api.nasa.gov/planetary/earth/imagery?${lat ? `lat=${lat}` : ''}${lon ? `&lon=${lon}` : ''}${dim ? `&dim=${dim}` : ''}${date ? `&date=${date}` : ''}&api_key=${API_KEY}`;

    console.log(url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const imageBuffer = await response.buffer(); // Получаем изображение как буфер
        res.set('Content-Type', 'image/jpeg'); // Устанавливаем заголовок для типа изображения
        res.send(imageBuffer); // Отправляем изображение клиенту
    } catch (error) {
        console.error({
            "message": "Ошибка",
            error: error,
        });
        res.status(500).send("Internal Server Error"); // Отправляем ошибку клиенту
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});