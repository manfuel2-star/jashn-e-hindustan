import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = { title: "Partners & Supporters", description: "Meet the cultural, hospitality, media and community partners supporting Jashn-e-Hindustan.", openGraph: { images: ["/og-hq.jpg"] } };

const groups = [
  { title: "Founding partners", names: ["Aarohan Foundation", "House of Sunehri", "The India Arts Trust"] },
  { title: "Cultural partners", names: ["Swar Archive", "Lok Kala Collective", "Bhasha House", "Craft Atlas", "Rangmanch"] },
  { title: "Hospitality & experience", names: ["Aangan Hotels", "Pavilion Kitchens", "Nadi Water", "Safar Mobility"] },
  { title: "Media & community", names: ["The Daily Edit", "Radio Awaaz", "City Stories", "Open Courtyard"] },
];

export default function PartnersPage() {
  return (
    <><PageHero eyebrow="With gratitude" title="Made together" description="Jashn-e-Hindustan is possible because institutions, makers and teams choose to invest in culture as a shared public good." image="/images/textile.jpg" /><section className="bg-cream py-20 md:py-32"><div className="section-shell space-y-20">{groups.map((group, groupIndex) => <AnimatedSection key={group.title} delay={groupIndex * .05}><div className="mb-8 flex items-center gap-4"><span className="text-xs uppercase tracking-[.2em] text-maroon">{group.title}</span><span className="h-px flex-1 bg-ink/15" /></div><div className="grid border-l border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-3">{group.names.map((name) => <div key={name} className="group grid min-h-40 place-items-center border-b border-r border-ink/15 bg-paper/30 p-7 text-center transition hover:bg-maroon hover:text-cream"><span className={`font-serif leading-none ${groupIndex === 0 ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"}`}>{name.split(" ").map((word, i) => <span key={i}>{word}{i === 0 && name.split(" ").length > 1 ? <br /> : " "}</span>)}</span></div>)}</div></AnimatedSection>)}</div></section><section className="bg-gold px-5 py-20 text-black md:px-10"><div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-center md:justify-between"><div><p className="text-xs uppercase tracking-[.2em] opacity-60">Build something lasting with us</p><h2 className="mt-3 font-serif text-5xl md:text-7xl">Become a festival partner.</h2></div><a className="button bg-black text-cream" href="mailto:partners@jashnehindustan.in">Start a conversation</a></div></section></>
  );
}
