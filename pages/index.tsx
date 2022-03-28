import Head from 'next/head'
import Layout, { siteTitle, name } from '../components/layout'
import utilStyles from '../styles/utils.module.scss'
import { getSortedPostsData } from '../lib/posts'
import Shortlink from '../components/shortlink'
import Date from '../components/date'
import { GetStaticProps } from 'next'

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  
  return (
    <Layout home>
      <Head>
        <title>{name}</title>
      </Head>
        <div className={utilStyles.field}>
          <input className={utilStyles.input}/>
          <div className={utilStyles.line}></div>
        </div>
        <div className={utilStyles.buttons}>
        <button className={utilStyles.button}>encode</button>
        {/* <button className={utilStyles.button}>decode</button> */}
        </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
