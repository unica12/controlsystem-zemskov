import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      setMessage(err.response?.data?.message || "Ошибка входа");
    }
  };

  return (
    <div className="container">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Пароль" onChange={handleChange} />
        <button type="submit">Войти</button>
      </form>
      <p>{message}</p>
      <p>
        Нет аккаунта? <Link to="/register">Регистрация</Link>
      </p>
    </div>
  );
}
