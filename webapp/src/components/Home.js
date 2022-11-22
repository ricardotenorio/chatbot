import React from 'react'
import { useAuth } from '../context/AuthContext'

const Home = () => {
    const { handleLogout, user, token } = useAuth();

    if (!user) {
        return <p>carregando...</p>
    }

    return (
        <>
            <div>Home</div>
            <p>{ token }</p>
            <p>{ user.id }</p>
            <p>{ user.username }</p>
            <button onClick={handleLogout}>Sair</button>
        </>
    )
}

export default Home