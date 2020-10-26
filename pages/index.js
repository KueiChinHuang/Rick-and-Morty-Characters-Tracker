import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/Home.module.css'
import { getAllData } from '../lib/chars'
import Link from 'next/link'
import Filter from '../components/filter'
/*
export async function getStaticProps() {
  const allCharData = await getAllData()
  return {
    props: {
      allCharData
    },
    revalidate: 604800
  }
}
*/

export async function getServerSideProps(context) {
  // console.log(context.resolvedUrl)
  const query = context.resolvedUrl
  const allCharData = await getAllData(query)
  return {
    props: {
      allCharData
    }
  }
}


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
        {console.log({allCharData})}
        <div className={styles.grid}>{items}</div>   
      </section>
    </Layout>

    </>
  )
}