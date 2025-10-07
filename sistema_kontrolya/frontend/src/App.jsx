import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [user, setUser] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:4000/api/auth/login", {
          email: form.email,
          password: form.password,
        });
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
      } else {
        await axios.post("http://localhost:4000/api/auth/register", form);
        alert("Регистрация успешна! Теперь войдите.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Ошибка");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // 👇 Страница после входа — красиво и по центру
  if (user) {
    return (
      <div className="wrapper">
        <div className="container dashboard">
          <h2>Система контроля качества</h2>
          <p>
            Добро пожаловать, <b>{user.username}</b>!
          </p>
          <p>Вы успешно вошли в систему контроля качества.</p>
          <div className="dashboard-content">
            <div className="card">
              <h3>Проверка данных</h3>
              <p>Анализ и оценка качества по ключевым показателям.</p>
            </div>
            <div className="card">
              <h3>Отчёты</h3>
              <p>Сводная статистика и результаты проверок.</p>
            </div>
            <div className="card">
              <h3>Обратная связь</h3>
              <p>Связь с отделом контроля и обратная связь по процессам.</p>
            </div>
          </div>
          <button onClick={handleLogout}>Выйти</button>
        </div>
      </div>
    );
  }

  // 👇 Страницы входа / регистрации
  return (
    <div className="wrapper">
      <div className="container">
        <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={form.username}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>
        <div className="toggle">
          {isLogin ? (
            <>
              Нет аккаунта?{" "}
              <span onClick={() => setIsLogin(false)}>Регистрация</span>
            </>
          ) : (
            <>
              Уже есть аккаунт?{" "}
              <span onClick={() => setIsLogin(true)}>Войти</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
