// RESPONSÁVEL: Felipe | PRIORIDADE: Alta
import styles from './Home.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.conteudo}>
        <h1 className={styles.titulo}>Quem somos?</h1>
        <p className={styles.texto}>
          A Terabyte é a atlética oficial do curso de Ciência da Computação do IF Goiano - Campus
          Morrinhos. Fundada em 2018, a Atlética tem como objetivo promover a integração entre os
          estudantes do curso, além de incentivar a prática esportiva e a participação em eventos
          acadêmicos e sociais.
        </p>
      </div>
    </main>
  )
}
