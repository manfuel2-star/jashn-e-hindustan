import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { BLUR_DATA_URL, programs } from "@/data/site";

export const metadata: Metadata = { title: "Programs & Sessions", description: "Discover music, literature, craft, food, art and family experiences at Jashn-e-Hindustan.", openGraph: { images: ["/og-hq.jpg"] } };

export default function ProgramsPage() {
  return (
    <>
      <PageHero eyebrow="The complete program" title="Many worlds, one garden" description="From main-stage performances to conversations for fifty, every program is an invitation to encounter India through another person’s practice." image="/images/classical-dance.jpg" />
      <section className="bg-cream py-20 md:py-32"><div className="section-shell">
        <div className="grid gap-x-7 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => <AnimatedSection key={program.title} delay={(index % 3) * .06} className={index === 0 ? "lg:col-span-2" : ""}>
            <article className="group">
              <div className={`relative overflow-hidden rounded-[1.25rem] bg-maroon ${index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}><Image src={program.image} alt="" fill sizes={index === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"} quality={90} className="object-cover transition-transform duration-700 group-hover:scale-105" placeholder="blur" blurDataURL={BLUR_DATA_URL} /><span className="absolute left-5 top-5 rounded-full bg-black/70 px-3 py-2 text-[.6rem] uppercase tracking-[.18em] text-gold backdrop-blur">{program.category}</span></div>
              <h2 className="mt-6 font-serif text-4xl leading-none md:text-5xl">{program.title}</h2><p className="mt-4 max-w-xl leading-7 text-ink/60">{program.description}</p><Link href="/schedule" className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-maroon">Find in schedule <span aria-hidden="true">→</span></Link>
            </article>
          </AnimatedSection>)}
        </div>
      </div></section>
    </>
  );
}
