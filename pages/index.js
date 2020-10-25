import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/Home.module.css'


export const getAllData = async () => {
  let chars = []
  let nextHref = "https://rickandmortyapi.com/api/character"

  while(nextHref !== null) {
    const charsResp = await fetch(nextHref)
    const charsData = await charsResp.json()

    if (charsData) {
      nextHref = charsData.info.next
      chars = [...chars, ...charsData.results]
    }
  }

  return chars
}

export async function getStaticProps() {
  const allCharData = await getAllData()
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
      <div className={styles.card} key={i}>
        <img src={char.image} width="150" height="150" />
        <p className="title">{char.name}</p>
      </div>
    );
  });

  return (<>
    <Layout home>
      <Head>Character Tracker</Head>
      
      <section>
        {console.log({allCharData})}
        <div className={styles.grid}>{items}</div>   
      </section>
    </Layout>

    </>
  )
}