// RESPONSÁVEL: Rayssa
import { ShoppingCart } from 'lucide-react'
import { useCarrinho } from '@/store/carrinho'

interface Props {
  onNavigate: () => void
}

export default function BotaoCarrinho({ onNavigate }: Readonly<Props>) {
  const totalItens = useCarrinho((s) => s.totalItens)

  return (
    <button
      onClick={onNavigate}
      style={{ cursor: 'pointer' }}
      className="relative p-2 text-white hover:text-yellow-400 transition-colors"
    >
      <ShoppingCart className="w-5.5 h-5.5" />
      {totalItens() > 0 && (
        <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
          {totalItens()}
        </span>
      )}
    </button>
  )
}
