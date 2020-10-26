import { getAllData } from '../lib/chars'
import Home from '../components/home'

export async function getServerSideProps(context) {
//   console.log("-------------This is in filter page!---------------")
//   console.log(" context.resolvedUrl in filter page!: ", context.resolvedUrl)
  const query = context.resolvedUrl
  const allCharData = await getAllData(query)
  return {
    props: {
      allCharData
    }
  }
}

export default function HomeFilter({allCharData}) {

  return (
    <Home allCharData={allCharData} />
  )
}