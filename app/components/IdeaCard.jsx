"use client";

import { useEffect, useRef, useState } from "react";
import useProjectProgress from "../hooks/useProjectProgress";
import useFavorites from "../hooks/useFavorites";
import { skillDescriptions } from "../data/skillDescriptions";
import { messages } from "../data/messages";

export default function IdeaCard({
  id,
  title,
  description,
  difficulty,
  onProjectComplete,
  category,
  coreSkills = [],
  stretchSkills = [],
  steps,
  recommended = [],
  why = "",
  onSkillClick,
  lang = "en",
  featured = false,
}) {
  const t = messages[lang] || messages.en;

  const reportedCompleteRef = useRef(false);
  const confettiTimer = useRef(null);

  const shownTitle = typeof title === "object" ? title?.[lang] : title;
  const shownDesc = typeof description === "object" ? description?.[lang] : description;
  const shownSteps = Array.isArray(steps) ? steps : steps?.[lang] || [];

  const { checked, toggle, progress } = useProjectProgress(id, shownSteps.length);
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.includes(id);

  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

  const burstConfetti = () => {
    setShowConfetti(true);
    if (confettiTimer.current) clearTimeout(confettiTimer.current);
    confettiTimer.current = setTimeout(() => setShowConfetti(false), 1500);
  };

  useEffect(() => {
    if (progress === 100) {
      burstConfetti();

      if (!reportedCompleteRef.current) {
        reportedCompleteRef.current = true;
        const safeTitle = shownTitle || title?.en || title || `Project ${id}`;
        onProjectComplete?.({ id, title: safeTitle });
      }
    }
  }, [progress]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (progress < 100) reportedCompleteRef.current = false;
  }, [progress]);

  useEffect(() => {
    return () => {
      if (confettiTimer.current) clearTimeout(confettiTimer.current);
    };
  }, []);

  const toggleTooltip = (key) => {
    setActiveTooltip(activeTooltip === key ? null : key);
  };

  return (
    <div
      className={`relative p-4 sm:p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow flex flex-col gap-4 overflow-visible ${
        featured ? "breathing-card ring-2 ring-blue-300/60" : ""
      }`}
    >
      {showConfetti && (
        <div className="confetti">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ["#3b82f6", "#22c55e", "#eab308", "#ec4899"][i % 4],
              }}
            />
          ))}
        </div>
      )}

      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold break-words">{shownTitle}</h3>
          <p className="text-sm mt-1 opacity-80 break-words">{shownDesc}</p>

          {why && (
            <p className="text-xs mt-2 opacity-70">
              <span className="font-semibold">{t.whyThisIdea ?? "Why this idea?"}</span>{" "}
              {why}
            </p>
          )}
        </div>

        <button
          onClick={() => toggleFavorite(id)}
          className={`text-2xl leading-none transition ${
            isFav ? "text-yellow-500" : "opacity-40 hover:opacity-70"
          }`}
          aria-label="favorite"
        >
          ★
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">{difficulty}</span>
        <span className="px-2 py-1 rounded bg-purple-100 text-purple-700">{category}</span>

        <div className="flex-1" />

        <button
          onClick={burstConfetti}
          className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition active:scale-95"
          title="Start this project"
        >
          {t.start ?? "Start"}
        </button>
      </div>

      <div>
        <p className="text-sm font-medium">{t.coreSkills}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {coreSkills.map((s) => (
            <div key={s} className="relative group">
              <button
                onClick={() => toggleTooltip(`core-${s}`)}
                className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200 transition"
              >
                {s}
              </button>

              {activeTooltip === `core-${s}` && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded px-3 py-2 max-w-[min(20rem,85vw)] z-50 shadow-lg">
                  {skillDescriptions[s]?.[lang] || t.noDescription}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                </div>
              )}

              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-3 py-2 max-w-[min(20rem,85vw)] z-50 shadow-lg pointer-events-none">
                {skillDescriptions[s]?.[lang] || t.noDescription}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium">{t.stretchSkills}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {stretchSkills.map((s) => (
            <div key={s} className="relative group">
              <button
                onClick={() => toggleTooltip(`stretch-${s}`)}
                className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded hover:bg-orange-200 transition"
              >
                {s}
              </button>

              {activeTooltip === `stretch-${s}` && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded px-3 py-2 max-w-[min(20rem,85vw)] z-50 shadow-lg">
                  {skillDescriptions[s]?.[lang] || t.noDescription}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                </div>
              )}

              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-3 py-2 max-w-[min(20rem,85vw)] z-50 shadow-lg pointer-events-none">
                {skillDescriptions[s]?.[lang] || t.noDescription}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {recommended?.length > 0 && (
        <div className="pt-2 border-t border-[var(--border)]">
          <p className="text-xs font-semibold opacity-70 mb-2">
            {t.recommendSkillsCard ?? "Recommended skills"}
          </p>
          <div className="flex flex-wrap gap-2">
            {recommended.map((skill) => (
              <button
                key={skill}
                onClick={() => onSkillClick?.(skill)}
                className="px-2 py-1 rounded-full text-xs border border-[var(--border)] bg-[var(--card)] hover:bg-blue-50 hover:text-blue-700 transition"
                title="Add this skill"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>{t.progress}</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full h-3 rounded-full overflow-hidden bg-black/10">
          <div
            className={`h-full transition-all duration-500 ${
              progress === 100 ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {progress === 100 && (
          <p className="text-green-500 font-semibold text-center mt-2 animate-bounce">
            {t.projectComplete}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium mt-2">{t.steps}</p>
        <ul className="flex flex-col gap-2">
          {shownSteps.map((step, i) => (
            <label key={i} className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={checked.includes(i)}
                onChange={() => toggle(i)}
                className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 accent-blue-600"
              />
              <span className="text-sm opacity-90 break-words">{step}</span>
            </label>
          ))}
        </ul>
      </div>
    </div>
  );
}
