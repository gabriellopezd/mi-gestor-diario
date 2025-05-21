import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function Registro() {
  const router = useRouter();
  const [modoOscuro, setModoOscuro] = useState(false);
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    password: "",
    fechaNacimiento: "",
    profesion: "",
  });

  useEffect(() => {
    const hora = new Date().getHours();
    setModoOscuro(hora < 6 || hora >= 18);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        datos.correo,
        datos.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: datos.nombre,
        correo: datos.correo,
        fechaNacimiento: datos.fechaNacimiento,
        profesion: datos.profesion,
        uid: user.uid,
      });

      alert("✅ Registro exitoso");
      router.push("/Login");
    } catch (error: any) {
      console.error("❌ Error al registrar:", error.message);
      alert(`Error al registrar: ${error.message}`);
    }
  };

  return (
    <main className={`min-h-screen flex flex-col justify-center items-center px-4 py-10 transition-colors duration-500 ${modoOscuro ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          <span className="text-blue-600">Rise</span>
          <span className="text-yellow-400">UP</span>
        </h1>
        <p className="text-sm italic mt-1">Impulsa tu día, conquista tus metas.</p>
      </div>

      <form
        onSubmit={handleRegistro}
        className={`w-full max-w-md p-6 rounded-xl shadow-lg ${modoOscuro ? 'bg-gray-800' : 'bg-white'}`}
      >
        <h2 className="text-xl font-semibold text-center mb-6">Crea tu cuenta</h2>

        <input
          name="nombre"
          placeholder="Nombre completo"
          onChange={handleChange}
          className="mb-4 w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          required
        />
        <input
          name="correo"
          type="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
          className="mb-4 w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          className="mb-4 w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          required
        />
        <input
          name="fechaNacimiento"
          type="date"
          onChange={handleChange}
          className="mb-4 w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
          required
        />
        <input
          name="profesion"
          placeholder="Profesión"
          onChange={handleChange}
          className="mb-6 w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Comienza tu jornada
        </button>

        <button
          type="button"
          onClick={() => router.push("/Login")}
          className="w-full mt-4 text-sm text-blue-500 hover:underline"
        >
          Ya tengo una cuenta
        </button>
      </form>
    </main>
  );
}
