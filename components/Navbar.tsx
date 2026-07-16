"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/data/site";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-white/10 bg-black/80 backdrop-blur-xl" : "bg-gradient-to-b from-black/65 to-transparent"}`}>
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-5 md:h-24 md:px-10">
          <Link href="/" onClick={() => setOpen(false)} className="relative z-50 flex min-w-0 items-center gap-2.5 text-cream sm:gap-3" aria-label="Jashn-e-Hindustan home">
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/50 font-serif text-lg text-gold sm:size-10 sm:text-xl">ज</span>
            <span className="truncate font-serif text-[1.05rem] leading-none tracking-tight sm:text-xl md:text-2xl">Jashn-e-<em className="font-normal text-gold">Hindustan</em></span>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`nav-link ${pathname === item.href ? "text-gold" : "text-cream/75"}`}>{item.label}</Link>
            ))}
            <Link href="/schedule" className="button button-gold ml-2">Plan your day <ArrowUpRight size={15} /></Link>
          </nav>
          <button type="button" onClick={() => setOpen((value) => !value)} className="relative z-50 ml-2 grid size-11 shrink-0 place-items-center rounded-full border border-white/20 text-cream lg:hidden" aria-expanded={open} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 overflow-y-auto bg-black px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-28 sm:px-6 sm:pt-32 lg:hidden">
            <motion.nav initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} className="flex flex-col" aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <motion.div key={item.href} variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-white/10 py-4 font-serif text-[clamp(2rem,10vw,2.5rem)] text-cream sm:py-5">
                    <span>{item.label}</span><span className="font-sans text-xs tracking-[0.2em] text-gold">0{index + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <p className="mt-8 text-[.66rem] uppercase tracking-[0.18em] text-cream/45 sm:absolute sm:bottom-8 sm:left-6 sm:mt-0 sm:text-xs sm:tracking-[0.2em]">12–14 February 2027 · New Delhi</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
