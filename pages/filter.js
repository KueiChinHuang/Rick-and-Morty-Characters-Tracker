import { getAllData } from '../lib/chars'
import Home from '../components/home'
import { useContext } from 'react'
import UserContext from '../components/userContext'

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
  const { user, signOut } = useContext(UserContext);

  if (!user) {
    return false;
  }

  return (
    <Home allCharData={allCharData} />
  )
}