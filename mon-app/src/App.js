import { useState } from 'react';
import TaskCard from './components/TaskCard/TaskCard';
import Header from './components/Header/Header';
import FilterBar from './components/FilterBar/FilterBar';
import TaskModal from './components/TaskModal/TaskModal';
import Footer from './components/Footer/Footer';
import data from './data.json';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(data.taches);
  const [relations, setRelations] = useState(data.relations);
  const [folders, setFolders] = useState(data.dossiers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [filters, setFilters] = useState({
    sortBy: 'date_echeance',
    selectedStatuses: [], // Gère maintenant les filtres par état
    selectedFolders: []
  });

  const resetToBackup = () => {
    if (window.confirm("Réinitialiser les données ?")) {
      setTasks(data.taches);
      setRelations(data.relations);
      setFolders(data.dossiers);
    }
  };

  const handleAddTask = (newTask, selectedFolderIds) => {
    setTasks([newTask, ...tasks]);
    const newRelations = selectedFolderIds.map(fId => ({ tache: newTask.id, dossier: fId }));
    setRelations([...newRelations, ...relations]);
  };

  const handleUpdateTask = (updatedTask, selectedFolderIds) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    const otherRelations = relations.filter(rel => rel.tache !== updatedTask.id);
    const newRelations = selectedFolderIds.map(fId => ({ tache: updatedTask.id, dossier: fId }));
    setRelations([...otherRelations, ...newRelations]);
    setTaskToEdit(null);
  };

  const handleOpenEdit = (task) => {
    const currentFolderIds = relations.filter(r => r.tache === task.id).map(r => r.dossier);
    setTaskToEdit({ ...task, currentFolderIds });
    setIsModalOpen(true);
  };

  const tasksToDisplay = tasks
    .filter(task => {
      // Filtre par États (Nouveau, En cours, etc.)
      if (filters.selectedStatuses.length > 0 && !filters.selectedStatuses.includes(task.etat)) return false;

      // Filtre par Dossiers
      if (filters.selectedFolders.length > 0) {
        const currentTaskFolderIds = relations.filter(r => r.tache === task.id).map(r => r.dossier);
        if (!filters.selectedFolders.some(id => currentTaskFolderIds.includes(id))) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'title') return a.title.localeCompare(b.title);
      if (filters.sortBy === 'date_echeance') return new Date(b.date_echeance) - new Date(a.date_echeance);
      return new Date(b.date_creation) - new Date(a.date_creation);
    });

  return (
    <div className="App">
      <Header tasks={tasks} />
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        folders={folders}
      />
      <ul className="task-list">
        {tasksToDisplay.length > 0 ? (
          tasksToDisplay.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              folders={relations.filter(rel => rel.tache === task.id).map(rel => folders.find(d => d.id === rel.dossier)).filter(f => f)}
              onEdit={() => handleOpenEdit(task)}
            />
          ))
        ) : (
          <p className="no-task">Aucune tâche ne correspond aux filtres.</p>
        )}
      </ul>
      <Footer onReset={resetToBackup} onOpenModal={() => { setTaskToEdit(null); setIsModalOpen(true); }} />
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setTaskToEdit(null); }}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        taskToEdit={taskToEdit}
        folders={folders}
        onAddFolder={(f) => setFolders([...folders, f])}
      />
    </div>
  );
}

export default App;