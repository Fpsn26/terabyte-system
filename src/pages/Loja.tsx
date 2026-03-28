// RESPONSÁVEL: Felipe + Rayssa | PRIORIDADE: Alta
import { produtos } from '@/data/produtos'
import CardProduto from '@/components/loja/CardProduto'
import type { Pagina } from '@/App'
export default function Loja({ onNavigate }: { onNavigate: (p: Pagina) => void }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Loja</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map(p => <CardProduto key={p.id} produto={p} onNavigate={onNavigate} />)}
      </div>
    </main>
  )
}
