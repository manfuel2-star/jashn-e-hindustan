import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Visitor’s Guide",
  description: "Festival timings, directions, accessibility and practical information for visiting Jashn-e-Hindustan.",
  openGraph: { images: ["/og-hq.jpg"] },
};

export default function VisitorsGuideLayout({ children }: { children: ReactNode }) {
  return children;
}
