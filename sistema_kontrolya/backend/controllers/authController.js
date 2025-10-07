const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const user = await User.create({
      username,
      email,
      password,
      role: role || 'engineer',
    });

    res.status(201).json({ message: 'Регистрация успешна', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при регистрации', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Неверный пароль' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );

    res.json({ message: 'Вход успешен', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при входе', error: error.message });
  }
};
