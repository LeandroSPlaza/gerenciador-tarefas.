import { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
}

function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit
}: TaskItemProps) {

  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  function handleSave() {
    if (newTitle.trim() === "") {
      alert("A descrição não pode ficar vazia!");
      return;
    }

    onEdit(task.id, newTitle.trim());
    setEditing(false);
  }

  return (
    <div className="task-item">

      <input
        type="checkbox"
        aria-label={task.title}
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {editing ? (
        <>
          <input
            aria-label="Editar descrição da tarefa"
            value={newTitle}
            onChange={(event) =>
              setNewTitle(event.target.value)
            }
          />

          <button onClick={handleSave}>
            Salvar
          </button>

          <button onClick={() => {
            setNewTitle(task.title);
            setEditing(false);
          }}>
            Cancelar
          </button>
        </>
      ) : (
        <>
          <span className={task.completed ? "completed" : ""}>
            {task.title}
          </span>

          <button onClick={() => setEditing(true)}>
            Editar
          </button>

          <button onClick={() => onDelete(task.id)}>
            Excluir
          </button>
        </>
      )}

    </div>
  );
}

export default TaskItem;
