"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, CalendarDays, MapPin, X } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import EventCard from "@/components/EventCard";
import SectionHeading from "@/components/SectionHeading";
import { BLUR_DATA_URL, grandStageEvents, programs } from "@/data/site";

const experiences = [
  { eyebrow: "Hands & heritage", title: "Karigar Bazaar", copy: "Meet over forty master craftspeople and small studios. Watch a loom come alive, learn the quiet geometry of wood carving, and take home objects whose stories begin long before the festival.", image: "/images/weaving.jpg", note: "40+ craft traditions" },
  { eyebrow: "A table without borders", title: "Rasoi-e-Hind", copy: "A generous journey through regional kitchens—coastal grills, winter breads, slow-cooked curries, street-side favourites and stories served by the people who keep them alive.", image: "/images/street-food.jpg", note: "18 regional kitchens" },
  { eyebrow: "Light, sound & memory", title: "Garden of Stories", copy: "As dusk settles, the garden becomes an open archive of projected letters, whispered poetry, field recordings and a constellation of handmade light.", image: "/images/textile.jpg", note: "Every evening at sunset" },
];

const gallery = ["/images/holi.jpg", "/images/diya.jpg", "/images/folk-dance.jpg", "/images/kites.jpg", "/images/musician.jpg", "/images/colour.jpg", "/images/fireworks.jpg", "/images/classical-dance.jpg"];

type HeroSlide = {
  image: string;
  mobileImage: string;
  alt: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  position: string;
};

const centeredHeroSlides: HeroSlide[] = [
  {
    image: "/images/hero-centered-gateway.jpg",
    mobileImage: "/images/hero-centered-gateway-mobile.jpg",
    alt: "An illuminated heritage gateway welcoming guests to an evening festival",
    eyebrow: "12–14 February 2027 · New Delhi",
    title: "Jashn-e-",
    accent: "Hindustan",
    description: "Three winter evenings of language, music, food and craft—India’s living heritage, gathered beneath one sky.",
    position: "center center",
  },
  {
    image: "/images/hero-centered-mehfil.jpg",
    mobileImage: "/images/hero-centered-mehfil-mobile.jpg",
    alt: "A qawwali ensemble performing in a lantern-lit heritage courtyard",
    eyebrow: "Music · Poetry · Shared Listening",
    title: "Every voice.",
    accent: "One mehfil.",
    description: "From intimate verse to expansive song, encounter traditions that have travelled across regions and generations.",
    position: "center center",
  },
  {
    image: "/images/hero-centered-craft.jpg",
    mobileImage: "/images/hero-centered-craft-mobile.jpg",
    alt: "Visitors walking through a lantern-lit heritage craft courtyard",
    eyebrow: "Craft · Flavour · Living Memory",
    title: "Made by hand.",
    accent: "Carried by heart.",
    description: "Meet the makers, kitchens and storytellers shaping a contemporary celebration rooted in many Indias.",
    position: "center center",
  },
];

const classicHeroSlides: HeroSlide[] = [
  {
    image: "/images/hero-festival-v2-hq.jpg",
    mobileImage: "/images/hero-dance-mobile-hq.jpg",
    alt: "An Indian classical dancer performing in a heritage garden at night",
    eyebrow: "A festival of many Indias",
    title: "Jashn-e-",
    accent: "Hindustan",
    description: "",
    position: "68% center",
  },
  {
    image: "/images/hero-music-hq.jpg",
    mobileImage: "/images/hero-music-mobile-hq.jpg",
    alt: "Indian classical musicians performing on an intimate open-air stage",
    eyebrow: "Music across traditions",
    title: "One sky.",
    accent: "Many songs.",
    description: "",
    position: "72% center",
  },
  {
    image: "/images/hero-craft-hq.jpg",
    mobileImage: "/images/hero-craft-mobile-hq.jpg",
    alt: "A master textile artisan weaving at a handloom in a heritage pavilion",
    eyebrow: "Craft, food & living heritage",
    title: "India,",
    accent: "made by hand.",
    description: "",
    position: "73% center",
  },
] as const;

