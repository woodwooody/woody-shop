"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    <div style={{ maxWidth: 600, margin: "60px auto", fontFamily: 'var(--font-geist-sans, Arial, Helvetica, sans-serif)' }}>
      <h1 style={{ fontSize: "2rem", marginBottom: 32 }}>Checkout</h1>
      {cart.length === 0 ? (
        <div style={{ color: "#888" }}>Your cart is empty.</div>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: 32 }}>
            {cart.map((item, i) => (
              <li key={i} style={{ marginBottom: 18, borderBottom: "1px solid #eee", paddingBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ color: "#4B2E13", margin: "4px 0" }}>Size: {item.size}</div>
                </div>
                <div style={{ color: "#6d4c2b", fontWeight: 600 }}>{item.price}</div>
              </li>
            ))}
          </ul>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#2d1b0e', marginBottom: 32 }}>Total: ₩{total.toLocaleString()}</div>
          <button onClick={() => {alert('Thank you for your purchase!'); localStorage.removeItem('woody_cart'); window.dispatchEvent(new Event('storage')); router.push('/');}} style={{ background: '#4B2E13', color: '#fff', border: 'none', borderRadius: 24, padding: '14px 40px', fontWeight: 700, fontSize: 18, cursor: 'pointer', transition: 'background 0.18s' }}
            onMouseOver={e => (e.currentTarget.style.background = '#6d4c2b')}
            onMouseOut={e => (e.currentTarget.style.background = '#4B2E13')}
          >Pay Now</button>
        </>
      )}
    </div>
  );
} 