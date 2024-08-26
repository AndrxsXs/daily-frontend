import { getSession } from "next-auth/react";

export async function AuthFetch(url, options = {}) {
  const session = await getSession();
  console.log(url);
  if (!session) throw new Error("No hay sesión activa");

  const headers = new Headers({
    ...options.headers,
    Authorization: `Bearer ${session.accessToken}`,
  });

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) throw new Error("Solicitud fallida");

  if (
    response.status === 204 ||
    response.body === null ||
    response.body === undefined
  )
    return null;

  return response.json();
}
