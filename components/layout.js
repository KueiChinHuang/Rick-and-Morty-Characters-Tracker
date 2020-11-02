import Head from "next/head";
import styles from "../styles/layout.module.css";
import Link from "next/link";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

const name = "Rick and Morty Character Tracker";
export const siteTitle = "Created by Kuei-Chin Huang";

export default function Layout({ children, home }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/Rick.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <Navbar />
        {home ? (
          <>
            <img
              src="/images/profile.jpg"
              className={`${styles.headerHomeImage} ${styles.borderCircle}`}
              alt={name}
            />
            <h1 className={styles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpg"
                  className={`${styles.headerImage} ${styles.borderCircle}`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={styles.headingXl}>
              <Link href="/">
                <a className={styles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      {!home && (
        <div className={styles.backToHome}>
          <h3 onClick={() => router.back()}>
            <a>← Back to last page</a>
          </h3>
        </div>
      )}
      <main>{children}</main>
    </div>
  );
}
