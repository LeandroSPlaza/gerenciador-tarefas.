import "./App.css";
import { useEffect, useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

type Filter = "all" | "pending" | "completed";

function App() {

  // Recupera as tarefas salvas no navegador
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");

      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  // Controla o filtro selecionado
  const [filter, setFilter] = useState<Filter>("all");

  // Salva as alterações no LocalStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Cadastrar tarefa
  function addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks((previousTasks) => [
      ...previousTasks,
      newTask
    ]);
  }

  // Concluir ou reabrir tarefa
  function toggleTask(id: number) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // Excluir tarefa
  function deleteTask(id: number) {
    const confirmation = window.confirm(
      "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmation) return;

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  // Editar tarefa
  function editTask(id: number, title: string) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, title: title }
          : task
      )
    );
  }

  // Aplicar filtros
  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  // Contadores
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = total - completed;

  return (
    <main className="container">

      <header className="header">
        <h1>Meu Gerenciador de Tarefas</h1>

        <p>
          Organize suas atividades de forma simples.
        </p>
      </header>

      <section className="summary">

        <div className="summary-card">
          <strong>{total}</strong>
          <span>Total de tarefas</span>
        </div>

        <div className="summary-card">
          <strong>{pending}</strong>
          <span>Pendentes</span>
        </div>

        <div className="summary-card">
          <strong>{completed}</strong>
          <span>Concluídas</span>
        </div>

      </section>

      <section className="content">

        <h2>Adicionar tarefa</h2>

        <TaskForm onAddTask={addTask} />

        <h2>Minhas tarefas</h2>

        <nav className="filters">

          <button
            aria-pressed={filter === "all"}
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            Todas
          </button>

          <button
            aria-pressed={filter === "pending"}
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pendentes
          </button>

          <button
            aria-pressed={filter === "completed"}
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Concluídas
          </button>

        </nav>

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />

      </section>

      <footer>
        <p>Gerenciador de Tarefas - Projeto Acadêmico</p>
      </footer>

    </main>
  );
}

export default App;
