import { useEffect, useState } from "react";
import {
  crearTarea,
  escucharTareas,
  alternarTarea,
  eliminarTarea,
} from "@/lib/firestore";

type Props = {
  categoria: string; // "compras", "CNMH", etc.
};

export function TaskList({ categoria }: Props) {
  const [tareas, setTareas] = useState<any[]>([]);
  const [nueva, setNueva] = useState("");

  useEffect(() => {
    const unsub = escucharTareas(categoria, setTareas);
    return () => unsub();
  }, [categoria]);

  const agregar = async () => {
    if (!nueva.trim()) return;
    await crearTarea(nueva, categoria);
    setNueva("");
  };

  const toggle = async (id: string, estado: boolean) => {
    await alternarTarea(id, !estado);
  };

  const eliminar = async (id: string) => {
    const ok = confirm("¿Eliminar esta tarea?");
    if (ok) await eliminarTarea(id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
      <div className="flex gap-2 mb-4">
        <input
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          className="flex-1 p-2 rounded border dark:bg-gray-800 dark:text-white"
          placeholder="Escribe una tarea..."
        />
        <button
          onClick={agregar}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Agregar
        </button>
      </div>
      <ul className="space-y-2">
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded"
          >
            <span
              className={`flex-1 ${
                tarea.done ? "line-through text-gray-400" : "text-black dark:text-white"
              }`}
            >
              {tarea.text}
            </span>
            <button
              onClick={() => toggle(tarea.id, tarea.done)}
              className={`text-sm px-2 py-1 rounded ${
                tarea.done
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
              }`}
            >
              {tarea.done ? "Hecho" : "Pendiente"}
            </button>
            <button
              onClick={() => eliminar(tarea.id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}