import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import React from "react";
import { LogOut } from "lucide-react";

function handleLogout() {
  signOut({ callbackUrl: "/" });
}

export default function LogoutButton() {
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      {!loading ? (
        <Button
          variant="outline"
          onClick={handleLogout}
          className="px-4 py-2  text-[#800020] rounded  "
        >
          <LogOut className="inline h-4 w-4 mr-2" />
          Cerrar sesión
        </Button>
      ) : (
        <Button
          className="px-4 py-2 
          // bg-tinto-50 text-[#800020]
          rounded"
          disabled
        >
          Cerrando sesión...
        </Button>
      )}
    </>
  );
}
