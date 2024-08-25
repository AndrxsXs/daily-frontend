import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

function handleLogout() {
  signOut({ callbackUrl: "/" });
}

export default function LogoutButton() {
  return (
    <Button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
    >
      Cerrar sesión
    </Button>
  );
}
