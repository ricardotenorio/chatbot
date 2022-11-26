import React, { useState } from 'react'

const MODAL = {
    backgroundColor: '#fff',
    position: 'fixed',
    top: '10vh',
    left: '25vw',
    width: '50vw',
    height: '80vh',
    zindex: 100,
    overflowY: 'auto',
}

const DROP = {
    backgroundColor: '#fff',
    position: 'absolute',
    left: '25%',
    listStyleType: 'none',
    border: '1px solid grey',
}

const NewsForm = ({ news, onClose, categories, method, onPost, updateList }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [editedNews, setEditedNews] = useState({ ...news });
    const [errorMessage, setErrorMessage] = useState();

    const newsUrl = `${process.env.REACT_APP_API_URL}/news/${news ? news._id : ''}`;

    const handleCategory = (event) => {
        setEditedNews((prevState) => ({ ...prevState, category: event.target.value }));
        setIsDropdownOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!editedNews.category) {
            setErrorMessage('Selecione uma categoria');
            return;
        }
        
        onPost(newsUrl, method, setEditedNews, editedNews)
            .then(() => {
                updateList(true);
                onClose();
            })
            .catch((error) => console.log(error));
    }

    return (

        <div style={MODAL} className='shadow text-center bg-light rounded-3'>
            <h4 className='mt-4'>Notícia</h4>

            <form className='d-flex flex-column p-3' onSubmit={handleSubmit}>
                <label className='mt-3 mx-auto w-75'>
                    <span className='text-center'>Título</span>
                    <input
                        className='form-control'
                        type='text'
                        name='title'
                        onChange={(event) => setEditedNews((prevState) => ({ ...prevState, title: event.target.value }))}
                        defaultValue={news ? news.title : ''}
                        minLength={2}
                        required />
                </label>

                <label className='mt-3 mx-auto w-75'>
                    <span>Descrição</span>
                    <input
                        className='form-control'
                        type='textarea'
                        name='description'
                        onChange={(event) => setEditedNews((prevState) => ({ ...prevState, description: event.target.value }))}
                        defaultValue={news ? news.description : ''}
                        minLength={2}
                        required />
                </label>

                <div className='mt-3'>
                    <button
                        className='btn btn-secondary dropdown-toggle'
                        type='button'
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        {editedNews.category ?? 'Tema'}
                    </button>

                    {
                        isDropdownOpen &&
                        <ul style={DROP} className='d-flex p-0 flex-column w-50'>
                            {
                                categories.map((category) => {
                                    return (
                                        <li>
                                            <button
                                                className='btn btn-light rounded-0 w-100 m-0'
                                                type='button'
                                                value={category}
                                                onClick={handleCategory}>
                                                {category}
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }
                </div>

                <label className='mt-3 mx-auto w-75'>
                    <span className='m-2 text-center'>Link da Notícia</span>
                    <input
                        className='form-control'
                        type='text'
                        name='news_url'
                        onChange={(event) => setEditedNews((prevState) => ({ ...prevState, news_url: event.target.value }))}
                        defaultValue={news ? news.news_url : ''}
                        minLength={10}
                        required />
                </label>

                <label className='mt-3 mx-auto w-75'>
                    <span className='m-2 text-center'>Link da Imagem</span>
                    <input
                        className='form-control mt-3'
                        type='text'
                        name='image_url'
                        onChange={(event) => setEditedNews((prevState) => ({ ...prevState, image_url: event.target.value }))}
                        defaultValue={news ? news.image_url : ''}
                        minLength={10}
                        required />
                </label>

                {
                    errorMessage &&
                    <div>
                        <p className='text-danger'>{errorMessage}</p>
                    </div>
                }

                <div className='m-4 d-flex flex-row justify-content-between'>
                    <button className='btn btn-primary' type='submit'>Enviar</button>
                    <button className='btn btn-secondary' onClick={onClose} type='button'>Cancelar</button>
                </div>

            </form>

        </div>
    )
}

export default NewsForm