// Change this one value to "classic" to restore the previous hero instantly.
const HERO_VARIANT = "centered" as "centered" | "classic";
const heroSlides = HERO_VARIANT === "centered" ? centeredHeroSlides : classicHeroSlides;
const HERO_DURATION = 8000;

function HeroPicture({
  slide,
  alt,
  priority,
}: {
  slide: HeroSlide;
  alt: string;
  priority: boolean;
}) {
  const shared = {
    alt,
    fill: true as const,
    sizes: "100vw",
    quality: 95,
    priority,
    loading: priority ? undefined : ("lazy" as const),
  };
  const { props: mobileProps } = getImageProps({ ...shared, src: slide.mobileImage });
  const { props: desktopProps } = getImageProps({ ...shared, src: slide.image });

  return (
    <picture>
      <source media="(max-width: 639px)" srcSet={mobileProps.srcSet} sizes={mobileProps.sizes} />
      <img
        {...desktopProps}
        alt={alt}
        className={HERO_VARIANT === "centered" ? "object-cover object-center" : "object-cover [object-position:center_top] sm:[object-position:var(--hero-position)]"}
        style={{ ...desktopProps.style, "--hero-position": slide.position } as CSSProperties}
      />
    </picture>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const touchStartX = useRef(0);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const reduceMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [heroMediaReady, setHeroMediaReady] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    const timer = window.setTimeout(() => setHeroMediaReady(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (heroPaused || reduceMotion) return;
    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, HERO_DURATION);
    return () => window.clearTimeout(timer);
  }, [activeSlide, heroPaused, reduceMotion]);

  const changeSlide = (direction: number) => {
    setActiveSlide((current) => (current + direction + heroSlides.length) % heroSlides.length);
  };

  return (
    <>
      <section
        ref={heroRef}
        className={`noise relative overflow-hidden bg-black text-cream ${HERO_VARIANT === "centered" ? "h-[100svh] min-h-[36rem] max-h-[58rem]" : "min-h-[100dvh]"}`}
        onMouseEnter={HERO_VARIANT === "classic" ? () => setHeroPaused(true) : undefined}
        onMouseLeave={HERO_VARIANT === "classic" ? () => setHeroPaused(false) : undefined}
        onFocusCapture={HERO_VARIANT === "classic" ? () => setHeroPaused(true) : undefined}
        onBlurCapture={HERO_VARIANT === "classic" ? () => setHeroPaused(false) : undefined}
        onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? 0; }}
        onTouchEnd={(event) => {
          const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
          if (Math.abs(distance) > 48) changeSlide(distance < 0 ? 1 : -1);
        }}
      >
        <motion.div style={{ y: imageY }} className="absolute -inset-y-10 inset-x-0 md:-top-16">
          {heroSlides.map((item, index) => (index === 0 || heroMediaReady) && (
            <motion.div
              key={item.image}
              initial={false}
              animate={{ opacity: index === activeSlide ? 1 : 0, scale: index === activeSlide ? 1 : 1.035 }}
              transition={{ duration: reduceMotion ? 0 : HERO_VARIANT === "centered" ? 0.9 : 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 will-change-transform"
              aria-hidden={index !== activeSlide}
            >
              <HeroPicture
                slide={item}
                alt={index === activeSlide ? item.alt : ""}
                priority={index === 0}
              />
            </motion.div>
          ))}
        </motion.div>
        {HERO_VARIANT === "centered" ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(7,5,4,.08)_0%,rgba(7,5,4,.16)_38%,rgba(7,5,4,.5)_100%),linear-gradient(180deg,rgba(10,7,6,.66)_0%,rgba(10,7,6,.18)_32%,rgba(10,7,6,.3)_63%,rgba(10,7,6,.92)_100%)]" />
            <div className="pointer-events-none absolute inset-x-5 bottom-4 top-20 rounded-[1.5rem] border border-gold/10 sm:inset-x-8 sm:bottom-6 sm:top-24" />
            <motion.div style={{ y: contentY, opacity: contentOpacity }} className="section-shell relative flex h-full min-h-0 flex-col items-center justify-center pb-16 pt-28 text-center sm:pb-20 sm:pt-32">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(5px)" }}
                  transition={{ duration: reduceMotion ? 0 : .72, ease: [0.22, 1, 0.36, 1] }}
                  className="flex w-full flex-col items-center"
                >
                  <p className="mb-4 flex items-center justify-center gap-3 text-[0.56rem] font-bold uppercase tracking-[0.19em] text-gold sm:mb-5 sm:text-[0.64rem] sm:tracking-[0.28em]"><span className="h-px w-7 bg-gold/75 sm:w-10" />{slide.eyebrow}<span className="h-px w-7 bg-gold/75 sm:w-10" /></p>
                  <h1 className="max-w-[84rem] font-serif text-[clamp(2.8rem,9vw,8.5rem)] leading-[0.82] tracking-[-0.05em] drop-shadow-[0_5px_30px_rgba(0,0,0,.5)]">
                    <span className="block">{slide.title}</span><em className="mt-1 block font-normal text-gold sm:mt-2">{slide.accent}</em>
                  </h1>
                  <p className="mt-5 max-w-[40rem] text-[0.86rem] leading-6 text-cream/76 drop-shadow-[0_2px_14px_rgba(0,0,0,.75)] sm:mt-6 sm:text-base sm:leading-7">{slide.description}</p>
                </motion.div>
              </AnimatePresence>
              <p className="sr-only" aria-live="polite">Slide {activeSlide + 1} of {heroSlides.length}: {slide.title} {slide.accent}</p>
              <div className="mt-5 grid w-full max-w-[29rem] grid-cols-2 gap-2.5 sm:mt-7 sm:flex sm:justify-center sm:gap-3">
                <Link href="/schedule" className="button button-gold px-3 sm:px-6">Explore schedule <ArrowRight size={15} /></Link>
                <Link href="/visitors-guide" className="button button-outline px-3 sm:px-6">Plan your visit</Link>
              </div>
              <div className="mt-3.5 flex items-center justify-center gap-1.5 sm:mt-5 sm:gap-2" aria-label="Hero slide controls">
                <button type="button" onClick={() => changeSlide(-1)} className="grid size-9 shrink-0 place-items-center rounded-full border border-white/20 text-cream transition-colors hover:border-gold hover:text-gold sm:size-10" aria-label="Previous hero slide"><ArrowLeft size={14} /></button>
                <div className="mx-1 flex items-center gap-1 sm:mx-2 sm:gap-2">
                  {heroSlides.map((item, index) => (
                    <button key={item.image} type="button" onClick={() => setActiveSlide(index)} className="flex h-10 items-center px-1" aria-label={`Show hero slide ${index + 1}`} aria-current={index === activeSlide ? "true" : undefined}>
                      <span className="relative block h-px w-7 overflow-hidden bg-white/25 sm:w-12">
                        {index === activeSlide && <motion.span key={`${activeSlide}-${heroPaused}`} initial={{ scaleX: reduceMotion || heroPaused ? 1 : 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduceMotion || heroPaused ? 0 : HERO_DURATION / 1000, ease: "linear" }} className="absolute inset-0 origin-left bg-gold" />}
                      </span>
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => changeSlide(1)} className="grid size-9 shrink-0 place-items-center rounded-full border border-white/20 text-cream transition-colors hover:border-gold hover:text-gold sm:size-10" aria-label="Next hero slide"><ArrowRight size={14} /></button>
                <span className="ml-1 hidden text-[0.58rem] tabular-nums tracking-[0.18em] text-cream/55 sm:block">0{activeSlide + 1} / 0{heroSlides.length}</span>
              </div>
            </motion.div>
            <a href="#grand-stage" aria-label="Scroll to the Grand Stage" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[0.52rem] uppercase tracking-[0.22em] text-cream/55 md:flex"><span className="flex h-10 w-6 justify-center rounded-full border border-white/25 pt-2"><motion.span animate={reduceMotion ? undefined : { y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="size-1 rounded-full bg-gold" /></span>Discover</a>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,9,8,.46)_0%,rgba(13,9,8,.06)_30%,rgba(13,9,8,.14)_48%,rgba(13,9,8,.96)_82%),linear-gradient(90deg,rgba(13,9,8,.52)_0%,transparent_84%)] sm:bg-[linear-gradient(90deg,rgba(13,9,8,.94)_0%,rgba(13,9,8,.58)_45%,rgba(13,9,8,.12)_78%),linear-gradient(0deg,rgba(13,9,8,.82)_0%,transparent_55%)]" />
            <div className="absolute left-[8%] top-[20%] hidden h-[36rem] w-[36rem] rounded-full border border-gold/20 md:block" />
            <div className="absolute left-[12%] top-[26%] hidden h-[28rem] w-[28rem] rounded-full border border-gold/10 md:block" />
            <motion.div style={{ y: contentY, opacity: contentOpacity }} className="section-shell relative flex min-h-[100dvh] flex-col justify-end pb-9 pt-32 md:justify-center md:pb-10 md:pt-36">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={activeSlide} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: reduceMotion ? 0 : .55, ease: [0.22, 1, 0.36, 1] }}>
                  <p className="mb-4 flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.23em] text-gold sm:mb-5 sm:text-[0.66rem] sm:tracking-[0.26em]"><span className="h-px w-8 bg-gold sm:w-9" />{slide.eyebrow}</p>
                  <h1 className="max-w-6xl font-serif text-[clamp(3.2rem,16vw,4.75rem)] leading-[0.8] tracking-[-0.055em] sm:text-[clamp(4.25rem,11vw,10.5rem)] sm:leading-[0.76]">{slide.title}<br /><em className="font-normal text-gold">{slide.accent}</em></h1>
                </motion.div>
              </AnimatePresence>
              <p className="sr-only" aria-live="polite">Slide {activeSlide + 1} of {heroSlides.length}: {slide.title} {slide.accent}</p>
              <div className="mt-7 flex flex-col gap-6 sm:mt-8 md:flex-row md:items-center md:gap-12">
                <div className="flex gap-8 border-l border-gold/50 pl-5 text-sm leading-6 text-cream/75"><span><strong className="block text-cream">12–14 February</strong>2027</span><span><strong className="block text-cream">Sunder Nursery</strong>New Delhi</span></div>
                <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3"><Link href="/schedule" className="button button-gold px-3 sm:px-[1.35rem]">Explore schedule <ArrowRight size={15} /></Link><Link href="/visitors-guide" className="button button-outline px-3 sm:px-[1.35rem]">Plan your visit</Link></div>
              </div>
              <div className="mt-6 flex items-center gap-2 sm:mt-8" aria-label="Hero slide controls">
                <button type="button" onClick={() => changeSlide(-1)} className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 text-cream transition-colors hover:border-gold hover:text-gold" aria-label="Previous hero slide"><ArrowLeft size={16} /></button>
                <button type="button" onClick={() => changeSlide(1)} className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 text-cream transition-colors hover:border-gold hover:text-gold" aria-label="Next hero slide"><ArrowRight size={16} /></button>
                <div className="ml-2 flex items-center gap-2 sm:ml-3">{heroSlides.map((item, index) => <button key={item.image} type="button" onClick={() => setActiveSlide(index)} className="flex h-11 items-center px-1" aria-label={`Show hero slide ${index + 1}`} aria-current={index === activeSlide ? "true" : undefined}><span className="relative block h-px w-7 overflow-hidden bg-white/25 sm:w-10">{index === activeSlide && <motion.span key={`${activeSlide}-${heroPaused}`} initial={{ scaleX: reduceMotion || heroPaused ? 1 : 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduceMotion || heroPaused ? 0 : HERO_DURATION / 1000, ease: "linear" }} className="absolute inset-0 origin-left bg-gold" />}</span></button>)}</div>
                <span className="ml-1 text-[0.6rem] tabular-nums tracking-[0.2em] text-cream/55">0{activeSlide + 1} / 0{heroSlides.length}</span>
              </div>
            </motion.div>
            <a href="#grand-stage" aria-label="Scroll to the Grand Stage" className="absolute bottom-8 right-6 hidden items-center gap-3 text-[0.62rem] uppercase tracking-[0.22em] text-cream/60 md:flex md:right-10"><span className="grid size-11 place-items-center rounded-full border border-white/20"><ArrowDown size={15} /></span>Discover</a>
          </>
        )}
      </section>

      <div className="overflow-hidden border-y border-black/10 bg-gold py-4 text-black">
        <div className="marquee-track flex gap-10 whitespace-nowrap text-xs font-bold uppercase tracking-[0.25em]">
          {[0, 1].map((set) => <div key={set} className="flex gap-10"><span>Language</span><span>◆</span><span>Music</span><span>◆</span><span>Craft</span><span>◆</span><span>Food</span><span>◆</span><span>Dance</span><span>◆</span><span>Ideas</span><span>◆</span><span>Many Indias, one celebration</span><span>◆</span></div>)}
        </div>
      </div>

      <section id="grand-stage" className="bg-cream py-24 md:py-36">
        <div className="section-shell">
          <AnimatedSection><SectionHeading eyebrow="Surya Manch" title="The Grand Stage" subtitle="Three unrepeatable evenings where India’s classical, folk and contemporary worlds meet beneath the open sky." /></AnimatedSection>
          <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3">{grandStageEvents.map((event, index) => <EventCard key={event.title} {...event} index={index} />)}</div>
        </div>
      </section>

      <section className="noise relative overflow-hidden bg-maroon-dark py-24 text-cream md:py-36">
        <div className="section-shell relative">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <AnimatedSection><SectionHeading light eyebrow="Across the gardens" title="Other Stages" subtitle="Smaller rooms for closer listening—poetry, ideas, demonstrations, music circles and workshops that invite you in." /></AnimatedSection>
            <AnimatedSection delay={0.15}><Link href="/programs-and-sessions" className="button button-outline">View all programs <ArrowRight size={15} /></Link></AnimatedSection>
          </div>
          <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-12 md:grid-rows-2">
            {programs.slice(0, 4).map((program, index) => (
              <motion.article key={program.title} initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * .09 }} className={`group relative min-h-[22rem] overflow-hidden rounded-[1.25rem] ${index === 0 ? "md:col-span-7 md:row-span-2 md:min-h-[44rem]" : "md:col-span-5"}`}>
                <Image src={program.image} alt="" fill sizes="(max-width: 768px) 100vw, 55vw" quality={90} className="object-cover transition-transform duration-700 group-hover:scale-105" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <div className="absolute bottom-0 p-6 md:p-8"><p className="mb-2 text-xs uppercase tracking-[0.2em] text-gold">{program.category}</p><h3 className="font-serif text-3xl md:text-4xl">{program.title}</h3></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-36">
        <div className="section-shell">
          <AnimatedSection><SectionHeading eyebrow="Curated experiences" title="Beyond the Stage" subtitle="A festival is also what happens between sessions—the meal shared, the maker met, the garden rediscovered after dark." /></AnimatedSection>
          <div className="mt-20 space-y-20 md:space-y-32">
            {experiences.map((item, index) => (
              <AnimatedSection key={item.title} className={`grid items-center gap-10 md:grid-cols-2 md:gap-20 ${index % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem] shadow-card"><Image src={item.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" quality={90} className="object-cover" placeholder="blur" blurDataURL={BLUR_DATA_URL} /><div className="absolute bottom-5 left-5 rounded-full bg-black/70 px-4 py-2 text-[0.64rem] uppercase tracking-[0.18em] text-cream backdrop-blur">{item.note}</div></div>
                <div><p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-maroon">{item.eyebrow}</p><h3 className="font-serif text-5xl leading-[.92] md:text-7xl">{item.title}</h3><p className="mt-6 max-w-xl text-base leading-8 text-ink/65 md:text-lg">{item.copy}</p><Link href="/programs-and-sessions" className="mt-8 inline-flex items-center gap-2 border-b border-maroon/30 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-maroon">Discover the experience <ArrowRight size={15} /></Link></div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black py-24 text-cream md:py-36">
        <div className="section-shell grid items-center gap-14 md:grid-cols-[.78fr_1.22fr] md:gap-24">
          <AnimatedSection><p className="mb-5 text-xs uppercase tracking-[0.24em] text-gold">Festival venue</p><h2 className="font-serif text-6xl leading-[.9] md:text-8xl">A garden<br /><em className="text-gold">full of stories.</em></h2><p className="mt-7 max-w-md leading-8 text-cream/60">Heritage, ecology and culture meet across 90 acres at Sunder Nursery—minutes from central Delhi, yet made for lingering.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/visitors-guide" className="button button-gold"><MapPin size={15} />Visitor’s guide</Link><a href="https://maps.google.com/?q=Sunder+Nursery+New+Delhi" className="button button-outline">Open maps</a></div></AnimatedSection>
          <AnimatedSection delay={0.1} className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] border border-white/10">
            <Image src="/images/venue.jpg" alt="Heritage architecture in a landscaped garden" fill sizes="(max-width: 768px) 100vw, 60vw" quality={90} className="object-cover opacity-70" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
            <div className="absolute inset-0 bg-maroon/25 mix-blend-multiply" />
            {[{ x: "28%", y: "32%", label: "Surya Manch" }, { x: "67%", y: "25%", label: "Rasoi-e-Hind" }, { x: "58%", y: "68%", label: "Karigar Adda" }].map((pin) => <div key={pin.label} className="absolute" style={{ left: pin.x, top: pin.y }}><span className="relative flex size-4"><span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-70" /><span className="relative inline-flex size-4 rounded-full border-2 border-black bg-gold" /></span><span className="mt-2 block whitespace-nowrap rounded-full bg-black/80 px-3 py-1.5 text-[.58rem] uppercase tracking-[.15em] text-cream backdrop-blur">{pin.label}</span></div>)}
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-36">
        <div className="section-shell">
          <AnimatedSection><SectionHeading eyebrow="A living archive" title="Seen at Jashn" subtitle="Fragments of colour, performance, shared attention and the small moments that make a festival stay with you." /></AnimatedSection>
          <div className="mt-14 columns-2 gap-3 md:mt-20 md:columns-4 md:gap-5">
            {gallery.map((src, index) => <motion.button key={src} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 4) * .06 }} onClick={() => setLightbox(src)} className="group relative mb-3 block w-full overflow-hidden rounded-xl md:mb-5" aria-label="Open gallery image"><Image src={src} alt="Festival moment" width={900} height={index % 3 === 0 ? 1100 : 700} quality={90} className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105" placeholder="blur" blurDataURL={BLUR_DATA_URL} /><span className="absolute inset-0 bg-maroon/0 transition group-hover:bg-maroon/15" /></motion.button>)}
          </div>
        </div>
      </section>

      <AnimatePresence>{lightbox && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)} className="fixed inset-0 z-[70] grid place-items-center bg-black/95 p-5"><button onClick={() => setLightbox(null)} className="absolute right-5 top-5 z-10 grid size-12 place-items-center rounded-full border border-white/20 text-cream" aria-label="Close image"><X /></button><motion.div initial={{ scale: .96 }} animate={{ scale: 1 }} className="relative h-[82vh] w-full max-w-6xl"><Image src={lightbox} alt="Festival gallery view" fill quality={95} className="object-contain" sizes="100vw" /></motion.div></motion.div>}</AnimatePresence>

      <section className="relative overflow-hidden bg-maroon px-5 py-24 text-cream md:px-10 md:py-32">
        <div className="absolute -right-20 -top-40 size-[34rem] rounded-full border border-gold/20" /><div className="absolute -right-8 -top-28 size-[26rem] rounded-full border border-gold/15" />
        <div className="relative mx-auto flex max-w-[1440px] flex-col gap-10 md:flex-row md:items-end md:justify-between"><div><p className="mb-5 text-xs uppercase tracking-[.24em] text-gold">12–14 February 2027</p><h2 className="max-w-4xl font-serif text-6xl leading-[.86] md:text-9xl">Three days.<br />A thousand <em className="text-gold">stories.</em></h2></div><div className="flex flex-wrap gap-3"><Link href="/schedule" className="button button-gold"><CalendarDays size={15} />See schedule</Link><Link href="/visitors-guide" className="button button-outline">Plan your visit</Link></div></div>
      </section>
    </>
  );
}
