import React from 'react';
import './Footer.css';

// On reçoit les fonctions onReset et onOpenModal depuis App.js
function Footer({ onReset, onOpenModal }) {
    return (
        <footer className="mobile-footer">
            <button className="reset-link" onClick={onReset}>
                Réinitialiser
            </button>
            <button className="add-task-btn" onClick={onOpenModal}>
                +
            </button>
        </footer>
    );
}

export default Footer;