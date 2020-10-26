import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/Home.module.css'
import { getAllData } from '../lib/chars'
import Link from 'next/link'
import Filter from '../components/filter'
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