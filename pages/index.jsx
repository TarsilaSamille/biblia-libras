import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Books from '../components/Books'
import utilStyles from '../styles/utils.module.css'
import content from '../data/hb.content.json';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
      <Books/> 
      {/* <nav>
          <ul>
            {content.videos.map(video =>
                <li key={video.id}>

 <Link href={'https://youtube.com/watch?v=' + video.videoId}   >{video.chapter_verses}</Link>
                </li>,
            )}
          </ul>
        </nav> */}
      
 </section>
    </Layout>
  )
}