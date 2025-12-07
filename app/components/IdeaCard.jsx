"use client";

import { useEffect, useState } from "react";
import useProjectProgress from "../hooks/useProjectProgress";
import useFavorites from "../hooks/useFavorites";
import { skillDescriptions } from "../data/skillDescriptions";

export default function IdeaCard({
  title,
  description,
  difficulty,
  category,
  coreSkills,
  stretchSkills,
  steps,
}) {
  const { checked, toggle, progress } = useProjectProgress(title, steps.length);
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.includes(title);

  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    if (progress === 100) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }
  }, [progress]);

  const toggleTooltip = (skill) => {
    setActiveTooltip(activeTooltip === skill ? null : skill);
  };

  return (
    <div className="relative p-4 rounded-xl bg-white shadow border flex flex-col gap-4 overflow-visible">
      {/* Confetti */}
      {showConfetti && (
        <div className="confetti">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ["#3b82f6", "#22c55e", "#eab308", "#ec4899"][
                  i % 4
                ],
              }}
            />
          ))}
        </div>
      )}

      {/* Favorite button */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>

        <button
          onClick={() => toggleFavorite(title)}
          className={`text-2xl leading-none transition ${
            isFav ? "text-yellow-500" : "text-gray-300"
          }`}
          aria-label="favorite"
        >
          ★
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">
          {difficulty}
        </span>
        <span className="px-2 py-1 rounded bg-purple-100 text-purple-700">
          {category}
        </span>
      </div>

      {/* Core Skills */}
      <div>
        <p className="text-sm font-medium">Core Skills:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {coreSkills.map((s, i) => (
            <div key={i} className="relative group">
              <button
                onClick={() => toggleTooltip(`core-${s}`)}
                className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded cursor-pointer hover:bg-green-200 transition"
              >
                {s}
              </button>

              {/* Tooltip - shows on hover OR click */}
              {(activeTooltip === `core-${s}`) && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded px-3 py-2 w-56 z-50 shadow-lg">
                  {skillDescriptions[s] || "No description available yet."}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
              
              {/* Hover tooltip for desktop */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-3 py-2 w-56 z-50 shadow-lg pointer-events-none">
                {skillDescriptions[s] || "No description available yet."}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stretch Skills */}
      <div>
        <p className="text-sm font-medium">Stretch Skills:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {stretchSkills.map((s, i) => (
            <div key={i} className="relative group">
              <button
                onClick={() => toggleTooltip(`stretch-${s}`)}
                className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded cursor-pointer hover:bg-orange-200 transition"
              >
                {s}
              </button>

              {/* Tooltip - shows on click */}
              {(activeTooltip === `stretch-${s}`) && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded px-3 py-2 w-56 z-50 shadow-lg">
                  {skillDescriptions[s] || "No description available yet."}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
              
              {/* Hover tooltip for desktop */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-3 py-2 w-56 z-50 shadow-lg pointer-events-none">
                {skillDescriptions[s] || "No description available yet."}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              progress === 100 ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Congrats Text */}
        {progress === 100 && (
          <p className="text-green-600 font-semibold text-center mt-2 animate-bounce">
            🎉 Project Complete! 🎉
          </p>
        )}
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium mt-2">Steps:</p>
        <ul className="flex flex-col gap-2">
          {steps.map((step, i) => (
            <label key={i} className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={checked.includes(i)}
                onChange={() => toggle(i)}
                className="w-4 h-4 mt-0.5 accent-blue-600"
              />
              <span className="text-sm text-gray-700">{step}</span>
            </label>
          ))}
        </ul>
      </div>
    </div>
  );
}