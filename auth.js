// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const res = await fetch(
//           "https://confident-cooperation-production.up.railway.app/login",
//           {
//             method: "POST",
//             body: JSON.stringify(credentials),
//             headers: { "Content-Type": "application/json" },
//           }
//         );
//         const user = await res.json();

//         if (res.ok && user) {
//           return {
//             id: user.id || credentials.username, // Usamos el username como id si no hay id
//             name: user.username,
//             username: user.username,
//             token: user.token,
//           };
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.username = user.username;
//         token.token = user.token;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = {
//         id: token.id,
//         name: token.name,
//         username: token.username,
//       };
//       session.token = token.token;
//       console.log("Session in auth.js:", session); // Para depuración
//       return session;
//     },
//   },
//   debug: process.env.NODE_ENV === "development", // Habilita logs detallados en desarrollo
// });
