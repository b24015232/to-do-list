import React, { useState } from 'react';
import './TaskCard.css';

function TaskCard({ task, folders, onEdit }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <li className={`task-item ${isExpanded ? 'is-expanded' : ''}`}>
            <div className="task-header">
                <div className="task-main-info">
                    <button className="toggle-icon" onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? '▼' : '▶'}
                    </button>
                    <h3 className="task-title-text">{task.title}</h3>
                </div>
                <div className="task-actions">
                    <button className="edit-card-btn" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                        ✏️
                    </button>
                    <span className={`status-badge ${task.etat.replace(' ', '-').toLowerCase()}`}>
                        {task.etat}
                    </span>
                </div>
            </div>
            <div className="task-details-wrapper">
                <div className="task-details">
                    <hr className="separator" />
                    <p className="task-info-line">Échéance : {task.date_echeance}</p>
                    <p className="task-info-line description">{task.description || "Aucune description."}</p>
                    <div className="task-info-line">
                        <strong>Équipe :</strong>
                        {task.equipiers?.length > 0 ? task.equipiers.map((m, i) => (
                            <span key={i} className="team-member">{m.name}</span>
                        )) : " Aucune équipe"}
                    </div>
                    <div className="task-info-line">
                        <strong>Dossiers :</strong>
                        {folders.map(f => (
                            <span key={f.id} className="folder-badge" style={{ backgroundColor: f.color }}>{f.title}</span>
                        ))}
                    </div>
                </div>
            </div>
        </li>
    );
}

export default TaskCard;