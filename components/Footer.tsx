"use client";

import Link from "next/link";
import { ArrowUpRight, Camera, Play, Users } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black px-5 pb-8 pt-20 text-cream md:px-10 md:pt-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-14 border-b border-white/10 pb-16 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.24em] text-gold">A festival of many Indias</p>
            <h2 className="max-w-xl font-serif text-5xl leading-[0.95] md:text-7xl">Come for a day.<br /><em className="text-gold">Carry it home.</em></h2>
          </div>
          <div>
            <p className="footer-label">Explore</p>
            <div className="flex flex-col gap-3 text-cream/70">
              <Link href="/schedule">Schedule</Link><Link href="/programs-and-sessions">Programs & sessions</Link><Link href="/visitors-guide">Visitor’s guide</Link><Link href="/partners-supporters">Partners & supporters</Link><Link href="/faqs">FAQs</Link>
            </div>
          </div>
          <div>
            <p className="footer-label">Festival office</p>
            <p className="leading-7 text-cream/70">Sunder Nursery<br />Mathura Road, New Delhi 110013</p>
            <a href="mailto:hello@jashnehindustan.in" className="mt-4 inline-flex items-center gap-2 text-gold">hello@jashnehindustan.in <ArrowUpRight size={14} /></a>
          </div>
        </div>
        <div className="flex flex-col gap-7 pt-7 text-xs uppercase tracking-[0.16em] text-cream/45 md:flex-row md:items-center md:justify-between">
          <p>© 2027 Jashn-e-Hindustan. All rights reserved.</p>
          <div className="flex gap-3">
            {[Camera, Play, Users].map((Icon, index) => <a key={index} href="#" aria-label={["Instagram", "YouTube", "Community"][index]} className="grid size-10 place-items-center rounded-full border border-white/15 text-cream/70 transition hover:border-gold hover:text-gold"><Icon size={16} /></a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
