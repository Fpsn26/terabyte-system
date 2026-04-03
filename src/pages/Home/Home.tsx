import type { Pagina } from '@/App'
import styles from './Home.module.css'

const NODES = [
  { id: 'node-0', top: '15%', left: '8%', delay: '0s' },
  { id: 'node-1', top: '25%', left: '92%', delay: '1s' },
  { id: 'node-2', top: '70%', left: '5%', delay: '2s' },
  { id: 'node-3', top: '80%', left: '90%', delay: '0.5s' },
  { id: 'node-4', top: '45%', left: '95%', delay: '1.5s' },
  { id: 'node-5', top: '60%', left: '3%', delay: '2.5s' },
]

const BINARY_COLUMNS = Array.from({ length: 14 }, (_, i) => ({
  id: `binary-${i}`,
  left: `${(i / 14) * 100}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${8 + Math.random() * 10}s`,
  value: Array.from({ length: 12 }, () => (Math.random() > 0.5 ? '1' : '0')).join('\n'),
}))

export default function Home({ onNavigate }: { readonly onNavigate: (p: Pagina) => void }) {
  return (
    <main
      className={`${styles.tbHome} flex flex-col items-center justify-start min-h-screen text-center px-6 py-16 gap-4`}
    >
      <div className={styles.cornerTl} />
      <div className={styles.cornerBr} />
      <div className={styles.circuitBg} />
      <div className={styles.scanlines} />

      {BINARY_COLUMNS.map((col) => (
        <span
          key={col.id}
          className={styles.binaryParticle}
          style={{
            left: col.left,
            top: '-40px',
            animationDuration: col.duration,
            animationDelay: col.delay,
          }}
        >
          {col.value}
        </span>
      ))}

      {NODES.map((n) => (
        <div
          key={n.id}
          className={styles.circuitNode}
          style={{ top: n.top, left: n.left, animationDelay: n.delay }}
        />
      ))}

      <div className={styles.logoGlowBg} />

      <div className={styles.badgeCc}>Ciências da Computação · IF Goiano - Morrinhos</div>

      <img src="/terabyte-logo.png" alt="Atlética Terabyte" className={styles.tbLogo} />

      <h1 className={styles.glitchTitle} data-text="Estamos de Volta!">
        Estamos de <span className={styles.goldText}>Volta!</span>
      </h1>

      <p className={styles.tbSubtitle}>Atlética Terabyte · 2025</p>

      <div className={styles.goldDivider} />

      <p className={styles.tbTagline}>
        Vista a camisa, represente o curso e apoie o esporte universitário.
      </p>

      <button className={styles.btnCta} onClick={() => onNavigate('loja')}>
        ⚡ Comprar Camiseta
      </button>

      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>01</span>
          <span className={styles.statLabel}>Atlética</span>
        </div>
      </div>
    </main>
  )
}
