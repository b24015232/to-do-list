import './TaskCard.css'

function TaskCard({ task, folders }) {

    const colorMap = {
        "bluesky": "skyblue",
        "orange": "orange",
        "pink": "pink",
        "green": "green"
    };

    const hasEquipiers = task.equipiers && task.equipiers.length > 0;
    const backgroundColor = folders && folders.length > 0 ? folders[0].color : '#39393D';
    const validColor = colorMap[backgroundColor] || backgroundColor;
    return (
        <li className="task-item" key={task.id} style={{ backgroundColor: validColor }}>
            <div className="task-main-info">
                <strong>{task.title}</strong>
                <br />
                <span className="task-date">Échéance : {task.date_echeance}</span>
            </div>
            {hasEquipiers && (
                <div className="task-team-section">
                    <strong> Equipe : </strong>
                    {task.equipiers.map((membre, index) => (
                        <span className="team-member" key={index}>
                            {membre.name}
                        </span>
                    ))}
                </div>

            )}
            <div className="task-folders">
                {folders && folders.map(folder => (
                    <span
                        key={folder.id}
                        className="folder-tag"
                        style={{ backgroundColor: folder.color }} // On utilise la couleur du JSON [cite: 14, 15, 17]
                    >
                        {folder.title}
                    </span>
                ))}
            </div>

        </li>
    )
}

export default TaskCard