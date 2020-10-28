import { getAllData } from '../lib/chars'
import Home from '../components/home'
import UserInfo from '../components/userInfo'
import { useContext } from 'react'
import UserContext from '../components/userContext'

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
  const { user, signOut } = useContext(UserContext);

  if (!user) {
    return false;
  }
  
  return (
    <div>
      <UserInfo />
      <Home allCharData={allCharData} />
    </div>
  )
}