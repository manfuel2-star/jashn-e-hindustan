type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: "left" | "center";
};

export default function SectionHeading({ eyebrow, title, subtitle, light = false, align = "left" }: Props) {
  return (
    <div className={`section-heading ${align === "center" ? "text-center mx-auto" : ""} ${light ? "text-cream" : "text-ink"}`}>
      <div className="eyebrow"><span />{eyebrow}<span /></div>
      <h2>{title}</h2>
      {subtitle && <p className={light ? "text-cream/65" : "text-ink/60"}>{subtitle}</p>}
    </div>
  );
}
