import React from 'react'


const MODAL = {
    backgroundColor: '#fff',
    position: 'fixed',
    top: '20%',
    left: '25%',
    width: '60%',
    zindex: 100,
}

const DeleteForm = ({ onClose, news, onDelete, updateList }) => {
    const deleteUrl = `${process.env.REACT_APP_API_URL}/news/${news._id}`;

    const handleDelete = () => {
        onDelete(deleteUrl, 'DELETE')
            .then(() => {
                updateList(true)
                onClose();
            });
    }

    return (
        <div style={MODAL} className="shadow p-3 text-center bg-light rounded-3">
            <h4 className=''>Deseja deletar {news.title}?</h4>

            <div className='m-4'>
                <button className='btn btn-danger mx-4' onClick={handleDelete}>Deletar</button>
                <button className='btn btn-secondary mx-4' onClick={onClose}>Cancelar</button>
            </div>
        </div>
    )
}

export default DeleteForm