"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartIcon() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    function updateCart() {
      const stored = localStorage.getItem("woody_cart");
      setCount(stored ? JSON.parse(stored).length : 0);
    }
    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);
  return (
    <Link href="/cart" style={{ marginLeft: 32, display: "flex", alignItems: "center", textDecoration: "none" }}>
      <span style={{ fontSize: 22, marginRight: 6 }}>👜</span>
      <span style={{ fontWeight: 600, color: "#4B2E13", fontSize: 16 }}>{count}</span>
    </Link>
  );
} 