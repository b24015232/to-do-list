import React, { useState, useEffect } from 'react';
import './TaskModal.css';

function TaskModal({ isOpen, onClose, onAddTask, onUpdateTask, taskToEdit, onAddFolder, folders }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('Nouveau');
    const [selectedFolders, setSelectedFolders] = useState([]);
    const [memberName, setMemberName] = useState('');
    const [team, setTeam] = useState([]);
    const [newFolderTitle, setNewFolderTitle] = useState('');
    const [newFolderColor, setNewFolderColor] = useState('#251D82');

    // Pré-remplissage du formulaire en mode Édition
    useEffect(() => {
        if (isOpen) {
            if (taskToEdit) {
                setTitle(taskToEdit.title);
                setDescription(taskToEdit.description || '');
                setDate(taskToEdit.date_echeance || '');
                setStatus(taskToEdit.etat);
                setTeam(taskToEdit.equipiers || []);
                setSelectedFolders(taskToEdit.currentFolderIds || []);
            } else {
                // Reset pour le mode Création
                setTitle('');
                setDescription('');
                setDate('');
                setStatus('Nouveau');
                setSelectedFolders([]);
                setTeam([]);
            }
        }
    }, [isOpen, taskToEdit]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        const taskData = {
            id: taskToEdit ? taskToEdit.id : Date.now(),
            title,
            description,
            date_creation: taskToEdit ? taskToEdit.date_creation : new Date().toISOString().split('T')[0],
            date_echeance: date,
            etat: status,
            equipiers: team
        };

        if (taskToEdit) {
            onUpdateTask(taskData, selectedFolders);
        } else {
            onAddTask(taskData, selectedFolders);
        }
        onClose();
    };

    const handleAddMember = () => {
        if (memberName.trim()) {
            setTeam([...team, { name: memberName.trim() }]);
            setMemberName('');
        }
    };

    const handleCreateFolder = (e) => {
        e.preventDefault();
        if (newFolderTitle.trim()) {
            onAddFolder({
                id: Date.now(),
                title: newFolderTitle,
                color: newFolderColor
            });
            setNewFolderTitle('');
        }
    };

    const toggleFolderSelection = (folderId) => {
        setSelectedFolders(prev =>
            prev.includes(folderId) ? prev.filter(id => id !== folderId) : [...prev, folderId]
        );
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                <h2>{taskToEdit ? "Modifier la tâche" : "Nouvelle tâche"}</h2>

                <form onSubmit={handleSubmit}>
                    <label>Titre</label>
                    <input type="text" placeholder="Nom de la tâche..." value={title} onChange={e => setTitle(e.target.value)} required />

                    <label>Description</label>
                    <textarea placeholder="Ajouter une description..." value={description} onChange={e => setDescription(e.target.value)} />

                    <div className="modal-form-row">
                        <div className="modal-field-group">
                            <label>Échéance</label>
                            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                        </div>
                        <div className="modal-field-group">
                            <label>État</label>
                            <select value={status} onChange={e => setStatus(e.target.value)}>
                                <option value="Nouveau">Nouveau</option>
                                <option value="En cours">En cours</option>
                                <option value="Urgent">Urgent</option>
                                <option value="En attente">En attente</option>
                                <option value="Réussi">Réussi</option>
                                <option value="Abandonné">Abandonné</option>
                            </select>
                        </div>
                    </div>

                    <label>Équipe</label>
                    <div className="modal-team-add">
                        <input type="text" placeholder="Ajouter un membre..." value={memberName} onChange={e => setMemberName(e.target.value)} />
                        <button type="button" onClick={handleAddMember}>+</button>
                    </div>
                    <div className="modal-folders-container" style={{ marginBottom: '15px' }}>
                        {team.map((m, i) => (
                            <span key={i} className="folder-pill" style={{ backgroundColor: '#eee', border: 'none', color: '#333' }}>
                                {m.name}
                            </span>
                        ))}
                    </div>

                    <label>Assigner aux dossiers</label>
                    <div className="modal-folders-container">
                        {folders.map(f => {
                            const isSelected = selectedFolders.includes(f.id);
                            return (
                                <button
                                    key={f.id} type="button"
                                    className={`folder-pill ${isSelected ? 'selected' : ''}`}
                                    style={isSelected ? { backgroundColor: f.color, color: 'white', borderColor: f.color } : { color: f.color, borderColor: f.color }}
                                    onClick={() => toggleFolderSelection(f.id)}
                                >
                                    {f.title}
                                </button>
                            );
                        })}
                    </div>

                    <label>Créer un nouveau dossier</label>
                    <div className="modal-folder-create-row">
                        <input type="text" placeholder="Nom du dossier..." value={newFolderTitle} onChange={e => setNewFolderTitle(e.target.value)} />
                        <input type="color" value={newFolderColor} onChange={e => setNewFolderColor(e.target.value)} />
                        <button type="button" onClick={handleCreateFolder}>Créer</button>
                    </div>

                    <button type="submit" className="modal-submit-final">
                        {taskToEdit ? "Enregistrer les modifications" : "Créer la tâche"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TaskModal;