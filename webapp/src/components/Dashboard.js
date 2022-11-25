import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Modal from './Modal';
import Table from './Table';
import DeleteForm from './DeleteForm';
import NewsForm from './NewsForm';

const newsUrl = process.env.REACT_APP_API_URL + '/news';
const categoriesUrl = process.env.REACT_APP_API_URL + '/categories';

const Dashboard = () => {
    const { token, handleLogout } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const [action, setAction] = useState();
    const [selectedNews, setSelectedNews] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState();
    const [update, setUpdate] = useState(false);

    const doFetch = async (url, method, setState, body) => {
        if (body) {
            body = JSON.stringify(body);
        }

        try {
            setLoading(true)
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    token: token,
                },
                body,
            });
            const jsonResponse = await response.json();

            setUpdate(false);
            setState(jsonResponse);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        doFetch(newsUrl, 'GET', setData);
        doFetch(categoriesUrl, 'GET', setCategories);
    }, [update]);

    const displayForm = () => {
        if (action === 'edit') {
            return <NewsForm onClose={() => setIsOpen(false)}
                categories={categories}
                method={'PATCH'}
                news={selectedNews}
                onPost={doFetch}
                updateList={setUpdate} />
        } else if (action === 'create') {
            return <NewsForm onClose={() => setIsOpen(false)}
                categories={categories}
                method={'POST'}
                onPost={doFetch}
                updateList={setUpdate} />
        } else if (action === 'delete') {
            return <DeleteForm onClose={() => setIsOpen(false)}
                news={selectedNews}
                onDelete={doFetch}
                updateList={setUpdate} />
        }
    }

    const fixedButton = () => {
        if (isOpen) {
            return null;
        }

        return (
            <button
                className="btn btn-success btn-lg p-1 rounded-pill position-fixed bottom-0 end-0 m-5"
                onClick={() => {
                    setAction('create');
                    setIsOpen(true);
                    setSelectedNews();
                }}>
                <span className='h1'>+</span>
            </button>
        );
    }

    return (

        <>
            <div className='bg-dark text-light mb-3 mx-0 p-3'>
                <div>Dashboard</div>

                <button onClick={handleLogout}>Sair</button>
            </div>

            <>
                <Table
                    data={data}
                    loading={loading}
                    onSelect={setSelectedNews}
                    openModal={() => setIsOpen(true)}
                    action={setAction} />

                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    {displayForm()}
                </Modal>

                {
                    fixedButton()
                }

            </>

        </>
    )
}

export default Dashboard