import { useState } from 'react'
import { z } from 'zod'
import { useCarrinho } from '@/store/carrinho'
import { gerarLinkWhatsApp } from '@/lib/whatsapp'
import { salvarPedidoNaPlanilha } from '@/lib/sheets'
import type { Pagina } from '@/App'
import styles from './Formulario.module.css'
import { pedidoSchema } from './pedidoSchema'

type Campos = z.infer<typeof pedidoSchema>
type Erros = Partial<Record<keyof Campos, string>>

export default function Formulario({ onNavigate }: { readonly onNavigate: (p: Pagina) => void }) {
  const { itens, totalPreco, limparCarrinho } = useCarrinho()

  const [campos, setCampos] = useState<Campos>({ nome: '', contato: '' })
  const [erros, setErros] = useState<Erros>({})
  const [tocado, setTocado] = useState<Partial<Record<keyof Campos, boolean>>>({})
  const [enviando, setEnviando] = useState(false)

  function validarCampo(campo: keyof Campos, valor: string): string | undefined {
    const resultado = pedidoSchema.shape[campo].safeParse(valor)
    return resultado.success ? undefined : resultado.error.issues[0].message
  }

  function handleChange(campo: keyof Campos, valor: string) {
    setCampos((prev) => ({ ...prev, [campo]: valor }))
    if (tocado[campo]) {
      setErros((prev) => ({ ...prev, [campo]: validarCampo(campo, valor) }))
    }
  }

  function handleBlur(campo: keyof Campos) {
    setTocado((prev) => ({ ...prev, [campo]: true }))
    setErros((prev) => ({ ...prev, [campo]: validarCampo(campo, campos[campo]) }))
  }

  async function handleSubmit() {
    const resultado = pedidoSchema.safeParse(campos)

    if (!resultado.success) {
      const novosErros: Erros = {}
      for (const issue of resultado.error.issues) {
        const campo = issue.path[0] as keyof Campos
        if (!novosErros[campo]) novosErros[campo] = issue.message
      }
      setErros(novosErros)
      setTocado({ nome: true, contato: true })
      return
    }

    setEnviando(true)
    const dados = { ...resultado.data, itens, total: totalPreco() }
    await salvarPedidoNaPlanilha(dados)
    const link = gerarLinkWhatsApp(dados)
    limparCarrinho()
    window.open(link, '_blank')
    onNavigate('home')
  }

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

  return (
    <main className={styles.tbForm}>
      <div className={styles.formInner}>
        <h1 className={styles.formTitle}>Finalizar Pedido</h1>

        <div className={styles.formFields}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Nome completo</label>
            <input
              type="text"
              value={campos.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              onBlur={() => handleBlur('nome')}
              placeholder="Seu nome"
              className={`${styles.fieldInput} ${erros.nome ? styles.fieldInputError : ''}`}
            />
            {erros.nome && <span className={styles.fieldError}>{erros.nome}</span>}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>WhatsApp / Contato</label>
            <input
              type="text"
              value={campos.contato}
              onChange={(e) => handleChange('contato', e.target.value)}
              onBlur={() => handleBlur('contato')}
              placeholder="(34) 99999-9999"
              className={`${styles.fieldInput} ${erros.contato ? styles.fieldInputError : ''}`}
            />
            {erros.contato && <span className={styles.fieldError}>{erros.contato}</span>}
          </div>
        </div>

        <div className={styles.resumoBox}>
          <div className={styles.resumoHeader}>resumo do pedido</div>
          {itens.map((item) => (
            <div key={`${item.id}-${item.tamanho ?? 'sem-tamanho'}`} className={styles.resumoItem}>
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
