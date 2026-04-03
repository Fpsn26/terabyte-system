// RESPONSÁVEL: Felipe | PRIORIDADE: Alta
import styles from './Home.module.css'

export default function Home() {
  const irParaLoja = () => {
    window.location.href = '/loja'
  }

  return (
    <main className={styles.main}>
      <div className={styles.logo}>
        <img className={styles.image} src="./images/logo_bombado.png" alt="Logo da Terabyte" />
      </div>
      <div className={styles.colunaDireita}>
        <div className={styles.conteudo}>
          <h1 className={styles.titulo}>Quem somos?</h1>
          <p className={styles.texto}>
            A Terabyte é a atlética oficial do curso de Ciência da Computação do IF Goiano - Campus
            Morrinhos. Fundada em 2018, a Atlética tem como objetivo promover a integração entre os
            estudantes do curso, além de incentivar a prática esportiva e a participação em eventos
            acadêmicos e sociais.
          </p>
        </div>
        <div className={styles.produtos}>
          <p className={styles.titulo}>Produtos</p>
          <ul className={styles.lista}>
            <li>Camisa</li>
            <li>Caneca</li>
            <li>Adesivo</li>
          </ul>

          <button className={styles.botao} onClick={irParaLoja}>
            Acessar Loja!
          </button>
        </div>
      </div>
    </main>
  )
}
