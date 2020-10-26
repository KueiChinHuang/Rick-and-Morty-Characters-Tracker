import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/Home.module.css'
import { getAllData } from '../lib/chars'
import Link from 'next/link'
import Filter from '../components/filter'
import Home from '../components/home'

export async function getServerSideProps(context) {
  console.log("-------------This is in filter page!---------------")
  console.log(" context.resolvedUrl in filter page!: ", context.resolvedUrl)
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