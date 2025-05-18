import Head from "next/head";
import { SectionedTaskList } from "@/components/SectionedTaskList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mi Gestor Diario</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-200 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-black dark:text-white mb-4">
            Mi Gestor Diario
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Organiza tus hábitos, tareas personales y compromisos profesionales en un solo lugar
          </p>
        </header>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-8 text-center">
            🧘 Tareas Personales
          </h2>
          <SectionedTaskList
            title=""
            sections={[
              { key: "habitos", label: "🧘 Hábitos" },
              { key: "compras", label: "🛒 Compras" },
            ]}
          />
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-8 text-center">
            💼 Compromisos Profesionales
          </h2>
          <SectionedTaskList
            title=""
            sections={[
              { key: "cnmh", label: "🏛️ CNMH" },
              { key: "mjd", label: "⚖️ MJD" },
              { key: "ingennia", label: "🚀 Ingennia" },
            ]}
          />
        </section>
      </main>
    </>
  );
}
