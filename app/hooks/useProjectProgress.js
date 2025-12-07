// app/hooks/useProjectProgress.js
"use client";

import { useEffect, useState } from "react";

export default function useProjectProgress(title, totalSteps) {
  const [checked, setChecked] = useState([]);
  const [allProgress, setAllProgress] = useState({});

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem("projectProgress");
    if (saved) {
      const parsed = JSON.parse(saved);
      setAllProgress(parsed);
      setChecked(parsed[title] || []);
    }
  }, [title]);

  // Save progress whenever it changes
  useEffect(() => {
    if (Object.keys(allProgress).length > 0) {
      localStorage.setItem("projectProgress", JSON.stringify(allProgress));
    }
  }, [allProgress]);

  const toggle = (stepIndex) => {
    setChecked((prev) => {
      const newChecked = prev.includes(stepIndex)
        ? prev.filter((i) => i !== stepIndex)
        : [...prev, stepIndex];

      // Update global progress
      setAllProgress((prevAll) => ({
        ...prevAll,
        [title]: newChecked,
      }));

      return newChecked;
    });
  };

  const progress = totalSteps > 0 
    ? Math.round((checked.length / totalSteps) * 100)
    : 0;

  return { checked, toggle, progress };
}