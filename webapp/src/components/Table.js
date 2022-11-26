import React from 'react'

const IMAGE = {
    maxWidth: '225px',
    maxHeight: '118px',
    width: 'auto',
    height: 'auto',
    borderRadius: '7px',
}

const TDATA = {
    maxWidth: '225px',
    height: '118px',
}

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
                                    <td className='p-0'><img src={news.image_url} style={IMAGE} /></td>
                                    <td className='text-truncate' style={TDATA}>{news.title}</td>
                                    <td className='text-truncate' style={TDATA}>{news.description}</td>
                                    <td>{news.category}</td>
                                    <td className='text-truncate' style={TDATA}>
                                        <a
                                            href={news.news_url}
                                            target='_blank'
                                            className='link-dark'>
                                            {news.news_url}
                                        </a>
                                    </td>
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
