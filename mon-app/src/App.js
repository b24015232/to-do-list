import logo from './logo.svg';
import './App.css'
import { useState } from 'react'
import TaskCard from './components/TaskCard/TaskCard'
import data from './data.json'
import { ETAT_TERMINE } from './ENUMS';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(data.taches)
  const getFoldersForTask = (taskId) => {

    const taskRelations = data.relations.filter(rel => rel.tache === taskId);
    return taskRelations.map(rel => {
      return data.dossiers.find(d => d.id === rel.dossier);
    });
  };
  const tasksToDisplay = tasks
  return (
    <div className="App">
      <h1>ToDo List</h1>
      <ul>
        {tasksToDisplay.map(task => (
          <TaskCard key={task.id} task={task} folders={getFoldersForTask(task.id)}></TaskCard>
        ))}
      </ul>
    </div>
  );
}

export default App;
