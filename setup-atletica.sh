#!/bin/bash

# =============================================================
#  SETUP COMPLETO — LOJA ATLÉTICA v2.0
#  Execute dentro da pasta do repositório clonado
#  Uso: bash setup-atletica.sh
# =============================================================

set -e

GREEN='\033[0;32m'; BLUE='\033[0;34m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
step() { echo -e "\n${BLUE}▶  $1${NC}"; }
ok()   { echo -e "${GREEN}✔  $1${NC}"; }
warn() { echo -e "${YELLOW}⚠  $1${NC}"; }
fail() { echo -e "${RED}✗  $1${NC}"; exit 1; }

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════╗"
echo "║     SETUP — LOJA ATLÉTICA v2.0           ║"
echo "║     React + Vite + TS + Tailwind         ║"
echo "╚══════════════════════════════════════════╝"
echo -e "${NC}"

step "Verificando ambiente..."
command -v node &>/dev/null || fail "Node.js não encontrado. Instale em https://nodejs.org"
command -v npm  &>/dev/null || fail "npm não encontrado."
command -v git  &>/dev/null || fail "Git não encontrado."
git rev-parse --is-inside-work-tree &>/dev/null || fail "Execute dentro do repositório clonado."
REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"
ok "Node $(node -v) | npm $(npm -v)"
ok "Repositório: $(basename "$REPO_ROOT")"

step "Criando package.json..."
cat > package.json << 'EOF'
{
  "name": "atletica-loja",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "format": "prettier --write src/"
  }
}
EOF
ok "package.json criado"

step "Instalando dependências de produção..."
npm install react react-dom zustand lucide-react clsx tailwind-merge \
  class-variance-authority \
  @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-toast
ok "Dependências de produção instaladas"

step "Instalando dependências de desenvolvimento..."
npm install -D vite @vitejs/plugin-react \
  typescript @types/react @types/react-dom \
  tailwindcss postcss autoprefixer \
  @types/node prettier
ok "Dev dependencies instaladas"

step "Criando estrutura de pastas..."
mkdir -p src/pages
mkdir -p src/components/ui
mkdir -p src/components/loja
mkdir -p src/components/formulario
mkdir -p src/store
mkdir -p src/lib
mkdir -p src/data
mkdir -p src/assets
ok "Pastas criadas:"
find src -type d | sort | sed 's/^/    /'

step "Criando arquivos de configuração..."

cat > index.html << 'EOF'
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Atlética — Loja</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})
EOF

cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}
EOF

cat > tailwind.config.js << 'EOF'
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
}
EOF

cat > postcss.config.js << 'EOF'
export default { plugins: { tailwindcss: {}, autoprefixer: {} } }
EOF

cat > .prettierrc << 'EOF'
{ "semi": false, "singleQuote": true, "tabWidth": 2, "trailingComma": "es5", "printWidth": 100 }
EOF

cat > .env.example << 'EOF'
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/SEU_ID_AQUI/exec
VITE_WHATSAPP_NUMBER=5511999999999
EOF
cp .env.example .env

cat > .gitignore << 'EOF'
node_modules
dist
.env
.env.local
.DS_Store
*.log
EOF
ok "Configurações criadas"

step "Criando arquivos fonte..."

cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
EOF

cat > src/main.tsx << 'EOF'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
EOF

cat > src/App.tsx << 'EOF'
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
EOF

cat > src/store/carrinho.ts << 'EOF'
import { create } from 'zustand'

export interface ItemCarrinho {
  id: string; nome: string; preco: number; quantidade: number; tamanho?: string; imagem?: string
}

interface CarrinhoStore {
  itens: ItemCarrinho[]
  adicionarItem: (item: ItemCarrinho) => void
  removerItem: (id: string, tamanho?: string) => void
  alterarQuantidade: (id: string, tamanho: string | undefined, quantidade: number) => void
  limparCarrinho: () => void
  totalItens: () => number
  totalPreco: () => number
}

