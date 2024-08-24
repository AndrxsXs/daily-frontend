import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Aquí harías una petición a tu API de Spring Boot
        const res = await fetch("http://your-spring-boot-api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  // Configura las páginas de autenticación personalizadas
  pages: {
    signIn: "/start/login",
    signUp: "/start/register",
  },
  // Otras opciones de configuración...
});

export { handler as GET, handler as POST };
