// import Head from 'next/head';
// import content from '../data/hb.content.json';

// export default function Video({video}) {
//   return (
//       <>
//         <Head>
//           <title>{video.chapter_verses} | {content.video.chapter_verses}</title>
//         </Head>
//         <h1>{video.chapter_verses}</h1>
//       </>
//   );
// }

// export async function getStaticPaths() {
//   const paths = content.videos.map(video => {
//     const id = video.id.split('/').slice(1);
//     return {params: {id}};
//   });
//   return {paths, fallback: true};
// }

// export async function getStaticProps({params}) {
//   const idA = `/${params.join('/')}`;
//   const id = content.videos.find(video => video.id === idA) || {notfound: true};
//   return {props: {id}};
// }