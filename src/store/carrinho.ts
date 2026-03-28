import { create } from 'zustand'

export interface ItemCarrinho {
  id: string; nome: string; preco: number; quantidade: number; tamanho?: string; imagem?: string
}

interface CarrinhoStore {
  itens: ItemCarrinho[]
  adicionarItem: (item: ItemCarrinho) => void
  removerItem: (id: string, tamanho?: string) => void
  alterarQuantidade: (id: string, tamanho: string | undefined, quantidade: number) => void
  limparCarrinho: () => void
  totalItens: () => number
  totalPreco: () => number
}

export const useCarrinho = create<CarrinhoStore>((set, get) => ({
  itens: [],
  adicionarItem: (novoItem) => set((state) => {
    const existente = state.itens.find(i => i.id === novoItem.id && i.tamanho === novoItem.tamanho)
    if (existente) return { itens: state.itens.map(i => i.id === novoItem.id && i.tamanho === novoItem.tamanho ? { ...i, quantidade: i.quantidade + novoItem.quantidade } : i) }
    return { itens: [...state.itens, novoItem] }
  }),
  removerItem: (id, tamanho) => set((state) => ({ itens: state.itens.filter(i => !(i.id === id && i.tamanho === tamanho)) })),
  alterarQuantidade: (id, tamanho, quantidade) => {
    if (quantidade <= 0) { get().removerItem(id, tamanho); return }
    set((state) => ({ itens: state.itens.map(i => i.id === id && i.tamanho === tamanho ? { ...i, quantidade } : i) }))
  },
  limparCarrinho: () => set({ itens: [] }),
  totalItens: () => get().itens.reduce((acc, i) => acc + i.quantidade, 0),
  totalPreco: () => get().itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0),
}))
