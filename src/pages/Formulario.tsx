// RESPONSÁVEL: Iago + Rayssa | PRIORIDADE: Alta
import { useState } from 'react'
import { useCarrinho } from '@/store/carrinho'
import { gerarLinkWhatsApp } from '@/lib/whatsapp'
import { salvarPedidoNaPlanilha } from '@/lib/sheets'
import type { Pagina } from '@/App'
export default function Formulario({ onNavigate }: { onNavigate: (p: Pagina) => void }) {
  const { itens, totalPreco, limparCarrinho } = useCarrinho()
  const [nome, setNome] = useState('')
  const [contato, setContato] = useState('')
  const [enviando, setEnviando] = useState(false)
  if (itens.length === 0) return (
    <main className="container mx-auto px-4 py-8 text-center">
      <p className="text-gray-500">Nenhum item no carrinho.</p>
      <button onClick={() => onNavigate('loja')} className="mt-4 underline">Ver loja</button>
    </main>
  )
  async function handleSubmit() {
    if (!nome.trim() || !contato.trim()) { alert('Preencha nome e contato.'); return }
    setEnviando(true)
    const dados = { nome, contato, itens, total: totalPreco() }
    await salvarPedidoNaPlanilha(dados)
    const link = gerarLinkWhatsApp(dados)
    limparCarrinho(); window.open(link, '_blank'); onNavigate('home')
  }
  return (
    <main className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Finalizar Pedido</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome completo</label>
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">WhatsApp / Contato</label>
          <input type="text" value={contato} onChange={e => setContato(e.target.value)} placeholder="(11) 99999-9999" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900" />
        </div>
      </div>
      <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-900 mb-2">Resumo</p>
        {itens.map(i => <p key={`${i.id}-${i.tamanho}`}>{i.nome}{i.tamanho ? ` (${i.tamanho})` : ''} x{i.quantidade} — R$ {(i.preco * i.quantidade).toFixed(2)}</p>)}
        <p className="font-bold text-gray-900 mt-2">Total: R$ {totalPreco().toFixed(2)}</p>
      </div>
      <button onClick={handleSubmit} disabled={enviando} className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50">
        {enviando ? 'Enviando...' : '📲 Confirmar via WhatsApp'}
      </button>
    </main>
  )
}
