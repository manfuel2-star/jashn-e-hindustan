"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { scheduleEvents } from "@/data/site";

const days = ["Friday", "Saturday", "Sunday"] as const;
const dayDates = { Friday: "12 Feb", Saturday: "13 Feb", Sunday: "14 Feb" };
const stages = ["All stages", "Surya Manch", "Katha Baithak", "Rang Courtyard", "Karigar Adda"] as const;

export default function ScheduleExplorer() {
  const [day, setDay] = useState<(typeof days)[number]>("Friday");
  const [stage, setStage] = useState<(typeof stages)[number]>("All stages");
  const events = useMemo(() => scheduleEvents.filter((event) => event.day === day && (stage === "All stages" || event.stage === stage)), [day, stage]);

  return (
    <div>
      <div className="grid border-y border-ink/15 md:grid-cols-3">
        {days.map((item) => <button key={item} onClick={() => setDay(item)} className={`relative flex items-center justify-between border-b border-ink/15 px-5 py-5 text-left last:border-b-0 md:border-b-0 md:border-r md:px-8 md:py-7 md:last:border-r-0 ${day === item ? "bg-maroon text-cream" : "hover:bg-paper"}`}><span><span className="block text-xs uppercase tracking-[.2em] opacity-55">{dayDates[item]}</span><span className="mt-1 block font-serif text-3xl">{item}</span></span>{day === item && <motion.span layoutId="day-dot" className="size-2 rounded-full bg-gold" />}</button>)}
      </div>
      <div className="my-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">{stages.map((item) => <button key={item} onClick={() => setStage(item)} className={`shrink-0 rounded-full border px-4 py-2.5 text-[.64rem] font-bold uppercase tracking-[.14em] transition ${stage === item ? "border-black bg-black text-cream" : "border-ink/20 text-ink/60 hover:border-maroon hover:text-maroon"}`}>{item}</button>)}</div>
      <AnimatePresence mode="wait">
        <motion.div key={`${day}-${stage}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .3 }} className="border-t border-ink/15">
          {events.length ? events.map((event, index) => (
            <motion.article key={`${event.time}-${event.title}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .05 }} className="group grid gap-4 border-b border-ink/15 py-7 md:grid-cols-[140px_1fr_250px_56px] md:items-center md:py-9">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-maroon"><Clock size={14} />{event.time}</div>
              <div><span className="mb-2 block text-[.62rem] uppercase tracking-[.18em] text-ink/45">{event.type}</span><h3 className="font-serif text-3xl leading-tight md:text-4xl">{event.title}</h3><p className="mt-2 text-sm text-ink/55">{event.artist}</p></div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[.12em] text-ink/55"><MapPin size={14} className="text-gold" />{event.stage}</div>
              <button className="hidden size-11 place-items-center rounded-full border border-ink/15 transition group-hover:border-maroon group-hover:bg-maroon group-hover:text-cream md:grid" aria-label={`View ${event.title}`}><ArrowUpRight size={16} /></button>
            </motion.article>
          )) : <div className="py-20 text-center"><p className="font-serif text-3xl">No sessions on this stage yet.</p><p className="mt-2 text-sm text-ink/50">Try selecting another stage.</p></div>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
