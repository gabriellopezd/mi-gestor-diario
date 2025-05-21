import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { User } from "firebase/auth";

export function useUserProfile(usuario: User | null) {
  const [nombre, setNombre] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchNombre = async () => {
      if (usuario) {
        const docRef = doc(db, "usuarios", usuario.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const datos = docSnap.data();
          setNombre(datos.nombre || null);
        } else {
          setNombre(null);
        }
      }
      setCargando(false);
    };

    fetchNombre();
  }, [usuario]);

  return { nombre, cargando };
}