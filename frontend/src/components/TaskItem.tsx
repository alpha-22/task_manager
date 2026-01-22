import type { Task } from "../types/Task";
import { Checkbox, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./TaskItem.css";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <Paper elevation={1} className="task-row">
      <div className="task-grid">
        <Checkbox
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <div
          className={`task-title ${
            task.completed ? "task-completed" : ""
          }`}
        >
          {task.title}
        </div>
        <div className="task-action">
          <IconButton onClick={() => onDelete(task.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
};

export default TaskItem;
