import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Профиль</h2>
      {user ? (
        <>
          <p>Имя: {user.username}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Выйти</button>
        </>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}
