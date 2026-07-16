import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScheduleExplorer from "@/components/ScheduleExplorer";

export const metadata: Metadata = { title: "Schedule", description: "Explore the day-by-day, stage-by-stage schedule for Jashn-e-Hindustan 2027.", openGraph: { images: ["/og.jpg"] } };

export default function SchedulePage() {
  return (
    <>
      <PageHero eyebrow="12–14 February 2027" title="Shape your Jashn" description="Three days, four stages and dozens of ways to listen, learn, taste and join in. Filter the schedule to make the festival your own." image="/images/fireworks.jpg" />
      <section className="bg-cream py-20 md:py-28"><div className="section-shell"><ScheduleExplorer /></div></section>
    </>
  );
}
