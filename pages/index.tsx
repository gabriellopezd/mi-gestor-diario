// pages/index.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/hooks/useAuth";
import { cerrarSesion } from "@/lib/firebase";
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

  useEffect(() => {
    if (!cargando && !usuario) {
      router.replace("/login");
    }
  }, [usuario, cargando, router]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * frasesMotivadoras.length);
    setFrase(frasesMotivadoras[randomIndex]);
  }, []);

  if (cargando) return <p className="text-center mt-20">Verificando sesión...</p>;
  if (!usuario) return null;

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-200 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex justify-center items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Gestor de hábitos y tareas
          </h1>
        </div>
        <p className="mt-2 text-lg font-medium">
          ¡Bienvenido, <span className="font-bold">{usuario?.email}</span>!
        </p>
        <p className="text-gray-600 italic text-sm mb-4">{frase}</p>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-4 rounded-md mb-10"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>
      </motion.div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-black text-center mb-8">🧘 Tareas Personales</h2>
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
        <h2 className="text-2xl font-bold text-black text-center mb-8">💼 Compromisos Profesionales</h2>
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
