const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Пользователь уже существует' });

    // Хэширование удалено, теперь делает хук beforeCreate
    const user = await User.create({ username, email, password });

    res.status(201).json({ message: 'Пользователь зарегистрирован', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка регистрации' });
  }
});

// 🔐 Авторизация
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    const isMatch = await require('bcrypt').compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Неверный пароль' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'supersecretkey',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Успешный вход',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка входа' });
  }
});

module.exports = router;
