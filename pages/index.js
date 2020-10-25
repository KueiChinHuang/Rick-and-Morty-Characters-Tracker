import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/Home.module.css'
import { getAllData } from '../lib/chars'
import Link from 'next/link'

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
      <Link href="/chars/[id]" as={`/chars/${char.id}`}>
        <a>
          <div className={styles.card} key={i}>
            <img src={char.image} width="150" height="150" />
            <p className="title">{char.name}</p>
            <p className="title">{char.location?.name}</p>
            <p className="title">{char?.status}</p>
          </div>
        </a>
      </Link> 
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