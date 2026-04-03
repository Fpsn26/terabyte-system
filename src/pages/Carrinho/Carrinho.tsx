import { ShoppingCart, Trash2 } from 'lucide-react'
import { useCarrinho } from '@/store/carrinho'
import type { Pagina } from '@/App'
import styles from './Carrinho.module.css'

export default function Carrinho({ onNavigate }: { readonly onNavigate: (p: Pagina) => void }) {
  const { itens, removerItem, totalPreco } = useCarrinho()

  if (itens.length === 0) {
    return (
      <div className={styles.carrinhoEmpty}>
        <div className={styles.emptyIconWrap}>
          <ShoppingCart size={28} />
        </div>
        <p className={styles.emptyTitle}>Carrinho vazio</p>
        <p className={styles.emptyDesc}>Nenhum produto adicionado ainda</p>
        <button onClick={() => onNavigate('loja')} className={styles.btnVerLoja}>
          Ver produtos
        </button>
      </div>
    )
  }

  return (
    <main className={styles.tbCarrinho}>
      <div className={styles.carrinhoInner}>
        <h1 className={styles.carrinhoTitle}>Carrinho</h1>

        <div className={styles.carrinhoList}>
          {itens.map((item, idx) => (
            <div
              key={`${item.id}-${item.tamanho ?? 'sem-tamanho'}`}
              className={styles.carrinhoItem}
              style={{ animationDelay: `${idx * 0.06}s` }}
            >
              <div className={styles.itemInfo}>
                <span className={styles.itemNome}>{item.nome}</span>
                {item.tamanho && (
                  <span className={styles.itemDetalhe}>Tamanho: {item.tamanho}</span>
                )}
                <span className={styles.itemDetalhe}>Qtd: {item.quantidade}</span>
              </div>

              <div className={styles.itemAcoes}>
                <span className={styles.itemPreco}>
                  R$ {(item.preco * item.quantidade).toFixed(2)}
                </span>
                <button
                  onClick={() => removerItem(item.id, item.tamanho)}
                  className={styles.btnRemover}
                  title="Remover item"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.carrinhoTotalBar}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>R$ {totalPreco().toFixed(2)}</span>
        </div>

        <button onClick={() => onNavigate('formulario')} className={styles.btnFinalizar}>
          ⚡ Finalizar Pedido
        </button>
      </div>
    </main>
  )
}
