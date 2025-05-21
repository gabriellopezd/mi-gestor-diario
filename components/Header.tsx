import { motion } from "framer-motion";
import { cerrarSesion } from "@/lib/auth";
import { User } from "firebase/auth";
import { Menu, MenuButton, MenuItem, MenuItems } from "@/components/ui/dropdown";

interface HeaderProps {
  usuario: User;
  frase: string;
}

export default function Header({ usuario, frase }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full text-center mb-12 py-10 px-4 rounded-2xl shadow-md
        bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-gray-800 dark:to-gray-900
        text-white"
    >
      <div className="flex flex-col items-center gap-2 md:gap-4">
        {/* Título */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          <span className="text-white">Rise</span>
          <span className="text-yellow-300">UP</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-sm sm:text-base italic opacity-90 -mt-1">
          Impulsa tu día, conquista tus metas.
        </p>

        {/* Mensaje de bienvenida */}
        <p className="text-base md:text-lg mt-4">
    ¡Bienvenido, <span className="font-bold underline underline-offset-2">{usuario.nombre ?? "Usuario"}</span>!
    </p>

        {/* Frase motivacional */}
        <p className="text-sm md:text-base italic opacity-90 mt-1">{frase}</p>

        {/* Menú */}
        <div className="mt-4">
          <Menu>
            <MenuButton className="bg-white/90 text-gray-800 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 shadow-md transition">
              ☰ Menú
            </MenuButton>
            <MenuItems className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg mt-2 w-40 text-left">
              <MenuItem
                onSelect={cerrarSesion}
                className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
              >
                Cerrar sesión
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </motion.header>
  );
}