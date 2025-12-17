// client/src/context/AuthContext.tsx
import { createContext, useState, useContext, type ReactNode } from "react";

interface AuthContextType {
	isAuthenticated: string | null;
	login: () => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("isAuthenticated"));

	const login = () => {
		localStorage.setItem("isAuthenticated", "true");
		setIsAuthenticated("true");
	};

	const logout = () => {
		localStorage.removeItem("isAuthenticated");
		setIsAuthenticated(null);
	};

	return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
}
