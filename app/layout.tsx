import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://jashn-e-hindustan.umar8527.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Jashn-e-Hindustan 2027", template: "%s · Jashn-e-Hindustan" },
  description: "A three-day celebration of India’s languages, arts, music, food, craft and living heritage in New Delhi.",
  openGraph: { title: "Jashn-e-Hindustan 2027", description: "A festival of many Indias. 12–14 February 2027, New Delhi.", type: "website", images: ["/og-hq.jpg"] },
  twitter: { card: "summary_large_image", title: "Jashn-e-Hindustan 2027", description: "A festival of many Indias. 12–14 February 2027, New Delhi.", images: ["/og-hq.jpg"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
