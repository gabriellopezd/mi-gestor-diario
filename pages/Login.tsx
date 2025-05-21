import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { iniciarSesion } from "@/lib/auth";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [mostrarClave, setMostrarClave] = useState(false);
  const router = useRouter();

  // Detectar automáticamente modo claro/oscuro según la hora
  useEffect(() => {
    const hora = new Date().getHours();
    const esOscuro = hora < 6 || hora >= 18;
    document.documentElement.classList.toggle("dark", esOscuro);
  }, []);

  const handleLogin = async () => {
    try {
      await iniciarSesion(correo, contraseña);
      router.push("/");
    } catch (err) {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 transition-colors duration-500 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-2">
          Rise<span className="text-yellow-400">UP</span>
        </h1>
        <p className="text-center text-sm text-gray-500 dark:text-gray-300 mb-6 italic">
          ¡Construye hábitos que transformen tu día!
        </p>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-gray-700 dark:text-gray-200 mb-1">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm text-gray-700 dark:text-gray-200 mb-1">
            Contraseña
          </label>
          <input
            id="password"
            type={mostrarClave ? "text" : "password"}
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => setMostrarClave(!mostrarClave)}
            className="absolute right-3 top-8 text-sm text-blue-600 dark:text-blue-300"
          >
            {mostrarClave ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Comienza tu jornada
        </button>

        <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-300">
          ¿Aún no tienes cuenta?{" "}
          <a href="/registro" className="text-blue-600 hover:underline dark:text-blue-400">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}