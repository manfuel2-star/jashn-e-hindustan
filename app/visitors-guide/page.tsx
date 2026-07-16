"use client";

import Image from "next/image";
import { Bus, Car, Check, Clock3, MapPin, Train, X } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { BLUR_DATA_URL } from "@/data/site";

const travel = [
  { icon: Train, title: "By Metro", copy: "JLN Stadium (Violet Line) is the nearest station. Festival shuttles run every 15 minutes from Gate 2." },
  { icon: Bus, title: "By bus & shuttle", copy: "Low-floor festival shuttles connect JLN Stadium, Nizamuddin Railway Station and the main entrance." },
  { icon: Car, title: "By car or taxi", copy: "Use the designated drop-off on Mathura Road. On-site parking is limited; pre-booked parking is at Pragati Maidan." },
];

export default function VisitorsGuidePage() {
  return (
    <><PageHero eyebrow="Plan your visit" title="Arrive curious" description="A little planning leaves more room for discovery. Find timings, routes, access information and the useful details below." image="/images/venue.jpg" />
    <section className="bg-cream py-20 md:py-32"><div className="section-shell">
      <div className="grid gap-5 md:grid-cols-3">{[{ day: "Friday", time: "4:00–10:00 PM" }, { day: "Saturday", time: "10:30 AM–10:00 PM" }, { day: "Sunday", time: "10:30 AM–9:30 PM" }].map((item, index) => <AnimatedSection key={item.day} delay={index * .07} className="rounded-[1.25rem] border border-ink/10 bg-paper p-7 md:p-9"><Clock3 className="mb-8 text-maroon" /><p className="text-xs uppercase tracking-[.2em] text-ink/45">{item.day}</p><p className="mt-2 font-serif text-3xl">{item.time}</p><p className="mt-4 text-sm text-ink/50">Last entry one hour before closing</p></AnimatedSection>)}</div>
      <AnimatedSection className="mt-24"><SectionHeading eyebrow="Getting here" title="The easy way in" subtitle="Public transport is the most reliable way to reach the festival. Follow event signs from each arrival point." /></AnimatedSection>
      <div className="mt-12 grid gap-5 md:grid-cols-3">{travel.map((item, index) => <AnimatedSection key={item.title} delay={index * .07} className="border-t border-maroon/25 pt-7"><item.icon className="text-gold" size={26} /><h3 className="mt-6 font-serif text-3xl">{item.title}</h3><p className="mt-4 leading-7 text-ink/60">{item.copy}</p></AnimatedSection>)}</div>
      <AnimatedSection className="mt-24 grid overflow-hidden rounded-[1.5rem] bg-black text-cream md:grid-cols-2"><div className="relative min-h-[25rem]"><Image src="/images/qutub.jpg" alt="Delhi heritage landscape" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-70" placeholder="blur" blurDataURL={BLUR_DATA_URL} /><div className="absolute inset-0 bg-maroon/20" /><div className="absolute bottom-6 left-6 rounded-full bg-black/75 px-4 py-2 text-xs uppercase tracking-[.16em]"><MapPin className="mr-2 inline text-gold" size={14} />Sunder Nursery, New Delhi</div></div><div className="p-8 md:p-14"><p className="text-xs uppercase tracking-[.2em] text-gold">At the venue</p><h2 className="mt-4 font-serif text-5xl">Made for a full day</h2><ul className="mt-8 space-y-4 text-cream/70">{["Free drinking-water refill points", "Accessible paths and reserved stage viewing", "Cloakroom for small bags only", "Information and first-aid desks", "Quiet room and family care space"].map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 shrink-0 text-gold" size={16} />{item}</li>)}</ul></div></AnimatedSection>
      <div className="mt-24 grid gap-10 md:grid-cols-2"><AnimatedSection><h2 className="font-serif text-5xl">Do bring</h2><div className="mt-7 space-y-4">{["Your digital ticket and photo ID", "A reusable water bottle", "Comfortable walking shoes", "A light layer for the evening"].map(item => <p key={item} className="flex items-center gap-3 border-b border-ink/10 pb-4"><span className="grid size-7 place-items-center rounded-full bg-gold/25"><Check size={14} /></span>{item}</p>)}</div></AnimatedSection><AnimatedSection delay={.1}><h2 className="font-serif text-5xl">Leave at home</h2><div className="mt-7 space-y-4">{["Large bags, glass and outside alcohol", "Professional filming gear without a pass", "Single-use plastic bottles", "Pets, except registered service animals"].map(item => <p key={item} className="flex items-center gap-3 border-b border-ink/10 pb-4"><span className="grid size-7 place-items-center rounded-full bg-maroon/10 text-maroon"><X size={14} /></span>{item}</p>)}</div></AnimatedSection></div>
    </div></section></>
  );
}
