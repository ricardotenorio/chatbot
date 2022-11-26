import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Modal from '../components/Modal';
import Table from '../components/Table';
import DeleteForm from '../components/DeleteForm';
import NewsForm from '../components/NewsForm';
import FloatingButton from '../components/FloatingButton';

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

        if(!categories) {
            console.log(categories);
            doFetch(categoriesUrl, 'GET', setCategories);
        }
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

    return (

        <>
            <div className='d-flex justify-content-between bg-dark text-light mb-3 mx-0 p-3'>
                <h2>Dashboard</h2>

                <button
                    className='btn btn-secondary mx-3 px-4'
                    onClick={handleLogout}>
                    Sair
                </button>
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

                <FloatingButton
                    display={!isOpen}
                    handleClick={() => {
                        setAction('create');
                        setIsOpen(true);
                        setSelectedNews()
                    }} />

            </>

        </>
    )
}

export default Dashboard