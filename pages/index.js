import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mr. Please</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image src="/../public/wordmark_logo.png" width={306} height={396} />
        <h1 className={styles.title}>Coming Soon</h1>
      </main>
    </div>
  );
}
