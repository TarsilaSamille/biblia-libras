import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Glossario from "../components/glossario";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <div className={"container background-image-container text-center"}>
          {" "}
          <h1>EM BREVE</h1>
        </div>
      </section>
    </Layout>
  );
}
