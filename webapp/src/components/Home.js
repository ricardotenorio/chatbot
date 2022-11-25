import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

const Home = () => {
    const { handleLogout, user, token } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return <p>carregando...</p>
    }

    return (
        <>
            <div>Home</div>

            <button onClick={() => navigate('/dashboard')}>dashboard</button>
            <button onClick={handleLogout}>Sair</button>
        </>
    )
}

export default Home