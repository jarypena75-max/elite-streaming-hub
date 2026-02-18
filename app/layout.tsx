import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "Elite Streaming Hub",
  description: "Catálogo pro de streaming y servicios digitales con compra por WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      {/* Usamos bg-white para que sea una sola pieza con el catálogo */}
      <body className="min-h-screen bg-white text-zinc-900 antialiased">
        <Navbar />
        
        {/* Contenedor principal sin saltos de color */}
        <main className="mx-auto max-w-6xl px-4 py-10 relative">
          {children}
        </main>

        <footer className="border-t border-zinc-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-zinc-500">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-semibold text-zinc-700">Elite Streaming Hub</span>
              <span>Soporte y atención vía WhatsApp • Entrega inmediata</span>
            </div>
            <div className="mt-3 text-xs text-zinc-400">
              © {new Date().getFullYear()} Elite Streaming Hub. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}