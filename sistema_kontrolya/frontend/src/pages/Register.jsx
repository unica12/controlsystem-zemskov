import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", form);
      setMessage("Регистрация успешна!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Ошибка регистрации");
    }
  };

  return (
    <div className="container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Имя" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Пароль" onChange={handleChange} />
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
