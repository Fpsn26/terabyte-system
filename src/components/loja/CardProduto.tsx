// RESPONSÁVEL: Felipe + Rayssa
import { useState } from 'react'
import type { Produto } from '@/data/produtos'
import { useCarrinho } from '@/store/carrinho'
import type { Pagina } from '@/App'
interface Props { produto: Produto; onNavigate: (p: Pagina) => void }
export default function CardProduto({ produto }: Props) {
  const { adicionarItem } = useCarrinho()
  const [tamanho, setTamanho] = useState(produto.tamanhos?.[0] ?? '')
  const [adicionado, setAdicionado] = useState(false)
  function handleAdicionar() {
    adicionarItem({ id: produto.id, nome: produto.nome, preco: produto.preco, quantidade: 1, tamanho: tamanho || undefined, imagem: produto.imagem })
    setAdicionado(true); setTimeout(() => setAdicionado(false), 1500)
  }
  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      {produto.imagem
        ? <img src={produto.imagem} alt={produto.nome} className="w-full h-48 object-cover" />
        : <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-4xl">🏆</div>
      }
      <div className="p-4">
        <h3 className="font-semibold text-lg">{produto.nome}</h3>
        {produto.descricao && <p className="text-sm text-gray-500 mt-1">{produto.descricao}</p>}
        <p className="text-xl font-bold mt-2">R$ {produto.preco.toFixed(2)}</p>
        {produto.tamanhos && produto.tamanhos.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-3">
            {produto.tamanhos.map(t => (
              <button key={t} onClick={() => setTamanho(t)} className={`px-3 py-1 text-sm border rounded-md transition-colors ${tamanho === t ? 'bg-gray-900 text-white border-gray-900' : 'hover:border-gray-900'}`}>{t}</button>
            ))}
          </div>
        )}
        <button onClick={handleAdicionar} disabled={!produto.disponivel} className="mt-4 w-full py-2 rounded-lg text-sm font-semibold transition-colors bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40">
          {adicionado ? '✔ Adicionado!' : produto.disponivel ? 'Adicionar ao carrinho' : 'Indisponível'}
        </button>
      </div>
    </div>
  )
}
