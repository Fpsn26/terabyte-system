// RESPONSÁVEL: Felipe | PRIORIDADE: Média
import { useCarrinho } from '@/store/carrinho'
import type { Pagina } from '@/App'
export default function Carrinho({ onNavigate }: { onNavigate: (p: Pagina) => void }) {
  const { itens, removerItem, totalPreco } = useCarrinho()
  if (itens.length === 0) return (
    <main className="container mx-auto px-4 py-8 text-center">
      <p className="text-gray-500 text-lg">Carrinho vazio.</p>
      <button onClick={() => onNavigate('loja')} className="mt-4 underline text-gray-700">Ver produtos</button>
    </main>
  )
  return (
    <main className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Carrinho</h1>
      <ul className="divide-y">
        {itens.map(item => (
          <li key={`${item.id}-${item.tamanho}`} className="py-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{item.nome}</p>
              {item.tamanho && <p className="text-sm text-gray-500">Tamanho: {item.tamanho}</p>}
              <p className="text-sm text-gray-500">Qtd: {item.quantidade}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
              <button onClick={() => removerItem(item.id, item.tamanho)} className="text-xs text-red-500 hover:underline mt-1">Remover</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t pt-4 mt-2 flex justify-between font-bold text-lg">
        <span>Total</span><span>R$ {totalPreco().toFixed(2)}</span>
      </div>
      <button onClick={() => onNavigate('formulario')} className="mt-6 w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">Finalizar Pedido</button>
    </main>
  )
}
