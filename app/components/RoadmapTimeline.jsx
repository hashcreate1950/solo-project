export default function RoadmapTimeline({ stages, completed }) {
  return (
    <div className="flex justify-center gap-4 mb-8">
      {stages.map((s, i) => {
        const done = completed[i];
        return (
          <div
            key={s.level}
            className={`flex flex-col items-center gap-2 px-3 py-2 rounded-lg border transition ${
              done
                ? "bg-green-600 text-white border-green-700"
                : "bg-[var(--card)] border-[var(--border)] opacity-60"
            }`}
          >
            <span className="text-sm font-semibold capitalize">
              {s.level}
            </span>
            <span className="text-xs">{s.difficulty}</span>
          </div>
        );
      })}
    </div>
  );
}
