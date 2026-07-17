import type { Metadata } from "next";
import Accordion from "@/components/Accordion";
import PageHero from "@/components/PageHero";
import { faqs } from "@/data/site";

export const metadata: Metadata = { title: "FAQs", description: "Answers to common questions about tickets, access, families, food and visiting Jashn-e-Hindustan.", openGraph: { images: ["/og-hq.jpg"] } };

export default function FaqsPage() {
  return (
    <><PageHero eyebrow="Good to know" title="Questions, answered" description="Everything you need for an easy day at the festival. If your question is not here, the festival office is happy to help." image="/images/diya.jpg" /><section className="bg-cream py-20 md:py-32"><div className="section-shell"><Accordion items={faqs} /><div className="mt-16 rounded-[1.25rem] bg-maroon p-8 text-cream md:flex md:items-center md:justify-between md:p-12"><div><p className="text-xs uppercase tracking-[.2em] text-gold">Still curious?</p><h2 className="mt-3 font-serif text-4xl">Write to the festival office.</h2></div><a href="mailto:hello@jashnehindustan.in" className="button button-gold mt-7 md:mt-0">Email us</a></div></div></section></>
  );
}
