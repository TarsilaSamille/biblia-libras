import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Books from '../components/books'
import utilStyles from '../styles/utils.module.css'

export default function Biblia() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
      <Books/> 
 </section>
    </Layout>
  )
}
