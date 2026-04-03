import { produtos } from '@/data/produtos'
import CardProduto from '@/components/loja/CardProduto'
import type { Pagina } from '@/App'
import styles from './Loja.module.css'

export default function Loja({ onNavigate }: {readonly onNavigate: (p: Pagina) => void }) {
  return (
    <main className={styles.tbLoja}>
      <div className={styles.lojaHeader}>
        <div className={styles.lojaHeaderBg} />
        <span className={styles.lojaEyebrow}>Atlética Terabyte · Coleção Oficial</span>
        <h1 className={styles.lojaTitle}>
          Loja <span className={styles.spanTerabyte}>Terabyte</span>
        </h1>
        <p className={styles.lojaDesc}>Vista quem você é. Represente onde você estuda.</p>
      </div>

      <p className={styles.lojaCount}>
        {produtos.length} produto{produtos.length !== 1 ? 's' : ''} disponível
        {produtos.length !== 1 ? 'is' : ''}
      </p>

      <div className={styles.lojaGrid}>
        {produtos.map((p) => (
          <CardProduto key={p.id} produto={p} onNavigate={onNavigate} />
        ))}
      </div>
    </main>
  )
}
