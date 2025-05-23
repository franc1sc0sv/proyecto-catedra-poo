import { useEffect, useState } from "react";
import type { TaskResponse } from "../../interfaces/task.interface";
import { getTasksByAssignment } from "../../api/task";

export const TaskList = ({ assignmentId }: { assignmentId: string }) => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasksByAssignment(assignmentId);
        setTasks(response.data);
      } catch (error) {
        console.error("Error loading tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [assignmentId]);

  if (loading) return <p>Cargando tareas...</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Lista de Tareas</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-3 border rounded-md hover:bg-gray-100 transition"
          >
            <h3 className="font-semibold">{task.title}</h3>
            {task.description && <p className="text-gray-600">{task.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};
