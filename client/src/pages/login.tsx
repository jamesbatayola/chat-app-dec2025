import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim()) return;

    // login logic ...
    // after successful login:
    navigate("/chat");
  };

  return (
    <div className="login-wrapper">
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
