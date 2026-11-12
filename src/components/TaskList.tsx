import TaskItem from "./TaskItem";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
}

function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit
}: TaskListProps) {

  if (tasks.length === 0) {
    return (
      <p className="empty">
        Nenhuma tarefa encontrada.
      </p>
    );
  }

  return (
    <div className="task-list">

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}

    </div>
  );
}

export default TaskList;
