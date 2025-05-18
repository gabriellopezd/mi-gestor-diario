import { useEffect, useState } from "react";
import { format, subDays } from "date-fns";
import { es } from "date-fns/locale";
import {
  crearHabito,
  escucharHabitos,
  alternarRegistroDiario,
  eliminarHabito,
} from "@/lib/firestore";

export function HabitTracker() {
  const [habits, setHabits] = useState<any[]>([]);
  const [newHabit, setNewHabit] = useState("");
  const [loading, setLoading] = useState(true); // ✅ indicador de carga

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const diasSemana = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);
    return {
      label: format(date, "EEE", { locale: es }),
      value: format(date, "yyyy-MM-dd"),
    };
  });

  useEffect(() => {
    const unsub = escucharHabitos((data) => {
      setHabits(data);
      setLoading(false); // ✅ apagamos el loading cuando llegan los datos
    });
    return () => unsub();
  }, []);

  const handleAddHabit = async () => {
    if (!newHabit.trim()) return;
    await crearHabito(newHabit);
    setNewHabit("");
  };

  const handleDelete = async (id: string) => {
    const confirmacion = confirm("¿Estás seguro de eliminar este hábito?");
    if (!confirmacion) return;
    await eliminarHabito(id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
      <h3 className="text-lg font-bold mb-4 text-black dark:text-white">
        Seguimiento Diario de Hábitos
      </h3>

      <div className="flex gap-3 mb-6">
        <input
          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded"
          placeholder="Nuevo hábito"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          onClick={handleAddHabit}
        >
          Agregar
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Cargando hábitos...</p>
      ) : habits.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No hay hábitos aún.</p>
      ) : (
        <ul className="space-y-4">
          {habits.map((habit) => (
            <li key={habit.id}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-black dark:text-white font-medium">
                  {habit.name}
                </span>
                <button
                  onClick={() => handleDelete(habit.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                  title="Eliminar hábito"
                >
                  ❌
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {diasSemana.map((dia) => {
                  const checked = habit.registros?.[dia.value] || false;
                  return (
                    <button
                      key={dia.value}
                      onClick={() =>
                        alternarRegistroDiario(habit.id, dia.value, !checked)
                      }
                      className={`rounded-full text-sm px-2 py-1 transition-colors font-semibold ${
                        checked
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
                      }`}
                      title={dia.value}
                    >
                      {dia.label}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}