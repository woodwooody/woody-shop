"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    <div style={{ maxWidth: 600, margin: "60px auto", fontFamily: 'var(--font-geist-sans, Arial, Helvetica, sans-serif)' }}>
      <button onClick={() => router.push("/")} style={{ marginBottom: 32, background: '#fff', color: '#4B2E13', border: '1.5px solid #4B2E13', borderRadius: 20, padding: '8px 24px', fontWeight: 600, cursor: 'pointer', fontSize: 16, transition: 'background 0.18s, color 0.18s, border 0.18s' }}
        onMouseOver={e => (e.currentTarget.style.background = '#f7f3ef')}
        onMouseOut={e => (e.currentTarget.style.background = '#fff')}
      >Back to Shop</button>
      <h1 style={{ fontSize: "2rem", marginBottom: 32 }}>Cart</h1>
      {cart.length === 0 ? (
        <div style={{ color: "#888" }}>Your cart is empty.</div>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item, i) => (
              <li key={i} style={{ marginBottom: 24, borderBottom: "1px solid #eee", paddingBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ color: "#4B2E13", margin: "4px 0" }}>Size: {item.size}</div>
                  <div style={{ color: "#6d4c2b" }}>{item.price}</div>
                </div>
                <button onClick={() => handleRemove(i)} style={{ background: '#fff', color: '#4B2E13', border: '1.5px solid #4B2E13', borderRadius: 20, padding: '6px 18px', fontWeight: 600, cursor: 'pointer', fontSize: 15, marginLeft: 16, transition: 'background 0.18s, color 0.18s, border 0.18s' }}
                  onMouseOver={e => (e.currentTarget.style.background = '#f7f3ef')}
                  onMouseOut={e => (e.currentTarget.style.background = '#fff')}
                >Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={() => router.push("/checkout")} style={{ marginTop: 32, background: '#4B2E13', color: '#fff', border: 'none', borderRadius: 24, padding: '14px 40px', fontWeight: 700, fontSize: 18, cursor: 'pointer', transition: 'background 0.18s' }}
            onMouseOver={e => (e.currentTarget.style.background = '#6d4c2b')}
            onMouseOut={e => (e.currentTarget.style.background = '#4B2E13')}
          >Checkout</button>
        </>
      )}
    </div>
  );
} 