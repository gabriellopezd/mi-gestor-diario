import { useEffect, useState } from "react";
import {
  crearTarea,
  escucharTareas,
  alternarTarea,
  eliminarTarea,
} from "@/lib/firestore";

interface Tarea {
  id: string;
  text: string;
  done: boolean;
  categoria: string;
}

export default function ComprasTaskList() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  useEffect(() => {
    const unsubscribe = escucharTareas("compras", setTareas);
    return () => unsubscribe();
  }, []);

  const handleAgregar = async () => {
    if (!nuevaTarea.trim()) return;
    await crearTarea(nuevaTarea, "compras");
    setNuevaTarea("");
  };

  const handleAlternar = async (id: string, estado: boolean) => {
    await alternarTarea(id, estado);
  };

  const handleEliminar = async (id: string) => {
    const confirmacion = confirm("¿Deseas eliminar esta tarea?");
    if (!confirmacion) return;
    await eliminarTarea(id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
      <h3 className="text-lg font-bold mb-4 text-black dark:text-white">
        Tareas de Compras
      </h3>

      <div className="flex gap-3 mb-6">
        <input
          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded"
          placeholder="Escribe una tarea..."
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          onClick={handleAgregar}
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-3">
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded"
          >
            <span
              className={`flex-1 ${
                tarea.done ? "line-through text-gray-400" : "text-black dark:text-white"
              }`}
            >
              {tarea.text}
            </span>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => handleAlternar(tarea.id, !tarea.done)}
                className={`px-3 py-1 text-sm rounded-full transition-all ${
                  tarea.done
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
                }`}
              >
                {tarea.done ? "Hecho" : "Pendiente"}
              </button>
              <button
                onClick={() => handleEliminar(tarea.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}