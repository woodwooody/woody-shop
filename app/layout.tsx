import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CartIcon from "./components/CartIcon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "woody shop",
  description: "감성적이고 트렌디한 미니멀 패션 스토어",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "18px 48px 0 0", position: "relative", zIndex: 10 }}>
          <CartIcon />
        </div>
        {children}
      </body>
    </html>
  );
}
