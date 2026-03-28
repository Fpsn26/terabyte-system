// RESPONSÁVEL: Felipe | PRIORIDADE: Alta
import type { Pagina } from '@/App'
export default function Home({ onNavigate }: { onNavigate: (p: Pagina) => void }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-5xl font-extrabold mb-4">🏆 Atlética</h1>
      <p className="text-gray-500 text-lg mb-8">Vista a camisa, apoie o esporte universitário.</p>
      <button onClick={() => onNavigate('loja')} className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">Ver Loja</button>
    </main>
  )
}
