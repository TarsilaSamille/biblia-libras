import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Books from '../components/books'
import utilStyles from '../styles/utils.module.css'
import Home from '../components/home';


export default function Index() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
      <Home/>
 </section>
    </Layout>
  )
}
