import { useState } from "react";

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (title.trim() === "") {
      alert("Digite uma tarefa!");
      return;
    }

    onAddTask(title.trim());
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        aria-label="Nova tarefa"
        placeholder="Digite uma nova tarefa..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <button type="submit">
        Adicionar tarefa
      </button>
    </form>
  );
}

export default TaskForm;
