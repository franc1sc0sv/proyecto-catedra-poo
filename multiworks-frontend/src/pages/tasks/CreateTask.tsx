import { useState } from "react";

console.log(createTask);

import { Button } from "../../components/Buttons/Button";
import { createTask } from "../../api/task";
import type { TaskDto } from "../../interfaces/task.interface";

export const CreateTask = ({ assignmentId, onCreated }: {
  assignmentId: string;
  onCreated?: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newTask: TaskDto = {
      title,
      description,
    };

    try {
      await createTask(assignmentId, newTask);
      setTitle("");
      setDescription("");
      if (onCreated) onCreated(); 
    } catch (error) {
      console.error("Error creando tarea", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Crear Nueva Tarea</h2>
      <div className="mb-4">
        <label className="block font-medium mb-1">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2"
          rows={3}
        />
      </div>
      <Button type="submit" className="w-full">
        {loading ? "Creando..." : "Crear Tarea"}
      </Button>
    </form>
  );
};
