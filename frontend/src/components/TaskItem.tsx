import type { Task } from "../types/Task";
import "./TaskItem.css";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className="task-card">
      <div className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <span
          className={`task-title ${
            task.completed ? "task-completed" : ""
          }`}
        >
          {task.title}
        </span>
      </div>

      <button onClick={() => onDelete(task.id)}>❌</button>
    </div>
  );
};

export default TaskItem;
