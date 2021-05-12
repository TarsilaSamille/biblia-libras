// import Link from 'next/link';
// import React from 'react';
// import content from '../data/frontaid.content.json';

// export default function MyApp({Component, pageProps}) {
//   return (
//       <>
        // <nav>
        //   <ul>
        //     <li><Link href="/"><a>{content.index.title}</a></Link></li>
        //     {content.pages.map(page =>
        //         <li key={page.path}>
        //           <Link href="[...pages]" as={page.path}><a>{page.title}</a></Link>
        //         </li>,
        //     )}
        //   </ul>
        // </nav>
//         <main>
//           <Component {...pageProps} />
//         </main>
//       </>
//   );
// }

import '../styles/global.css'
import 'antd/dist/antd.css';
import '../styles/main.a3f694c0.css'
export default function App({ Component, pageProps }) {
    return  <Component {...pageProps} /> 
  }