import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "../context/authContext";

// PAGES
import Login from "../pages/Login";
import Chat from "../pages/Chat";
import NotFound from "../pages/404";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Chat /> : <Login />} />

        <Route
          path="/chat"
          element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}
        />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
