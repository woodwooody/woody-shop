import ProductDetail from "./ProductDetail";
import { notFound } from "next/navigation";
import { use } from "react";

export async function generateStaticParams() {
  return [
    { slug: "demin-shirt-indigo" },
    { slug: "round-neck-cardigan-red" },
    { slug: "round-neck-cardigan-beige" },
  ];
}

// 환경에 따른 basePath 설정
const getBasePath = () => {
  const isGitHubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true';
  return isGitHubPages ? '/woody-shop' : '';
};

const basePath = getBasePath();

const products = [
  {
    name: "Demin Shirt-Indigo",
    images: [`${basePath}/images/sample1.jpg`, `${basePath}/images/sample1-1.jpg`, `${basePath}/images/sample1-2.jpg`],
    price: "₩270,000",
    slug: "demin-shirt-indigo",
    desc: "감각적인 인디고 컬러와 프리미엄 일본산 원단 웨스턴 데님 셔츠.",
  },
  {
    name: "Round Neck Cardigan-Red",
    images: [`${basePath}/images/sample2.jpg`, `${basePath}/images/sample2-1.jpg`, `${basePath}/images/sample2-2.jpg`],
    price: "₩210,000",
    slug: "round-neck-cardigan-red",
    desc: "감각적인 레드 컬러의 라운드넥 가디건. 부드러운 촉감과 포근한 착용감.",
  },
  {
    name: "Round Neck Cardigan-Beige",
    images: [`${basePath}/images/sample3.jpg`, `${basePath}/images/sample3-1.jpg`, `${basePath}/images/sample3-2.jpg`],
    price: "₩210,000",
    slug: "round-neck-cardigan-beige",
    desc: "따뜻한 베이지 컬러의 라운드넥 가디건. 다양한 스타일에 어울리는 아이템.",
  },
];

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  return <ProductDetail product={product} />;
} 