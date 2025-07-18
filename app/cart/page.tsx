"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./cart.module.css";

type CartItem = {
  name: string;
  price: string;
  size: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("woody_cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  function handleRemove(index: number) {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("woody_cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <div className={styles.page}>
      <button onClick={() => router.push("/")} className={styles.backButton}>
        Back to Shop
      </button>
      <h1 className={styles.title}>Cart</h1>
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
                  <div className={styles.itemPrice}>{item.price}</div>
                </div>
                <button onClick={() => handleRemove(i)} className={styles.removeButton}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => router.push("/checkout")} className={styles.checkoutButton}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
} 