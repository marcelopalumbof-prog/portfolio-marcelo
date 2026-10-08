import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  metadataBase: new URL("https://seuportfolio.com.br"),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description:
    "Criação de sites profissionais e gestão de tráfego pago. Sites rápidos, otimizados para SEO e focados em conversão. Meta Ads e Google Ads.",
  keywords: [
    "criação de sites",
    "tráfego pago",
    "desenvolvedor web",
    "landing page",
    "e-commerce",
    "Meta Ads",
    "Google Ads",
    "SEO",
    "freelancer",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: `${profile.name} — ${profile.role}`,
    title: `${profile.name} — ${profile.role}`,
    description:
      "Criação de sites profissionais e gestão de tráfego pago. Sites rápidos, otimizados para SEO e focados em conversão.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description:
      "Criação de sites profissionais e gestão de tráfego pago. Sites rápidos, otimizados para SEO e focados em conversão.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
