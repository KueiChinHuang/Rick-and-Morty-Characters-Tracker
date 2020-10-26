import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Filter from '../components/filter'

export default function Home({allCharData}) {
  var items = []
  allCharData.map((char, i) => {
    items.push(
      <Link href="/chars/[id]" as={`/chars/${char.id}`} key={i}>
        <a>
          <div className={styles.card} >
            <img src={char.image} width="150" height="150" />
            <p className="title">{char.name}</p>
            <p className={utilStyles.listItem}>{char.location?.name}</p>
            <p>{char?.status}</p>
            <p>{char.species}</p>
            <p>{char?.type}</p>
            <p>{char?.gender}</p>
          </div>
        </a>
      </Link> 
    );
  });
  
  return (<>
    <Layout home>
      <Head>Character Tracker</Head>
      
      <section>
        <Filter />
        <div className={styles.grid}>{items}</div>   
      </section>
    </Layout>

    </>
  )
}