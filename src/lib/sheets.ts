import type { ItemCarrinho } from '@/store/carrinho'
interface DadosPedido { nome: string; contato: string; itens: ItemCarrinho[]; total: number }

export async function salvarPedidoNaPlanilha(dados: DadosPedido): Promise<void> {
  const url = import.meta.env.VITE_APPS_SCRIPT_URL
  if (!url || url.includes('SEU_ID_AQUI')) { console.warn('⚠ VITE_APPS_SCRIPT_URL não configurada.'); return }
  const produtos = dados.itens.map(i => `${i.nome}${i.tamanho ? ` (${i.tamanho})` : ''} x${i.quantidade}`).join(', ')
  await fetch(url, {
    method: 'POST', mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: dados.nome, contato: dados.contato, produtos, total: dados.total.toFixed(2) }),
  })
}
