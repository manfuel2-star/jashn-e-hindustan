"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

type Item = { question: string; answer: string };

export default function Accordion({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="border-t border-ink/15">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question} className="border-b border-ink/15">
            <button type="button" onClick={() => setOpenIndex(open ? null : index)} className="flex w-full items-center justify-between gap-8 py-7 text-left md:py-9" aria-expanded={open}>
              <span className="flex items-baseline gap-5 md:gap-8"><span className="text-xs tracking-[0.16em] text-maroon/55">{String(index + 1).padStart(2, "0")}</span><span className="font-serif text-2xl leading-tight md:text-4xl">{item.question}</span></span>
              <motion.span animate={{ rotate: open ? 45 : 0 }} className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/20"><Plus size={18} /></motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                  <p className="max-w-3xl pb-8 pl-10 text-base leading-8 text-ink/65 md:pl-16 md:text-lg">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
