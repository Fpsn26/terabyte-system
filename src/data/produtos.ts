// RESPONSABILIDADE: Arthur — substitua pelos produtos reais
export interface Produto {
  id: string; nome: string; preco: number; descricao?: string
  imagem?: string; tamanhos?: string[]
  categoria: 'camiseta' | 'moletom' | 'bone' | 'kit' | 'outro'; disponivel: boolean
}
export const produtos: Produto[] = [
  { id: '1', nome: 'Camiseta Atlética', preco: 59.90, descricao: 'Camiseta oficial da atlética.', imagem: '/produtos/camiseta.jpg', tamanhos: ['PP','P','M','G','GG'], categoria: 'camiseta', disponivel: true },
  { id: '2', nome: 'Moletom Atlética', preco: 119.90, descricao: 'Moletom com o brasão da atlética.', imagem: '/produtos/moletom.jpg', tamanhos: ['P','M','G','GG'], categoria: 'moletom', disponivel: true },
  { id: '3', nome: 'Boné Atlética', preco: 49.90, descricao: 'Boné exclusivo.', imagem: '/produtos/bone.jpg', tamanhos: ['Único'], categoria: 'bone', disponivel: true },
]
