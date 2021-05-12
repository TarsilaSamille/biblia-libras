import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Header from './header'
import Footer from './footer'

const name = 'Bíblia em LIBRAS'
export const siteTitle = 'Biblia em LIBRAS'


export default function Layout({ children, home }) {

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/biblia.ico" />
<meta
          name="description"
          content="Bíblia em LIBRAS"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        

        <meta charset="UTF-8"/>
        <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
        <meta content="width=device-width,initial-scale=1" name="viewport"/>
        <meta content="description" name="description"/>
        <meta content="Mashup templates have been developped by Orson.io team" name="author"/>
          <meta name="msapplication-tap-highlight" content="no"/>








        
      </Head>

      
     <Header/>
      <main>{children}</main>
    <Footer/>
    </div>
  )
}