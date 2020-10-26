import { getAllData } from '../lib/chars'
import Home from '../components/home'

export async function getStaticProps() {
  // console.log("-------------This is in index page!---------------")
  const allCharData = await getAllData('')
  return {
    props: {
      allCharData
    },
    revalidate: 604800
  }
}

export default function HomeIndex({allCharData}) {
  
  return (
    <Home allCharData={allCharData} />
  )
}