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
  const [isPressed, setIsPressed] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchEndX.current - touchStartX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe right -> Previous image
        setImageIdx((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
      } else {
        // Swipe left -> Next image
        setImageIdx((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
      }
    }
  };

  useEffect(() => {
    if (isPressed && nameRef.current) {
      nameRef.current.style.animation = 'none';
      nameRef.current.offsetHeight;
      nameRef.current.style.animation = `${styles.scrollText} 8s linear`;
    }
  }, [isPressed]);

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
        <div className={styles.addedNotification} style={{
          opacity: opacity,
          transition: 'opacity 1.3s',
        }}>
          Added!
        </div>
      )}
      <div 
        className={styles.container}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
      >
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative', flex: 1 }}>
          <div
            className={styles.imageWrap}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none' }}
          >
            {!isPortrait && (
              <>
                <button
                  onClick={() => setImageIdx((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className={`${styles.imageButton} ${styles.prevButton}`}
                  aria-label="Previous image"
                >&#8592;</button>
                <button
                  onClick={() => setImageIdx((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className={`${styles.imageButton} ${styles.nextButton}`}
                  aria-label="Next image"
                >&#8594;</button>
              </>
            )}
            <Image
              src={product.images[imageIdx]}
              alt={product.name}
              width={480}
              height={600}
              className={`${styles.image} ${isPortrait ? styles.portraitImage : ''}`}
              priority
              draggable={false}
            />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.nameContainer}>
            <div className={styles.name} ref={nameRef}>{product.name}</div>
          </div>
          <div className={styles.price}>{product.price}</div>
          <div className={styles.desc}>
            {product.desc.split('. ').map((sentence, index) => (
              <span key={index}>
                {sentence}{index < product.desc.split('. ').length - 1 ? '.' : ''}
              </span>
            ))}
          </div>
          <div className={styles.sizes}>
            {['S', 'M', 'L'].map((s) => (
              <button
                key={s}
                className={size === s ? styles.sizeBtnActive : styles.sizeBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setSize(s);
                }}
                type="button"
              >
                {s}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            <button 
              className={styles.cartBtn} 
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              Add to Cart
            </button>
            <button 
              className={styles.buyBtn} 
              onClick={(e) => {
                e.stopPropagation();
                handleBuy();
              }}
            >
              Checkout
            </button>
          </div>
          <Link href="/" className={styles.back} onClick={(e) => e.stopPropagation()}>&larr; Back to Shop</Link>
        </div>
      </div>
    </div>
  );
} 