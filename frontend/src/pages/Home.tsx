import { useEffect, useState } from "react";
import type { Task } from "../types/Task";
import { api } from "../services/api";
import TaskItem from "../components/TaskItem";
import "../App.css";

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    api.get("/tasks").then(res => setTasks(res.data));
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    const res = await api.post("/tasks", { title });
    setTasks([res.data, ...tasks]);
    setTitle("");
  };

  const toggleTask = async (id: number) => {
    const res = await api.put(`/tasks/${id}`);
    setTasks(tasks.map(t => (t.id === id ? res.data : t)));
  };

  const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="app-container">
      <h2 className="app-title">Task Manager</h2>

      <div className="add-task">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="task-header">
        <div>Status</div>
        <div>Task</div>
        <div>Action</div>
      </div>

      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      ))}
    </div>
  );
}

export default Home;
