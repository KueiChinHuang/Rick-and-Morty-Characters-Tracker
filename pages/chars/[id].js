import Head from 'next/head'
import Layout from '../../components/layout'
// import { getAllCharIds, getCharData } from '../../lib/chars'
import utilStyles from '../../styles/utils.module.css'

export async function getServerSideProps(context) {
  // console.log(context)
  const { id } = context.query
  const resp = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
  const charData = await resp.json()
  return {
    props: {
      charData
    },
  }
}

export default function Post({charData}) {
  return (
    /*
    <Layout>
 
      {charData.name}
      <br />
      {charData.id}
      <br />
      {charData.status}
    </Layout>
    */
      <Layout>
      {console.log(charData)}
        <Head>
          <title>{charData.name}</title>
        </Head>
        <article>
          <img src={charData.image}></img>
          <h1 className={utilStyles.headingXl}>{charData.name}</h1>
          <div className={utilStyles.lightText}>{charData.location.name}</div>
          <div>{charData.status}</div>
        </article>
      </Layout>
  )
}
