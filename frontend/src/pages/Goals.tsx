import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Goal } from "../types/Goal";
import "./Goals.css";

/* Animated Number Component */
const AnimatedNumber = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = display;
    const end = value;
    const duration = 400;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = (end - start) / steps;

    const interval = setInterval(() => {
      start += increment;

      if (
        (increment > 0 && start >= end) ||
        (increment < 0 && start <= end)
      ) {
        clearInterval(interval);
        setDisplay(end);
      } else {
        setDisplay(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [value]);

  return <>{display}%</>;
};

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    api.get("/goals").then(res => setGoals(res.data));
  }, []);

  const addGoal = async () => {
    if (!title.trim()) return;

    const res = await api.post("/goals", { title });
    setGoals([res.data, ...goals]);
    setTitle("");
  };

  const updateProgress = async (id: number, newProgress: number) => {
    if (newProgress < 0) newProgress = 0;
    if (newProgress > 100) newProgress = 100;

    const res = await api.put(`/goals/${id}/progress`, {
      progress: newProgress,
    });

    setGoals(goals.map(g => (g.id === id ? res.data : g)));
  };

  const removeGoal = async (id: number) => {
    await api.delete(`/goals/${id}`);
    setGoals(goals.filter(g => g.id !== id));
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

            {/* Delete Button */}
            <button
              className="goal-delete"
              onClick={() => removeGoal(g.id)}
            >
              ✕
            </button>

            <h3 className="goal-name">{g.title}</h3>

            <div className="circle-container">
              <div
                className="circle"
                style={{
                  background: `conic-gradient(#008080 ${
                    g.progress * 3.6
                  }deg, #e6e6e6 0deg)`
                }}
              >
                <div className="circle-inner">
                  <AnimatedNumber value={g.progress} />
                </div>
              </div>
            </div>

            <div className="goal-buttons">
              <button
                onClick={() => updateProgress(g.id, g.progress + 10)}
              >
                +10%
              </button>
              <button
                onClick={() => updateProgress(g.id, g.progress - 10)}
              >
                -10%
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
