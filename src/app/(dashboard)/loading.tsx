export default function DashboardLoading() {
  return (
    <div className="grid grid-cols-12 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="col-span-4 h-32 animate-pulse rounded-card bg-gray-soft"
        />
      ))}
    </div>
  );
}
