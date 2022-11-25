import React from 'react'

const OVERLAY = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zindex: 100,
}

const MODAL = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zindex: 100,
}

const Modal = ({ children, open, onClose }) => {

    if (!open) {
        return null;
    }

    return (
        <>
            <div style={OVERLAY} onClick={onClose}></div>

            { children }

            {/* <button style={MODAL} onClick={onClose}>close</button> */}
        </>
    )
}

export default Modal