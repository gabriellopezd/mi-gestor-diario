// lib/auth.ts
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// REGISTRO
export const registrarUsuario = async (
  nombre: string,
  correo: string,
  contraseña: string
) => {
  const credenciales = await createUserWithEmailAndPassword(auth, correo, contraseña);

  // Guardamos el nombre en el perfil
  await updateProfile(credenciales.user, { displayName: nombre });

  // 🔄 Recargamos el perfil del usuario
  await credenciales.user.reload();

  // ✅ Obtenemos el usuario actualizado
  const userActualizado = auth.currentUser;

  return userActualizado!;
};

// LOGIN
export const iniciarSesion = async (correo: string, contraseña: string) => {
  const resultado = await signInWithEmailAndPassword(auth, correo, contraseña);
  return resultado.user;
};

// LOGOUT
export const cerrarSesion = async () => {
  await signOut(auth);
};