export const useCarrinho = create<CarrinhoStore>((set, get) => ({
  itens: [],
  adicionarItem: (novoItem) => set((state) => {
    const existente = state.itens.find(i => i.id === novoItem.id && i.tamanho === novoItem.tamanho)
    if (existente) return { itens: state.itens.map(i => i.id === novoItem.id && i.tamanho === novoItem.tamanho ? { ...i, quantidade: i.quantidade + novoItem.quantidade } : i) }
    return { itens: [...state.itens, novoItem] }
  }),
  removerItem: (id, tamanho) => set((state) => ({ itens: state.itens.filter(i => !(i.id === id && i.tamanho === tamanho)) })),
  alterarQuantidade: (id, tamanho, quantidade) => {
    if (quantidade <= 0) { get().removerItem(id, tamanho); return }
    set((state) => ({ itens: state.itens.map(i => i.id === id && i.tamanho === tamanho ? { ...i, quantidade } : i) }))
  },
  limparCarrinho: () => set({ itens: [] }),
  totalItens: () => get().itens.reduce((acc, i) => acc + i.quantidade, 0),
  totalPreco: () => get().itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0),
}))
EOF

cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
EOF

cat > src/lib/whatsapp.ts << 'EOF'
import type { ItemCarrinho } from '@/store/carrinho'
interface DadosPedido { nome: string; contato: string; itens: ItemCarrinho[]; total: number }

export function gerarLinkWhatsApp({ nome, contato, itens, total }: DadosPedido): string {
  const numero = import.meta.env.VITE_WHATSAPP_NUMBER
  const listaProdutos = itens.map(item =>
    `  - ${item.nome}${item.tamanho ? ` (${item.tamanho})` : ''} x${item.quantidade} — R$ ${(item.preco * item.quantidade).toFixed(2)}`
  ).join('\n')
  const mensagem = `Olá! Gostaria de fazer um pedido:\n\nNome: ${nome}\nContato: ${contato}\n\nProdutos:\n${listaProdutos}\n\nTotal: R$ ${total.toFixed(2)}`
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
}
EOF

cat > src/lib/sheets.ts << 'EOF'
import type { ItemCarrinho } from '@/store/carrinho'
interface DadosPedido { nome: string; contato: string; itens: ItemCarrinho[]; total: number }

export async function salvarPedidoNaPlanilha(dados: DadosPedido): Promise<void> {
  const url = import.meta.env.VITE_APPS_SCRIPT_URL
  if (!url || url.includes('SEU_ID_AQUI')) { console.warn('⚠ VITE_APPS_SCRIPT_URL não configurada.'); return }
  const produtos = dados.itens.map(i => `${i.nome}${i.tamanho ? ` (${i.tamanho})` : ''} x${i.quantidade}`).join(', ')
  await fetch(url, {
    method: 'POST', mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: dados.nome, contato: dados.contato, produtos, total: dados.total.toFixed(2) }),
  })
}
EOF

cat > src/data/produtos.ts << 'EOF'
// RESPONSABILIDADE: Arthur — substitua pelos produtos reais
export interface Produto {
  id: string; nome: string; preco: number; descricao?: string
  imagem?: string; tamanhos?: string[]
  categoria: 'camiseta' | 'moletom' | 'bone' | 'kit' | 'outro'; disponivel: boolean
}
export const produtos: Produto[] = [
  { id: '1', nome: 'Camiseta Atlética', preco: 59.90, descricao: 'Camiseta oficial da atlética.', imagem: '/produtos/camiseta.jpg', tamanhos: ['PP','P','M','G','GG'], categoria: 'camiseta', disponivel: true },
  { id: '2', nome: 'Moletom Atlética', preco: 119.90, descricao: 'Moletom com o brasão da atlética.', imagem: '/produtos/moletom.jpg', tamanhos: ['P','M','G','GG'], categoria: 'moletom', disponivel: true },
  { id: '3', nome: 'Boné Atlética', preco: 49.90, descricao: 'Boné exclusivo.', imagem: '/produtos/bone.jpg', tamanhos: ['Único'], categoria: 'bone', disponivel: true },
]
EOF

