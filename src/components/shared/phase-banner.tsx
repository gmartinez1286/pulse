export function PhaseBanner({ phase, label }: { phase: 2 | 3; label: string }) {
  return (
    <div className="col-span-12 rounded-card border border-dashed border-accent bg-accent-soft/30 px-5 py-3 text-sm text-accent-text">
      <b>Phase {phase} preview</b> — {label}
    </div>
  );
}
