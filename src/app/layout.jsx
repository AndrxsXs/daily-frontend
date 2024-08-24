import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import TopHeader from "@/components/ui/topheader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Daily | Inicio",
  description: "Daily es una simple aplicación de tareas diarias.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} transition-shadow duration-300 ease-in-out grid grid-rows-[auto,1fr,auto] min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopHeader />
          {children}

          <footer>
            <p className="text-xs text-center p-4">
              Hecho con ❤️ por UniDev en Univalle Palmira
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
