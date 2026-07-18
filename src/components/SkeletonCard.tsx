export default function SkeletonCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-charcoal/10 bg-surface shadow-sm">
      <div className="h-40 w-full animate-pulse bg-paper-dim" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-3 w-1/3 animate-pulse rounded bg-paper-dim" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-paper-dim" />
        <div className="h-3 w-full animate-pulse rounded bg-paper-dim" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-paper-dim" />
        <div className="mt-3 h-9 w-full animate-pulse rounded-full bg-paper-dim" />
      </div>
    </div>
  );
}
