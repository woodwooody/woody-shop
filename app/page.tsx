"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useRef, useState } from "react";

// 환경에 따른 basePath 설정
const getBasePath = () => {
  const isGitHubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true';
  return isGitHubPages ? '/woody-shop' : '';
};

const basePath = getBasePath();

const products = [
  {
    name: "Demin Shirt-Indigo",
    image: `${basePath}/images/sample1.jpg`,
    price: "₩270,000",
    slug: "demin-shirt-indigo",
  },
  {
    name: "Round Neck Cardigan-Red",
    image: `${basePath}/images/sample2.jpg`,
    price: "₩210,000",
    slug: "round-neck-cardigan-red",
  },
  {
    name: "Round Neck Cardigan-Beige",
    image: `${basePath}/images/sample3.jpg`,
    price: "₩210,000",
    slug: "round-neck-cardigan-beige",
  },
];

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <>
      <audio ref={audioRef} src={`${basePath}/bgm.mp3`} loop hidden />
      <button
        onClick={() => {
          if (!playing) {
            audioRef.current && audioRef.current.play();
            setPlaying(true);
          } else {
            audioRef.current && audioRef.current.pause();
            setPlaying(false);
          }
        }}
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          background: "#4B2E13",
          color: "#fff",
          border: "none",
          borderRadius: 24,
          padding: "12px 28px",
          fontWeight: 600,
          fontSize: 16,
          cursor: "pointer",
          zIndex: 1000,
          boxShadow: "0 2px 12px rgba(45,27,14,0.10)",
          fontFamily: 'var(--font-geist-sans, Arial, Helvetica, sans-serif)',
          letterSpacing: '0.04em',
        }}
      >
        {playing ? "Stop Music" : "Play Music"}
      </button>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.logo}>woody shop</div>
          <nav className={styles.nav}>
            <a href="#shop">Shop</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>
        <main className={styles.main}>
          <section className={styles.hero}>
            <h1>Wear the Mood. Live the Moment.</h1>
            <p>Hello. It&apos;s woody shop.</p>
          </section>
          <section className={styles.products} id="shop">
            {products.map((product) => (
              <Link
                href={`/product/${product.slug}`}
                className={styles.product}
                key={product.slug}
              >
                <div className={styles.productImageWrap}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={320}
                    height={400}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productName}>{product.name}</div>
                  <div className={styles.productPrice}>{product.price}</div>
                </div>
              </Link>
            ))}
          </section>
        </main>
        <footer className={styles.footer}>
          <div>© woody shop 2024</div>
          <div className={styles.footerLinks}>
            <a href="#">Instagram</a>
            <a href="#">Privacy Policy</a>
          </div>
        </footer>
      </div>
    </>
  );
}
