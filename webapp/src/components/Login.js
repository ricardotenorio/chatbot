import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = (props) => {
    const [password, setPassword] = useState('');
    const { handleLogin, errorMessage } = useAuth();
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [errorMessage, setErrorMessage] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        handleLogin({ password });
    }

    return (
        <div>
            { errorMessage && <p>{ errorMessage }</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Senha</span>
                    <input
                        type='password'
                        name='password'
                        onChange={(event) => setPassword(event.target.value)}
                        value={password} 
                        minLength={5} />
                </label>

                <button type='submit'>Entrar</button>
            </form>
        </div>
    )
}

export default Login