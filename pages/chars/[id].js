import Layout from '../../components/layout'
// import { getAllCharIds, getCharData } from '../../lib/chars'

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
    <Layout>
      {console.log(charData)}
 
      {charData.name}
      <br />
      {charData.id}
      <br />
      {charData.status}
    </Layout>
  )
}
