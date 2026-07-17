export default function Loading() {
  return (
    <div className="min-h-screen bg-cream" role="status" aria-label="Loading page">
      <section className="relative min-h-[28rem] overflow-hidden bg-black px-5 pb-16 pt-32 text-cream md:min-h-[34rem] md:px-10 md:pt-40">
        <div className="mx-auto max-w-[1440px] animate-pulse">
          <div className="h-2 w-36 rounded-full bg-gold/45" />
          <div className="mt-8 h-14 w-[min(82vw,34rem)] rounded-2xl bg-cream/12 md:h-20" />
          <div className="mt-4 h-14 w-[min(64vw,25rem)] rounded-2xl bg-cream/8 md:h-20" />
          <div className="mt-8 h-3 w-[min(75vw,30rem)] rounded-full bg-cream/10" />
          <div className="mt-3 h-3 w-[min(52vw,21rem)] rounded-full bg-cream/10" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </section>
      <section className="mx-auto grid max-w-[1440px] gap-5 px-5 py-16 md:grid-cols-3 md:px-10 md:py-24">
        {[0, 1, 2].map((item) => (
          <div key={item} className="animate-pulse rounded-[1.25rem] border border-ink/10 bg-paper p-7">
            <div className="h-2 w-20 rounded-full bg-maroon/15" />
            <div className="mt-6 h-8 w-3/4 rounded-xl bg-ink/10" />
            <div className="mt-4 h-3 w-full rounded-full bg-ink/8" />
            <div className="mt-3 h-3 w-2/3 rounded-full bg-ink/8" />
          </div>
        ))}
      </section>
      <span className="sr-only">Loading festival page</span>
    </div>
  );
}
