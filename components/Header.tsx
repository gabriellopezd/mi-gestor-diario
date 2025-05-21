import { motion } from "framer-motion";
import { cerrarSesion } from "@/lib/auth";
import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "@/lib/firebase";

interface HeaderProps {
  usuario: User;
  frase: string;
}

export default function Header({ usuario, frase }: HeaderProps) {
  const [nombre, setNombre] = useState<string>("Usuario");

  useEffect(() => {
    const fetchNombre = async () => {
      if (!usuario?.uid) return;
      const docRef = doc(db, "usuarios", usuario.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNombre(data.nombre || "Usuario");
      }
    };
    fetchNombre();
  }, [usuario]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full text-center mb-12 py-10 px-4 rounded-2xl shadow-md
        bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-gray-800 dark:to-gray-900 text-white"
    >
      <div className="flex flex-col items-center gap-3">
        {/* Título principal */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          <span className="text-white">Rise</span>
          <span className="text-yellow-300">UP</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-sm sm:text-base italic opacity-90 -mt-1">
          Impulsa tu día, conquista tus metas.
        </p>

        {/* Bienvenida */}
        <p className="text-base md:text-lg mt-4">
          ¡Bienvenido, <span className="font-bold underline underline-offset-2">{nombre}</span>!
        </p>

        {/* Frase motivacional */}
        <p className="text-sm md:text-base italic opacity-90 mt-1">{frase}</p>

        {/* Menú */}
        <div className="relative mt-4">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="bg-white/90 text-gray-800 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 shadow-md transition">
              ☰ Menú
            </Menu.Button>

            <Menu.Items className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 origin-top bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={cerrarSesion}
                      className={`w-full text-left px-4 py-2 text-sm rounded-md ${
                        active
                          ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Cerrar sesión
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </motion.header>
  );
}