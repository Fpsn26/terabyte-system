import { useState } from 'react'
import { useCarrinho } from '@/store/carrinho'
import { gerarLinkWhatsApp } from '@/lib/whatsapp'
import { salvarPedidoNaPlanilha } from '@/lib/sheets'
import type { Pagina } from '@/App'
import styles from './Formulario.module.css'

export default function Formulario({ onNavigate }: { readonly onNavigate: (p: Pagina) => void }) {
  const { itens, totalPreco, limparCarrinho } = useCarrinho()
  const [nome, setNome] = useState('')
  const [contato, setContato] = useState('')
  const [enviando, setEnviando] = useState(false)

  if (itens.length === 0) {
    return (
      <div className={styles.formEmpty}>
        <span className={styles.formEmptyIcon}>🛒</span>
        <p className={styles.formEmptyText}>Nenhum item no carrinho</p>
        <button onClick={() => onNavigate('loja')} className={styles.btnVerLojaForm}>
          Ver loja
        </button>
      </div>
    )
  }

  async function handleSubmit() {
    if (!nome.trim() || !contato.trim()) {
      alert('Preencha nome e contato.')
      return
    }
    setEnviando(true)
    const dados = { nome, contato, itens, total: totalPreco() }
    await salvarPedidoNaPlanilha(dados)
    const link = gerarLinkWhatsApp(dados)
    limparCarrinho()
    window.open(link, '_blank')
    onNavigate('home')
  }

  return (
    <main className={styles.tbForm}>
      <div className={styles.formInner}>
        <h1 className={styles.formTitle}>Finalizar Pedido</h1>

        <div className={styles.formFields}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Nome completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              className={styles.fieldInput}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>WhatsApp / Contato</label>
            <input
              type="text"
              value={contato}
              onChange={(e) => setContato(e.target.value)}
              placeholder="(34) 99999-9999"
              className={styles.fieldInput}
            />
          </div>
        </div>

        <div className={styles.resumoBox}>
          <div className={styles.resumoHeader}>resumo do pedido</div>
          {itens.map((item) => (
            <div key={`${item.id}-${item.tamanho}`} className={styles.resumoItem}>
              <span className={styles.resumoItemNome}>
                {item.nome}
                {item.tamanho ? ` (${item.tamanho})` : ''} ×{item.quantidade}
              </span>
              <span className={styles.resumoItemPreco}>
                R$ {(item.preco * item.quantidade).toFixed(2)}
              </span>
            </div>
          ))}
          <div className={styles.resumoTotal}>
            <span className={styles.resumoTotalLabel}>Total</span>
            <span className={styles.resumoTotalValue}>R$ {totalPreco().toFixed(2)}</span>
          </div>
        </div>

        <button onClick={handleSubmit} disabled={enviando} className={styles.btnConfirmar}>
          {enviando ? 'Enviando...' : 'Confirmar via WhatsApp'}
        </button>
      </div>
    </main>
  )
}
