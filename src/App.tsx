import { useState } from 'react'
import Home from '@/pages/Home'
import Loja from '@/pages/Loja'
import Carrinho from '@/pages/Carrinho'
import Formulario from '@/pages/Formulario'
import BotaoCarrinho from '@/components/loja/BotaoCarrinho'

export type Pagina = 'home' | 'loja' | 'carrinho' | 'formulario'

export default function App() {
  const [pagina, setPagina] = useState<Pagina>('home')
  const nav = (p: Pagina) => setPagina(p)
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
        <button onClick={() => nav('home')} className="font-bold text-lg">🏆 Atlética</button>
        <div className="flex items-center gap-6 text-sm">
          <button onClick={() => nav('home')} className="hover:text-yellow-400 transition-colors">Home</button>
          <button onClick={() => nav('loja')} className="hover:text-yellow-400 transition-colors">Loja</button>
          <BotaoCarrinho onNavigate={() => nav('carrinho')} />
        </div>
      </nav>
      {pagina === 'home'       && <Home       onNavigate={nav} />}
      {pagina === 'loja'       && <Loja       onNavigate={nav} />}
      {pagina === 'carrinho'   && <Carrinho   onNavigate={nav} />}
      {pagina === 'formulario' && <Formulario onNavigate={nav} />}
    </div>
  )
}
