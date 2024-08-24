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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
