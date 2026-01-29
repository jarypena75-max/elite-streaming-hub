import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "Elite Streaming Hub",
  description: "Catálogo pro de streaming y servicios digitales con compra por WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <Navbar />

        {/* Contenido */}
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        {/* Footer */}
        <footer className="border-t border-zinc-200 bg-white">
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
