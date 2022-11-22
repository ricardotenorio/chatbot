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

        if (password.length < 5) {
            return;
        }

        handleLogin({ password });
    }

    return (
        <div className='w-50 shadow p-3 text-center bg-light rounded-3'>
            <h4>Login</h4>

            <form className='p-3 text-dark' onSubmit={handleSubmit}>
                {
                    errorMessage &&
                    <div className='p-0 text-center text-danger'>
                        <p>{errorMessage}</p>
                    </div>
                }
                <label>
                    <span className='m-2 d-block text-center'>Senha</span>
                    <input
                        className='form-control'
                        type='password'
                        name='password'
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        minLength={5} />
                </label>

                <button className='mx-auto btn btn-primary btn-md d-block mt-3 justify-self-center' type='submit'>Entrar</button>
            </form>
        </div>
    )
}

export default Login