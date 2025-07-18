"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./product.module.css";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type Product = {
  name: string;
  images: string[];
  price: string;
  slug: string;
  desc: string;
};

export default function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState<string>("M");
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const addedTimeout = useRef<NodeJS.Timeout | null>(null);
  const [fade, setFade] = useState<'in' | 'out' | null>(null);
  const [opacity, setOpacity] = useState(0);
  const [imageIdx, setImageIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (added && fade === 'in') {
      setOpacity(0);
      setTimeout(() => setOpacity(1), 50);
    }
    if (fade === 'out') {
      setOpacity(0);
    }
  }, [added, fade]);

  function handleAddToCart() {
    const stored = localStorage.getItem("woody_cart");
    const cart = stored ? JSON.parse(stored) : [];
    cart.push({ name: product.name, price: product.price, size });
    localStorage.setItem("woody_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    setAdded(true);
    setFade('in');
    if (addedTimeout.current) clearTimeout(addedTimeout.current);
    addedTimeout.current = setTimeout(() => setFade('out'), 2000);
    setTimeout(() => setAdded(false), 2500);
  }
  function handleBuy() {
    handleAddToCart();
    router.push("/checkout");
  }

  return (
    <div className={styles.page}>
      {added && (
        <div style={{
          position: 'fixed',
          top: 28,
          right: 90,
          background: '#4B2E13',
          color: '#fff',
          borderRadius: 18,
          padding: '8px 24px',
          fontWeight: 400,
          fontStyle: 'italic',
          fontFamily: 'var(--font-geist-sans, Arial, Helvetica, sans-serif)',
          fontSize: 16,
          boxShadow: '0 2px 12px rgba(45,27,14,0.10)',
          zIndex: 1000,
          letterSpacing: '0.04em',
          opacity: opacity,
          transition: 'opacity 1.3s',
        }}>
          Added!
        </div>
      )}
      <div className={styles.container}>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <div
            className={styles.imageWrap}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <button
              onClick={() => setImageIdx((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                background: '#e9e4df',
                border: 'none',
                borderRadius: 18,
                width: 36,
                height: 36,
                cursor: 'pointer',
                fontSize: 22,
                color: '#bca88d',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.5s',
                boxShadow: hovered ? '0 2px 8px rgba(188,168,141,0.10)' : 'none',
              }}
              aria-label="Previous image"
            >&#8592;</button>
            <Image
              src={product.images[imageIdx]}
              alt={product.name}
              width={480}
              height={600}
              className={styles.image}
              priority
            />
            <button
              onClick={() => setImageIdx((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                background: '#e9e4df',
                border: 'none',
                borderRadius: 18,
                width: 36,
                height: 36,
                cursor: 'pointer',
                fontSize: 22,
                color: '#bca88d',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.5s',
                boxShadow: hovered ? '0 2px 8px rgba(188,168,141,0.10)' : 'none',
              }}
              aria-label="Next image"
            >&#8594;</button>
          </div>
        </div>
        <div className={styles.info}>
          <h1 className={styles.name}>{product.name}</h1>
          <div className={styles.price}>{product.price}</div>
          <div className={styles.desc}>{product.desc}</div>
          <div className={styles.sizes}>
            {['S', 'M', 'L'].map((s) => (
              <button
                key={s}
                className={size === s ? styles.sizeBtnActive : styles.sizeBtn}
                onClick={() => setSize(s)}
                type="button"
              >
                {s}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            <button className={styles.cartBtn} onClick={handleAddToCart}>Add to Cart</button>
            <button className={styles.buyBtn} onClick={handleBuy}>Checkout</button>
          </div>
          <Link href="/" className={styles.back}>&larr; Back to Shop</Link>
        </div>
      </div>
    </div>
  );
} 