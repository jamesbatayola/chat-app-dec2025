import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";
// import Chat from "./Chat";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          username,
          password,
        });

        login();
        navigate("/chat");
      } catch (err) {
        alert("Invalid username or password");
      }
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form>
        <input
          id="username-input"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          id="password-input"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button onClick={() => handleLogin()}>Login</button>
      </form>
    </div>
  );
}
