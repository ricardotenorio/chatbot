import React from 'react'

const Table = ({ data, loading, onSelect, openModal, action }) => {

    const handleClick = (event, news) => {
        openModal();
        onSelect(news);
        action(event.currentTarget.value)
    }

    if (loading) {
        return <h3>Carregando...</h3>
    }

    return (
        <div className='table-responsive'>
            <table className='table table-light table-bordered table-hover'>
                <thead className='table-dark'>
                    <tr>
                        <th>Imagem</th>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Tema</th>
                        <th>Link</th>
                        <th>Editar</th>
                        <th>Remover</th>
                    </tr>
                </thead>

                <tbody className='text-center w-100'>
                    {
                        data &&
                        data.map((news) => {
                            return (
                                <tr key={news._id}>
                                    <td>{news.image_url}</td>
                                    <td>{news.title}</td>
                                    <td className='text-truncate' style={{ maxWidth: '30em' }}>{news.description}</td>
                                    <td>{news.category}</td>
                                    <td>{news.news_url}</td>
                                    <td><button className='btn btn-success' value='edit' onClick={(e) => handleClick(e, news)}>Editar</button></td>
                                    <td><button className='btn btn-danger' value='delete' onClick={(e) => handleClick(e, news)}>Deletar</button></td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    )

}

export default Table
