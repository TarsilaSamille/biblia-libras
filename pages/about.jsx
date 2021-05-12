import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import AboutDiv from '../components/about'
import utilStyles from '../styles/utils.module.css'

export default function About() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
      <AboutDiv/> 
 </section>
    </Layout>
  )
}
