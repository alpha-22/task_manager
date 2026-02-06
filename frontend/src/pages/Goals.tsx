import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Goal } from "../types/Goal";
export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    api.get("/goals").then(res => setGoals(res.data));
  }, []);

  const addGoal = async () => {
    const res = await api.post("/goals", { title });
    setGoals([...goals, res.data]);
    setTitle("");
  };

  return (
    <div>
      <h2>Goals</h2>

      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={addGoal}>Add Goal</button>

      {goals.map(g => (
        <div key={g.id}>
          {g.title} — {g.progress}%
        </div>
      ))}
    </div>
  );
}
