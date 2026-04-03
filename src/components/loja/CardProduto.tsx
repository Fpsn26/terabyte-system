// RESPONSÁVEL: Felipe + Rayssa
import { useState } from 'react'
import type { Produto } from '@/data/produtos'
import { useCarrinho } from '@/store/carrinho'
import type { Pagina } from '@/App'
import styles from './CardProduto.module.css'

interface Props {
  produto: Produto
  onNavigate: (p: Pagina) => void
}

export default function CardProduto({ produto }: Readonly<Props>) {
  const { adicionarItem } = useCarrinho()
  const [tamanho, setTamanho] = useState(produto.tamanhos?.[0] ?? '')
  const [adicionado, setAdicionado] = useState(false)

  function handleAdicionar() {
    adicionarItem({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: 1,
      tamanho: tamanho || undefined,
      imagem: produto.imagem,
    })
    setAdicionado(true)
    setTimeout(() => setAdicionado(false), 1500)
  }

  return (
    <div className={styles.produtoCard}>
      {produto.imagem ? (
        <img src={produto.imagem} alt={produto.nome} className={styles.produtoImg} />
      ) : (
        <div className={styles.produtoImgPlaceholder}>👕</div>
      )}

      <div className={styles.produtoBody}>
        <h3 className={styles.produtoNome}>{produto.nome}</h3>
        {produto.descricao && <p className={styles.produtoDescricao}>{produto.descricao}</p>}
        <p className={styles.produtoPreco}>R$ {produto.preco.toFixed(2)}</p>

        {produto.tamanhos && produto.tamanhos.length > 0 && (
          <div className={styles.produtoTamanhos}>
            {produto.tamanhos.map((t) => (
              <button
                key={t}
                onClick={() => setTamanho(t)}
                className={`${styles.btnTamanho} ${tamanho === t ? styles.selected : ''}`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleAdicionar}
          disabled={!produto.disponivel}
          className={`${styles.btnAdicionar} ${adicionado ? styles.adicionado : ''}`}
        >
          {adicionado
            ? '✔ Adicionado!'
            : produto.disponivel
              ? 'Adicionar ao carrinho'
              : 'Indisponível'}
        </button>
      </div>
    </div>
  )
}
