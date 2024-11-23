const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mock data
const users = [];
const profiles = [];
const meetings = [];
const bookings = [];

// Реєстрація користувачів
app.post('/api/register', (req, res) => {
    const { username, password, role } = req.body;

    if (users.some(user => user.username === username)) {
        return res.status(400).json({ error: 'Користувач уже існує' });
    }

    users.push({ username, password, role });
    if (role === 'teacher') {
        profiles.push({ username, role, profileData: { schedule: [] } });
    }
    res.status(201).json({ message: 'Реєстрація успішна' });
});

// Авторизація
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Неправильні дані для входу' });
    }

    res.json({ user });
});

// Отримання профілю викладача
app.get('/api/profile/:username', (req, res) => {
    const { username } = req.params;

    const profile = profiles.find(p => p.username === username);
    if (!profile) {
        return res.status(404).json({ error: 'Профіль не знайдено' });
    }

    res.json(profile.profileData);
});

// Створення зустрічей викладачами
app.post('/api/meetings', (req, res) => {
    const meeting = req.body;

    if (!profiles.find(p => p.username === meeting.teacher)) {
        return res.status(404).json({ error: 'Викладача не знайдено' });
    }

    meetings.push(meeting);
    res.status(201).json({ message: 'Зустріч створено', meeting });
});

// Отримання зустрічей викладача
app.get('/api/meetings/:username', (req, res) => {
    const { username } = req.params;

    const teacherMeetings = meetings.filter(m => m.teacher === username);
    res.json(teacherMeetings);
});

// Отримання всіх зустрічей для студентів
app.get('/api/all-meetings', (req, res) => {
    res.json(meetings);
});

// Бронювання зустрічі
app.post('/api/bookings', (req, res) => {
    const { username, meeting } = req.body;
    console.log('Запит на бронювання:', { username, meeting });

    if (!username || !meeting) {
        console.log('Помилка: Необхідні дані не передані');
        return res.status(400).json({ error: 'Необхідні дані не передані' });
    }

    const existingMeeting = meetings.find(m => m.day === meeting.day && m.time === meeting.time && m.teacher === meeting.teacher);
    if (!existingMeeting) {
        console.log('Помилка: Зустріч не знайдено');
        return res.status(404).json({ error: 'Зустріч не знайдено' });
    }

    bookings.push({ username, meeting: existingMeeting });
    console.log('Бронювання створено:', { username, meeting: existingMeeting });
    res.status(201).json({ message: 'Зустріч заброньовано' });
});

// Отримання заброньованих зустрічей студента
app.get('/api/bookings/:username', (req, res) => {
    const { username } = req.params;

    const userBookings = bookings.filter(b => b.username === username);
    res.json(userBookings);
});

// Запуск сервера
app.listen(5000, () => {
    console.log('Сервер працює на http://localhost:5000');
});
