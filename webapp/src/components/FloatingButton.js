import React from 'react'

const TEXT_OUTLINE = {
    textShadow: '1px 1px 1px #eee',
}

const FloatingButton = ({ display, handleClick }) => {
    if (!display) {
        return null;
    }

    return (
        <button
            className="btn btn-primary rounded-pill position-fixed bottom-0 end-0 m-5 py-0"
            onClick={handleClick}>
            <h1 style={TEXT_OUTLINE}>+</h1>
        </button>
    );
}

export default FloatingButton