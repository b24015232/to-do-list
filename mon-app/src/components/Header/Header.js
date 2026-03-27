// src/components/Header/Header.js
import React from 'react';
import { ETAT_TERMINE } from '../../ENUMS'; // Utilisation de tes constantes
import './Header.css';

function Header({ tasks }) {
    // 1. Nb total de Taches (sans filtre)
    const totalTasks = tasks.length;

    // 2. Nb non finis (Filtre par défaut : pas dans ETAT_TERMINE)
    const unfinishedTasks = tasks.filter(task => !ETAT_TERMINE.includes(task.etat)).length;

    // Calcul du pourcentage pour une barre de progression discrète
    const progress = totalTasks > 0 ? ((totalTasks - unfinishedTasks) / totalTasks) * 100 : 0;

    return (
        <header className="mobile-header">
            <div className="header-content">
                <h1>Ma ToDo</h1>

                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-value">{totalTasks}</span>
                        <span className="stat-label">Total</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value highlight">{unfinishedTasks}</span>
                        <span className="stat-label">À faire</span>
                    </div>
                </div>

                {/* Petite barre de progression épurée */}
                <div className="progress-container">
                    <div
                        className="progress-bar"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </header>
    );
}

export default Header;