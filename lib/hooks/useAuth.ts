import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface UsuarioExtendido extends User {
  nombre?: string;
}

export function useAuth() {
  const [usuario, setUsuario] = useState<UsuarioExtendido | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);

        const nombreDesdeFirestore = docSnap.exists() ? docSnap.data().nombre : undefined;

        setUsuario({ ...user, nombre: nombreDesdeFirestore });
      } else {
        setUsuario(null);
      }
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  return { usuario, cargando };
}