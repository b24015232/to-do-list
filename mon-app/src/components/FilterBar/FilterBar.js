import React from 'react';
import { ETATS } from '../../ENUMS'; // Source unique
import './FilterBar.css';

function FilterBar({ filters, setFilters, folders }) {
    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleFilter = (key, value) => {
        setFilters(prev => {
            const list = prev[key];
            const isSelected = list.includes(value);
            return {
                ...prev,
                [key]: isSelected ? list.filter(item => item !== value) : [...list, value]
            };
        });
    };

    return (
        <div className="modern-filter-container">
            <div className="filter-controls">
                <select value={filters.sortBy} onChange={(e) => updateFilter('sortBy', e.target.value)} className="sort-select">
                    <option value="date_echeance">Trier par : Échéance</option>
                    <option value="date_creation">Trier par : Création</option>
                    <option value="title">Trier par : Nom</option>
                </select>
            </div>

            <div className="filter-group">
                <span className="filter-label">États</span>
                <div className="pills-grid">
                    {Object.values(ETATS).map(status => (
                        <button
                            key={status}
                            onClick={() => toggleFilter('selectedStatuses', status)}
                            className={`status-pill ${filters.selectedStatuses.includes(status) ? 'selected' : ''}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="filter-group">
                <span className="filter-label">Dossiers</span>
                <div className="pills-grid">
                    {folders.map(f => (
                        <button
                            key={f.id}
                            onClick={() => toggleFilter('selectedFolders', f.id)}
                            className={`folder-pill ${filters.selectedFolders.includes(f.id) ? 'selected' : ''}`}
                            style={filters.selectedFolders.includes(f.id) ? { backgroundColor: f.color, color: 'white', borderColor: f.color } : { color: '#374151' }}
                        >
                            {f.title}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FilterBar;