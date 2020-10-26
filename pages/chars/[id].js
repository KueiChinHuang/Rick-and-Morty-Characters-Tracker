import Head from 'next/head'
import Layout from '../../components/layout'
// import { getAllData } from '../../lib/chars'
import { getAllData, getCharData } from '../../lib/chars'
import utilStyles from '../../styles/utils.module.css'

/*
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
*/

export async function getStaticPaths() {
  const allData = await getAllData('')
  const paths = allData.map((c) => ({
    params: { id: c.id.toString() }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const charResp = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`)
  const charData = await charResp.json()

  return {
    props: {
      charData
    },
    revalidate: 604800
  }
}

export default function Post({charData}) {
  return (
      <Layout>
      {/* {console.log(charData)} */}
        <Head>
          <title>{charData.name}</title>
        </Head>
        <article>
          <img src={charData.image}></img>
          <h1 className={utilStyles.headingXl}>{charData.name}</h1>
          <div className={utilStyles.lightText}>Location: {charData.location.name}</div>
          <div>Status: {charData.status}</div>
          <div>Species: {charData.species}</div>
          <div>Gender: {charData.gender}</div>
          <div>Type: {charData.type}</div>
          <div>Origin: {charData.origin.name}</div>
        </article>
      </Layout>
  )
}
