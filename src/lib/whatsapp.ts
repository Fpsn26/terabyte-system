import type { ItemCarrinho } from '@/store/carrinho'
interface DadosPedido { nome: string; contato: string; itens: ItemCarrinho[]; total: number }

export function gerarLinkWhatsApp({ nome, contato, itens, total }: DadosPedido): string {
  const numero = import.meta.env.VITE_WHATSAPP_NUMBER
  const listaProdutos = itens.map(item =>
    `  - ${item.nome}${item.tamanho ? ` (${item.tamanho})` : ''} x${item.quantidade} — R$ ${(item.preco * item.quantidade).toFixed(2)}`
  ).join('\n')
  const mensagem = `Olá! Gostaria de fazer um pedido:\n\nNome: ${nome}\nContato: ${contato}\n\nProdutos:\n${listaProdutos}\n\nTotal: R$ ${total.toFixed(2)}`
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
}