cat > src/pages/Home.tsx << 'EOF'
// RESPONSÁVEL: Felipe | PRIORIDADE: Alta
import type { Pagina } from '@/App'
export default function Home({ onNavigate }: { onNavigate: (p: Pagina) => void }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-5xl font-extrabold mb-4">🏆 Atlética</h1>
      <p className="text-gray-500 text-lg mb-8">Vista a camisa, apoie o esporte universitário.</p>
      <button onClick={() => onNavigate('loja')} className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">Ver Loja</button>
    </main>
  )
}
EOF

cat > src/pages/Loja.tsx << 'EOF'
// RESPONSÁVEL: Felipe + Rayssa | PRIORIDADE: Alta
import { produtos } from '@/data/produtos'
import CardProduto from '@/components/loja/CardProduto'
import type { Pagina } from '@/App'
export default function Loja({ onNavigate }: { onNavigate: (p: Pagina) => void }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Loja</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map(p => <CardProduto key={p.id} produto={p} onNavigate={onNavigate} />)}
      </div>
    </main>
  )
}
EOF

cat > src/pages/Carrinho.tsx << 'EOF'
// RESPONSÁVEL: Felipe | PRIORIDADE: Média
import { useCarrinho } from '@/store/carrinho'
import type { Pagina } from '@/App'
export default function Carrinho({ onNavigate }: { onNavigate: (p: Pagina) => void }) {
  const { itens, removerItem, totalPreco } = useCarrinho()
  if (itens.length === 0) return (
    <main className="container mx-auto px-4 py-8 text-center">
      <p className="text-gray-500 text-lg">Carrinho vazio.</p>
      <button onClick={() => onNavigate('loja')} className="mt-4 underline text-gray-700">Ver produtos</button>
    </main>
  )
  return (
    <main className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Carrinho</h1>
      <ul className="divide-y">
        {itens.map(item => (
          <li key={`${item.id}-${item.tamanho}`} className="py-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{item.nome}</p>
              {item.tamanho && <p className="text-sm text-gray-500">Tamanho: {item.tamanho}</p>}
              <p className="text-sm text-gray-500">Qtd: {item.quantidade}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
              <button onClick={() => removerItem(item.id, item.tamanho)} className="text-xs text-red-500 hover:underline mt-1">Remover</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t pt-4 mt-2 flex justify-between font-bold text-lg">
        <span>Total</span><span>R$ {totalPreco().toFixed(2)}</span>
      </div>
      <button onClick={() => onNavigate('formulario')} className="mt-6 w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">Finalizar Pedido</button>
    </main>
  )
}
EOF

cat > src/pages/Formulario.tsx << 'EOF'
// RESPONSÁVEL: Iago + Rayssa | PRIORIDADE: Alta
import { useState } from 'react'
import { useCarrinho } from '@/store/carrinho'
import { gerarLinkWhatsApp } from '@/lib/whatsapp'
import { salvarPedidoNaPlanilha } from '@/lib/sheets'
import type { Pagina } from '@/App'
export default function Formulario({ onNavigate }: { onNavigate: (p: Pagina) => void }) {
  const { itens, totalPreco, limparCarrinho } = useCarrinho()
  const [nome, setNome] = useState('')
  const [contato, setContato] = useState('')
  const [enviando, setEnviando] = useState(false)
  if (itens.length === 0) return (
    <main className="container mx-auto px-4 py-8 text-center">
      <p className="text-gray-500">Nenhum item no carrinho.</p>
      <button onClick={() => onNavigate('loja')} className="mt-4 underline">Ver loja</button>
    </main>
  )
  async function handleSubmit() {
    if (!nome.trim() || !contato.trim()) { alert('Preencha nome e contato.'); return }
    setEnviando(true)
    const dados = { nome, contato, itens, total: totalPreco() }
    await salvarPedidoNaPlanilha(dados)
    const link = gerarLinkWhatsApp(dados)
    limparCarrinho(); window.open(link, '_blank'); onNavigate('home')
  }
  return (
    <main className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Finalizar Pedido</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome completo</label>
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">WhatsApp / Contato</label>
          <input type="text" value={contato} onChange={e => setContato(e.target.value)} placeholder="(11) 99999-9999" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900" />
        </div>
      </div>
      <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-900 mb-2">Resumo</p>
        {itens.map(i => <p key={`${i.id}-${i.tamanho}`}>{i.nome}{i.tamanho ? ` (${i.tamanho})` : ''} x{i.quantidade} — R$ {(i.preco * i.quantidade).toFixed(2)}</p>)}
        <p className="font-bold text-gray-900 mt-2">Total: R$ {totalPreco().toFixed(2)}</p>
      </div>
      <button onClick={handleSubmit} disabled={enviando} className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50">
        {enviando ? 'Enviando...' : '📲 Confirmar via WhatsApp'}
      </button>
    </main>
  )
}
EOF

cat > src/components/loja/CardProduto.tsx << 'EOF'
// RESPONSÁVEL: Felipe + Rayssa
import { useState } from 'react'
import type { Produto } from '@/data/produtos'
import { useCarrinho } from '@/store/carrinho'
import type { Pagina } from '@/App'
interface Props { produto: Produto; onNavigate: (p: Pagina) => void }
export default function CardProduto({ produto }: Props) {
  const { adicionarItem } = useCarrinho()
  const [tamanho, setTamanho] = useState(produto.tamanhos?.[0] ?? '')
  const [adicionado, setAdicionado] = useState(false)
  function handleAdicionar() {
    adicionarItem({ id: produto.id, nome: produto.nome, preco: produto.preco, quantidade: 1, tamanho: tamanho || undefined, imagem: produto.imagem })
    setAdicionado(true); setTimeout(() => setAdicionado(false), 1500)
  }
  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      {produto.imagem
        ? <img src={produto.imagem} alt={produto.nome} className="w-full h-48 object-cover" />
        : <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-4xl">🏆</div>
      }
      <div className="p-4">
        <h3 className="font-semibold text-lg">{produto.nome}</h3>
        {produto.descricao && <p className="text-sm text-gray-500 mt-1">{produto.descricao}</p>}
        <p className="text-xl font-bold mt-2">R$ {produto.preco.toFixed(2)}</p>
        {produto.tamanhos && produto.tamanhos.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-3">
            {produto.tamanhos.map(t => (
              <button key={t} onClick={() => setTamanho(t)} className={`px-3 py-1 text-sm border rounded-md transition-colors ${tamanho === t ? 'bg-gray-900 text-white border-gray-900' : 'hover:border-gray-900'}`}>{t}</button>
            ))}
          </div>
        )}
        <button onClick={handleAdicionar} disabled={!produto.disponivel} className="mt-4 w-full py-2 rounded-lg text-sm font-semibold transition-colors bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40">
          {adicionado ? '✔ Adicionado!' : produto.disponivel ? 'Adicionar ao carrinho' : 'Indisponível'}
        </button>
      </div>
    </div>
  )
}
EOF

cat > src/components/loja/BotaoCarrinho.tsx << 'EOF'
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
EOF

cat > src/components/formulario/FormPedido.tsx << 'EOF'
// RESPONSÁVEL: Iago + Rayssa — expandir conforme necessário
export default function FormPedido() { return null }
EOF

ok "Todos os arquivos fonte criados"

step "Verificando estrutura final..."
echo ""
find src -type f | sort | sed 's/^/    /'
echo ""
ok "Estrutura OK"

step "Configurando branches Git..."
git add -A
git commit -m "chore: setup completo — React + Vite + TS + Tailwind + Zustand" 2>/dev/null || warn "Commit ignorado (nada novo ou já existe)."

for branch in develop feature/home-page feature/loja-vitrine feature/carrinho feature/formulario-pedido feature/whatsapp-link feature/google-apps-script; do
  git branch "$branch" 2>/dev/null && echo "    ✔ $branch" || echo "    – $branch (já existe)"
done
ok "Branches configuradas"

step "Criando Issues no GitHub..."
if command -v gh &>/dev/null && gh auth status &>/dev/null 2>&1; then
  criar() { gh issue create --title "$1" --body "$2" 2>/dev/null && echo "    ✔ $1" || echo "    – Falhou: $1"; }
  criar "[SETUP] Setup inicial do projeto" "**Responsável:** Rayssa | **Prioridade:** 🔴 Alta | **Branch:** \`develop\`\n\nRevisar configurações do setup e ajustar tema de cores."
  criar "[FEAT] Página Principal (Home)" "**Responsável:** Felipe | **Prioridade:** 🔴 Alta | **Branch:** \`feature/home-page\`\n\nBanner, apresentação institucional e CTA para a loja."
  criar "[FEAT] Loja + CardProduto" "**Responsáveis:** Felipe + Rayssa | **Prioridade:** 🔴 Alta | **Branch:** \`feature/loja-vitrine\`\n\nGrid de produtos com foto, nome, preço, tamanhos e botão de adicionar ao carrinho."
  criar "[FEAT] Página do Carrinho" "**Responsável:** Felipe | **Prioridade:** 🟡 Média | **Branch:** \`feature/carrinho\`\n\nListagem de itens, controle de quantidade, remoção e total."
  criar "[FEAT] Formulário de Pedido + integração Sheets" "**Responsáveis:** Iago + Rayssa | **Prioridade:** 🔴 Alta | **Branch:** \`feature/formulario-pedido\`\n\nFormulário com nome e contato. Salva na planilha e abre WhatsApp."
  criar "[INFRA] Google Apps Script + Planilha" "**Responsável:** Iago | **Prioridade:** 🔴 Alta | **Branch:** \`feature/google-apps-script\`\n\n1. Criar planilha com colunas: Data, Nome, Contato, Produtos, Total\n2. Escrever doPost(e) no Apps Script\n3. Publicar como Web App\n4. Colocar URL no .env"
  criar "[FEAT] Link WhatsApp" "**Responsável:** Iago | **Prioridade:** 🔴 Alta | **Branch:** \`feature/whatsapp-link\`\n\nTestar e validar lib/whatsapp.ts."
  criar "[CONTENT] Cadastro de produtos reais" "**Responsável:** Arthur | **Prioridade:** 🟡 Média\n\nPreencher src/data/produtos.ts com os produtos reais da atlética."
  criar "[STYLE] Estilização e responsividade" "**Responsáveis:** Felipe + Rayssa | **Prioridade:** 🟡 Média\n\nPadronizar cores, tipografia, espaçamentos. Mobile first."
  criar "[QA] Testes manuais" "**Responsável:** Arthur | **Prioridade:** 🟢 Baixa\n\nTestar fluxo completo: produto → carrinho → formulário → WhatsApp → planilha."
  criar "[DEPLOY] Deploy na Vercel" "**Responsável:** Rayssa | **Prioridade:** 🟢 Baixa\n\nConectar repo à Vercel. Configurar variáveis de ambiente no painel."
  ok "11 Issues criadas!"
else
  warn "GitHub CLI não encontrado. Instale em https://cli.github.com e rode: gh auth login"
fi

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║        ✅  SETUP CONCLUÍDO COM SUCESSO!          ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}Próximos passos:${NC}"
echo "  1. Preencha o ${YELLOW}.env${NC} com WhatsApp e URL do Apps Script"
echo "  2. Rode ${YELLOW}npm run dev${NC}"
echo "  3. Cada membro vai para sua branch feature"
echo "  4. PRs sempre para ${YELLOW}develop${NC}, nunca direto pra main"
echo ""
echo -e "${BLUE}Branches disponíveis:${NC}"
git branch --list | sed 's/^/  /'
echo ""
