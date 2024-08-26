import { getSession } from "next-auth/react";

export async function getAuthToken() {
  const session = await getSession();
  if (session && session.accessToken) {
    return session.accessToken;
  } else {
    throw new Error("No se pudo obtener el token de autenticación.");
  }
}
