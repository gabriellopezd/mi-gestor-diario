import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function Registro() {
  const router = useRouter();
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    password: "",
    fechaNacimiento: "",
    profesion: "",
  });

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
    <form
      onSubmit={handleRegistro}
      className="max-w-md mx-auto p-4 mt-10 bg-white shadow rounded"
    >
      <h2 className="text-xl font-bold mb-4">Crear cuenta</h2>
      <input
        name="nombre"
        placeholder="Nombre de usuario"
        onChange={handleChange}
        className="mb-2 w-full p-2 border"
      />
      <input
        name="correo"
        type="email"
        placeholder="Correo"
        onChange={handleChange}
        className="mb-2 w-full p-2 border"
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={handleChange}
        className="mb-2 w-full p-2 border"
      />
      <input
        name="fechaNacimiento"
        type="date"
        onChange={handleChange}
        className="mb-2 w-full p-2 border"
      />
      <input
        name="profesion"
        placeholder="Profesión"
        onChange={handleChange}
        className="mb-2 w-full p-2 border"
      />
      <button type="submit" className="btn bg-blue-600 text-white px-4 py-2 rounded">
        Registrarse
      </button>
    </form>
  );
}