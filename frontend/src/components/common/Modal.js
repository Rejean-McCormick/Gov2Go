import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css'; // Import the associated CSS file for styling

const Modal = ({ isOpen, title, content, onClose }) => {
    if (!isOpen) return null; // Don't render anything if modal is not open

    const closeModal = () => {
        if (onClose) onClose(); // Trigger the onClose function if provided
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{title}</h2>
                <div>{content}</div>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

// Prop types for type checking
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    onClose: PropTypes.func,
};

// Default props
Modal.defaultProps = {
    onClose: null,
};

export default Modal;
 
