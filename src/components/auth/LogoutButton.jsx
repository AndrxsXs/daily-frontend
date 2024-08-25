import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import React from "react";

function handleLogout() {
  signOut({ callbackUrl: "/" });
}

export default function LogoutButton() {
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      {!loading ? (
        <Button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Cerrar sesión
        </Button>
      ) : (
        <Button className="px-4 py-2 bg-red-500 text-white rounded" disabled>
          Cerrando sesión...
        </Button>
      )}
    </>
  );
}
