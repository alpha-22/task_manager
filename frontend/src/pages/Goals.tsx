import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Goal } from "../types/Goal";
import "./Goals.css";

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    api.get("/goals").then(res => setGoals(res.data));
  }, []);

  const addGoal = async () => {
    if (!title.trim()) return;
    const res = await api.post("/goals", { title });
    setGoals([...goals, res.data]);
    setTitle("");
  };

  return (
    <div className="goals-container">
      <h2 className="goals-title">🎯 Goals</h2>

      <div className="goal-input-wrapper">
        <input
          className="goal-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter your goal..."
        />
        <button className="goal-btn" onClick={addGoal}>
          Add Goal
        </button>
      </div>

      <div className="goal-grid">
        {goals.map(g => (
          <div key={g.id} className="goal-card">
            <h3>{g.title}</h3>
            <p>Progress: {g.progress}%</p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${g.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
