import { useEffect, useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import {enUS} from "date-fns/locale/en-US";
import { api } from "../services/api";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface EventType {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [tasksRes, goalsRes] = await Promise.all([
        api.get("/tasks"),
        api.get("/goals"),
      ]);

      const taskEvents = tasksRes.data.map((task: any) => ({
        title: `📝 ${task.title}`,
        start: new Date(task.createdAt),
        end: new Date(task.createdAt),
        allDay: true,
      }));

      const goalEvents = goalsRes.data.map((goal: any) => ({
        title: `🎯 ${goal.title}`,
        start: new Date(goal.createdAt),
        end: new Date(goal.createdAt),
        allDay: true,
      }));

      setEvents([...taskEvents, ...goalEvents]);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", height: "90vh" }}>
      <h2>📅 Activity Calendar</h2>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}
