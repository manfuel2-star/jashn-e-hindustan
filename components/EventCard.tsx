"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BLUR_DATA_URL } from "@/data/site";

type Props = {
  title: string;
  subtitle: string;
  image: string;
  meta?: string;
  href?: string;
  index?: number;
};

export default function EventCard({ title, subtitle, image, meta, href = "/schedule", index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.1 }}
      className="group"
    >
      <Link href={href} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-maroon shadow-card">
          <Image src={image} alt="" fill sizes="(max-width: 768px) 90vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
          <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-[0.66rem] uppercase tracking-[0.22em] text-cream/80">
            <span>{meta ?? "Jashn 2027"}</span>
            <span className="grid size-10 place-items-center rounded-full border border-white/25 bg-black/10 backdrop-blur-md transition-colors group-hover:bg-gold group-hover:text-black"><ArrowUpRight size={16} /></span>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
            <p className="mb-2 text-xs uppercase tracking-[0.22em] text-gold">{subtitle}</p>
            <h3 className="font-serif text-3xl leading-none md:text-[2.15rem]">{title}</h3>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
