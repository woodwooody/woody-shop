"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./checkout.module.css";

type CartItem = {
  name: string;
  price: string;
  size: string;
};

function parsePrice(price: string) {
  return Number(price.replace(/[^\d]/g, ""));
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("woody_cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const total = cart.reduce((sum, item) => sum + parsePrice(item.price), 0);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Checkout</h1>
      {cart.length === 0 ? (
        <div className={styles.emptyCart}>Your cart is empty.</div>
      ) : (
        <>
          <ul className={styles.itemList}>
            {cart.map((item, i) => (
              <li key={i} className={styles.item}>
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemSize}>Size: {item.size}</div>
                </div>
                <div className={styles.itemPrice}>{item.price}</div>
              </li>
            ))}
          </ul>
          <div className={styles.total}>Total: ₩{total.toLocaleString()}</div>
          <button
            onClick={() => {
              alert('Thank you for your purchase!');
              localStorage.removeItem('woody_cart');
              window.dispatchEvent(new Event('storage'));
              router.push('/');
            }}
            className={styles.payButton}
          >
            Pay Now
          </button>
        </>
      )}
    </div>
  );
} 