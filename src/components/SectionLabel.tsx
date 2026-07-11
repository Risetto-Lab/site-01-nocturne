export default function SectionLabel({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
      <span className="text-accent">{index}</span>
      <span className="h-px w-8 bg-muted/40" aria-hidden />
      <span>{title}</span>
    </div>
  );
}
