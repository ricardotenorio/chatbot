import { useContext, createContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const loginUrl = process.env.REACT_APP_API_URL + '/login';
    const verifyAuthUrl = process.env.REACT_APP_API_URL + '/auth';

    const navigate = useNavigate();

    const handleLogin = async (password) => {
        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(password),
            });

            if (response.status === 401) {
                setErrorMessage('Senha Inválida');
                return;
            }

            const { user, token } = await response.json();

            setToken(token);
            setUser(user);

            localStorage.setItem('token', token);

            setErrorMessage(null);

            navigate('/')
        } catch (error) {
            console.log(error);
            setErrorMessage(error);
        }
    };

    const handleLogout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    }

    const verifyAuth = async () => {
        try {
            const response = await fetch(verifyAuthUrl, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                },
                body: JSON.stringify({ token }),
            });

            if (response.status === 401) {
                setErrorMessage('Sessão expirada');
                setToken(null);
                setUser(null);
                localStorage.removeItem('token');
                return;
            }

            const user = await response.json();

            setUser(user);

            setErrorMessage(null);
        } catch (error) {
            setErrorMessage(error);
        }
    }

    const value = {
        token,
        user,
        errorMessage,
        verifyAuth,
        handleLogin,
        handleLogout,
    };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}