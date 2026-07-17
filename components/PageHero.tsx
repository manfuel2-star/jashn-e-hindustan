import Image from "next/image";
import { BLUR_DATA_URL } from "@/data/site";

type Props = { eyebrow: string; title: string; description: string; image?: string };

export default function PageHero({ eyebrow, title, description, image = "/images/textile.jpg" }: Props) {
  return (
    <section className="relative flex min-h-[62svh] items-end overflow-hidden bg-black px-5 pb-12 pt-32 text-cream sm:min-h-[68vh] md:px-10 md:pb-24 md:pt-36">
      <Image src={image} alt="" fill priority quality={90} className="object-cover opacity-45" sizes="100vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      <div className="relative mx-auto w-full max-w-[1440px]">
        <p className="mb-5 flex items-center gap-3 text-[.68rem] uppercase tracking-[0.23em] text-gold sm:mb-6 sm:text-xs sm:tracking-[0.25em]"><span className="h-px w-8 bg-gold" />{eyebrow}</p>
        <h1 className="max-w-5xl font-serif text-[clamp(3.1rem,15vw,5rem)] leading-[0.84] tracking-[-0.045em] sm:text-[clamp(3.6rem,9vw,8.5rem)] sm:leading-[0.82]">{title}</h1>
        <p className="mt-5 max-w-2xl text-[.96rem] leading-7 text-cream/70 sm:mt-7 md:text-lg">{description}</p>
      </div>
    </section>
  );
}
