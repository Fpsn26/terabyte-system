// RESPONSÁVEL: Rayssa
import { ShoppingCart } from 'lucide-react'
import { useCarrinho } from '@/store/carrinho'
interface Props { onNavigate: () => void }
export default function BotaoCarrinho({ onNavigate }: Props) {
  const totalItens = useCarrinho(s => s.totalItens)
  return (
    <button onClick={onNavigate} className="relative p-1">
      <ShoppingCart className="w-6 h-6" />
      {totalItens() > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">{totalItens()}</span>
      )}
    </button>
  )
}
