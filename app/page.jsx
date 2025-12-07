"use client";

import { useState } from "react";
import { ideas } from "./ideas";
import IdeaList from "./components/IdeaList";

const ALL_SKILLS = [
  "html",
  "css",
  "javascript",
  "react",
  "api",
  "state",
  "auth",
  "payment",
  "localstorage",
  "regex",
  "charts",
  "backend",
  "geolocation",
  "websockets",
  "seo",
  "animations",
  "export",
  "admin-panel",
];

export default function Home() {
  const [generated, setGenerated] = useState([]);
  const [difficulty, setDifficulty] = useState("all");
  const [category, setCategory] = useState("all");
  const [skillProgress, setSkillProgress] = useState({});

  const toggleSkill = (skill) => {
    setSkillProgress((prev) => ({
      ...prev,
      [skill]: !prev[skill],
    }));
  };

const generateIdeas = () => {
  let pool = ideas;

  if (difficulty !== "all") {
    pool = pool.filter((idea) => idea.difficulty === difficulty);
  }

  if (category !== "all") {
    pool = pool.filter((idea) => idea.category === category);
  }

  const knownSkills = Object.keys(skillProgress).filter(
    (skill) => skillProgress[skill]
  );

  // Soft matching instead of hard filtering
  const ranked = pool
    .map((idea) => {
      const matchCount = idea.coreSkills.filter((skill) =>
        knownSkills.includes(skill)
      ).length;

      return { ...idea, matchCount };
    })
    .sort((a, b) => b.matchCount - a.matchCount);

  setGenerated(ranked.slice(0, 6));
};

  return (
    <main className="min-h-screen px-6 py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">
          Skill-Based Project Generator 🧠🚀
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="p-3 rounded-xl border bg-white"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 rounded-xl border bg-white"
          >
            <option value="all">All Categories</option>
            <option value="frontend">Frontend</option>
            <option value="fullstack">Fullstack</option>
            <option value="logic">Logic</option>
          </select>
        </div>

        {/* Skill Progress Tracker */}
        <div className="bg-white p-6 rounded-xl border mb-8 text-left">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Your Skill Progress 🛠️
          </h2>

          <div className="flex flex-wrap gap-3 justify-center">
            {ALL_SKILLS.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-4 py-2 rounded-lg border text-sm transition ${
                  skillProgress[skill]
                    ? "bg-green-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Generate */}
        <button
          onClick={generateIdeas}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Generate Matched Ideas 🎯
        </button>

        {/* Results */}
        {generated.length > 0 && <IdeaList items={generated} />}
      </div>
    </main>
  );
}
