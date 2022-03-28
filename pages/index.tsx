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
        <Shortlink destination={`
        https://www.google.com/search?q=box+shadow+css+generator&oq=box+&aqs=chrome.0.69i59j69i57j35i39j0i20i263i433i512j0i20i263i512j69i60j69i61j69i60.996j0j7&sourceid=chrome&ie=UTF-8
        `} shortlink={'tini.url/ag4a96nb'}></Shortlink>
        <div >
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
