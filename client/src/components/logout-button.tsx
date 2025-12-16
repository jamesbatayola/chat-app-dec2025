import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "isAuthenticated",
        newValue: null,
        oldValue: "true",
      })
    );
    navigate("/login", { replace: true });
  };

  return <button onClick={handleLogout}>Logout</button>;
}
