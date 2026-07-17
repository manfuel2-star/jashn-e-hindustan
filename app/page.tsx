import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Festival 2027",
  description: "Jashn-e-Hindustan is a three-day celebration of Indian language, music, dance, food, craft and living heritage in New Delhi.",
  openGraph: { title: "Jashn-e-Hindustan 2027", description: "A festival of many Indias. 12–14 February 2027, New Delhi.", images: ["/og-hq.jpg"] },
};

export default function Home() {
  return <HomePage />;
}
