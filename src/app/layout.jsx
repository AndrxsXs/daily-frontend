// import { Inter } from "next/font/google";
import { Merriweather_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import TopHeader from "@/components/ui/topheader";
import ClientSessionProvider from "@/components/auth/ClientSessionProvider";

// const inter = Inter({ subsets: ["latin"] });
const merriweatherSans = Merriweather_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Daily",
  description: "Daily es una simple aplicación de tareas diarias.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${merriweatherSans.className} transition-shadow duration-300 ease-in-out grid grid-rows-[auto,1fr,auto] min-h-screen`}
      >
        <ClientSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
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
        </ClientSessionProvider>
      </body>
    </html>
  );
}
