import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/hooks/useAuth";
import { cerrarSesion } from "@/lib/auth";
import { SectionedTaskList } from "@/components/SectionedTaskList";
import { motion } from "framer-motion";
import Image from "next/image";

const frasesMotivadoras = [
  "Hoy es un día perfecto para avanzar.",
  "Tienes un día por delante.",
  "Vamos por esos sueños.",
  "Haz que este día cuente.",
  "Tu constancia define tu éxito.",
  "Cree en ti, es tu momento.",
  "Paso a paso, se construyen logros."
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
    const randomIndex = Math.floor(Math.random() * frasesMotivadoras.length);
    setFrase(frasesMotivadoras[randomIndex]);

    const hora = new Date().getHours();
    setModoOscuro(hora < 6 || hora >= 18);
  }, []);

  if (cargando) return <p className="text-center mt-20">Verificando sesión...</p>;
  if (!usuario) return null;

  return (
    <main className={`min-h-screen w-full px-6 py-10 transition-colors duration-500 ${modoOscuro ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-blue-200 text-gray-900'}`}>
      <header className="flex flex-col items-center gap-3 text-center bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-10 px-6 rounded-xl shadow-lg mb-12">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width={48} height={48} />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Gestor de Hábitos y Tareas
          </h1>
        </div>
        <p className="text-lg font-medium">
          ¡Bienvenido, <span className="font-bold underline underline-offset-2">{usuario?.displayName ?? "Usuario"}</span>!
        </p>
        <p className="text-sm italic opacity-80">{frase}</p>
        <button
          className="mt-4 px-6 py-2 rounded-md bg-white text-red-600 hover:bg-gray-100 transition font-semibold"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>
      </header>

      <section className="my-16">
        <h2 className="text-2xl font-bold text-center mb-8">🧘 Tareas Personales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
        <h2 className="text-2xl font-bold text-center mb-8">💼 Compromisos Profesionales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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