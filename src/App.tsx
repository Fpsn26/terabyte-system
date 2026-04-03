import { useState } from 'react'
import Home from '@/pages/Home/Home'
import Loja from '@/pages/Loja/Loja'
import Carrinho from '@/pages/Carrinho/Carrinho'
import Formulario from '@/pages/Form/Formulario'
import BotaoCarrinho from '@/components/loja/BotaoCarrinho'
import styles from './App.module.css'

export type Pagina = 'home' | 'loja' | 'carrinho' | 'formulario'

export default function App() {
  const [pagina, setPagina] = useState<Pagina>('home')
  const nav = (p: Pagina) => setPagina(p)

  return (
    <div className={styles.appRoot}>
      <nav className={styles.tbNav}>
        <div className={styles.tbNavInner}>
          <button onClick={() => nav('home')} className={styles.tbNavBrand}>
            <img src="/images/logo_bombado.png" alt="Terabyte" className={styles.navLogo} />
            <span className={styles.navBrandText}>
              Atlética <span className={styles.spanGold}>Terabyte</span>
            </span>
          </button>

          <div className={styles.tbNavLinks}>
            <button
              onClick={() => nav('home')}
              className={`${styles.navLink} ${pagina === 'home' ? styles.active : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => nav('loja')}
              className={`${styles.navLink} ${pagina === 'loja' ? styles.active : ''}`}
            >
              Loja
            </button>
            <BotaoCarrinho onNavigate={() => nav('carrinho')} />
          </div>
        </div>
      </nav>

      {pagina === 'home' && <Home onNavigate={nav} />}
      {pagina === 'loja' && <Loja onNavigate={nav} />}
      {pagina === 'carrinho' && <Carrinho onNavigate={nav} />}
      {pagina === 'formulario' && <Formulario onNavigate={nav} />}
    </div>
  )
}
