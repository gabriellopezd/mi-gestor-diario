import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/hooks/useAuth";
import Header from "@/components/Header";
import { SectionedTaskList } from "@/components/SectionedTaskList";

const frasesMotivadoras = [
  "Hoy es un día perfecto para avanzar.",
  "Vamos por esos sueños.",
  "Haz que este día cuente.",
  "Tu constancia define tu éxito.",
  "Cree en ti, es tu momento.",
  "Paso a paso, se construyen logros.",
];

export default function Home() {
  const { usuario, cargando } = useAuth();
  const router = useRouter();
  const [frase, setFrase] = useState("");
  const [modoOscuro, setModoOscuro] = useState(false);

  useEffect(() => {
    if (!cargando && !usuario) {
      router.replace("/Login");
    }
  }, [usuario, cargando, router]);

  useEffect(() => {
    const hora = new Date().getHours();
    setModoOscuro(hora < 6 || hora >= 18);

    const randomIndex = Math.floor(Math.random() * frasesMotivadoras.length);
    setFrase(frasesMotivadoras[randomIndex]);
  }, []);

  if (cargando) return <p className="text-center mt-20">Verificando sesión...</p>;
  if (!usuario) return null;

  return (
    <main
      className={`min-h-screen w-full px-4 py-10 transition-colors duration-500 ${
        modoOscuro
          ? "bg-[#0f1117] text-white"
          : "bg-[#f9fafb] text-gray-900"
      }`}
    >
      <Header usuario={usuario} frase={frase} />

      <section className="my-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          🧘 Tareas Personales
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <SectionedTaskList
            title=""
            sections={[{ key: "habitos", label: "🧘 Hábitos" }]}
            containerClassName="min-w-[300px] w-full max-w-full"
          />
          <SectionedTaskList
            title=""
            sections={[{ key: "compras", label: "🛒 Compras" }]}
            containerClassName="min-w-[300px] w-full max-w-full"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-center mb-8">
          💼 Compromisos Profesionales
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <SectionedTaskList
            title=""
            sections={[{ key: "cnmh", label: "🏛️ CNMH" }]}
            containerClassName="min-w-[300px] w-full max-w-full"
          />
          <SectionedTaskList
            title=""
            sections={[{ key: "mjd", label: "⚖️ MJD" }]}
            containerClassName="min-w-[300px] w-full max-w-full"
          />
          <SectionedTaskList
            title=""
            sections={[{ key: "ingennia", label: "🚀 Ingennia" }]}
            containerClassName="min-w-[300px] w-full max-w-full"
          />
        </div>
      </section>
    </main>
  );
}