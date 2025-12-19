"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "projectProgress";

function sanitizeChecked(arr, totalSteps) {
  const list = Array.isArray(arr) ? arr : [];
  const cleaned = Array.from(
    new Set(
      list
        .map((n) => Number(n))
        .filter((n) => Number.isInteger(n) && n >= 0 && n < totalSteps)
    )
  ).sort((a, b) => a - b);

  return cleaned;
}

export default function useProjectProgress(projectId, totalSteps) {
  const [checked, setChecked] = useState([]);
  const [allProgress, setAllProgress] = useState({});

  const safeId = useMemo(() => String(projectId ?? ""), [projectId]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      const store = saved && typeof saved === "object" ? saved : {};

      const cleaned = sanitizeChecked(store[safeId] || [], totalSteps);

      setAllProgress(store);
      setChecked(cleaned);

      // overwrite broken/out-of-range data so it stays fixed
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...store, [safeId]: cleaned })
      );
    } catch {
      setAllProgress({});
      setChecked([]);
    }
  }, [safeId, totalSteps]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  }, [allProgress]);

  const toggle = (stepIndex) => {
    if (!Number.isInteger(stepIndex)) return;
    if (stepIndex < 0 || stepIndex >= totalSteps) return;

    setChecked((prev) => {
      const nextRaw = prev.includes(stepIndex)
        ? prev.filter((i) => i !== stepIndex)
        : [...prev, stepIndex];

      const next = sanitizeChecked(nextRaw, totalSteps);

      setAllProgress((prevAll) => ({
        ...prevAll,
        [safeId]: next,
      }));

      return next;
    });
  };

  const rawProgress =
    totalSteps > 0 ? Math.round((checked.length / totalSteps) * 100) : 0;

  const progress = Math.min(100, Math.max(0, rawProgress));

  return { checked, toggle, progress };
}
