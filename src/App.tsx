import Home from '@/pages/Home'
import Loja from '@/pages/Loja'
import styles from './App.module.css'

export default function App() {
  const caminhoDaUrl = window.location.pathname

  if (caminhoDaUrl === '/loja') {
    return <Loja />
  }

  return (
    <div>
      <nav className={styles.nav}>
        <a href="/">Home</a>
        <a href="/loja">Loja</a>
      </nav>
      <Home />
    </div>
  )
}
