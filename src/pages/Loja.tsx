// RESPONSÁVEL: Felipe + Rayssa | PRIORIDADE: Alta
export default function Loja() {
  
  const voltar = () => {
    window.location.href = '/'; 
  };

  return (
    <div style={{ padding: '2rem', color: 'white', backgroundColor: '#14182e', minHeight: '100vh' }}>
      <h1>Página da Loja</h1>
      <p>Aqui ficarão as camisetas e canecas da Terabyte!</p>
      
      <button onClick={voltar}>
        Voltar para o Início
      </button>
    </div>
  );
}
