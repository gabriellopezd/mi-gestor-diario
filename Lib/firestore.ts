import { db } from "./firebase";
import type { Tarea } from "../types"; // ✅ Mantén esto igual, es correcto si lib está en minúsculas//
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  getFirestore,
} from "firebase/firestore";

// Referencia a la colección
const tareasRef = collection(db, "tareas");

// Escuchar tareas
export function escucharTareas(
  categoria: string,
  callback: (data: Tarea[]) => void
) {
  if (!categoria || typeof categoria !== "string") {
    console.warn("❌ Categoría inválida al escuchar tareas:", categoria);
    return () => {}; // devuelve una función vacía para evitar errores en useEffect
  }

  const q = query(tareasRef, where("categoria", "==", categoria));
  return onSnapshot(q, (snapshot) => {
    const tareas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Tarea[];
    callback(tareas);
  });
}

// Crear tarea
export const crearTarea = async (texto: string, categoria: string) => {
  await addDoc(collection(db, "tareas"), {
    text: texto,
    categoria,
    done: false,
    creado: new Date(),
  });
};

// Alternar estado
export const alternarTarea = async (id: string, estado: boolean) => {
  const ref = doc(db, "tareas", id);
  await updateDoc(ref, { done: estado });
};

// Eliminar
export const eliminarTarea = async (id: string) => {
  const ref = doc(db, "tareas", id);
  await deleteDoc(ref);
};

const habitosRef = collection(db, "habitos");

export const crearHabito = async (nombre: string) => {
  await addDoc(habitosRef, {
    name: nombre,
    registros: {},
    creado: new Date().toISOString(),
  });
};

export const eliminarHabito = async (id: string) => {
  const ref = doc(db, "habitos", id);
  await deleteDoc(ref);
};

export const escucharHabitos = (callback: (data: any[]) => void) => {
  const q = query(habitosRef, orderBy("creado", "asc"));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data);
  });
};

export const alternarRegistroDiario = async (
  habitoId: string,
  fecha: string,
  estado: boolean
) => {
  const ref = doc(db, "habitos", habitoId);
  return await updateDoc(ref, {
    [`registros.${fecha}`]: estado,
  });
};