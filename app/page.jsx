"use client";

import { useEffect, useState } from "react";
import { ideas } from "./ideas";
import IdeaList from "./components/IdeaList";
import { messages } from "./data/messages";

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

const COMPLETED_KEY = "completedProjects_v1";
const COMPLETED_UI_KEY = "completedPanelOpen_v1";

export default function Home() {
  const [ideasList, setIdeasList] = useState([]);
  const [skillProgress, setSkillProgress] = useState({});
  const [featuredId, setFeaturedId] = useState(null);

  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const [completed, setCompleted] = useState([]);
  const [completedOpen, setCompletedOpen] = useState(true);

  const [lang, setLang] = useState("en");
  const t = messages[lang] || messages.en;

  const [theme, setTheme] = useState("light");

  const showMessage = (msg) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1200);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);

    try {
      const savedCompleted = JSON.parse(localStorage.getItem(COMPLETED_KEY) || "[]");
      if (Array.isArray(savedCompleted)) setCompleted(savedCompleted);
    } catch {}

    try {
      const open = localStorage.getItem(COMPLETED_UI_KEY);
      if (open !== null) setCompletedOpen(open === "true");
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
  }, [completed]);

  useEffect(() => {
    localStorage.setItem(COMPLETED_UI_KEY, String(completedOpen));
  }, [completedOpen]);

  const toggleSkill = (skill) => {
    setSkillProgress((prev) => ({ ...prev, [skill]: !prev[skill] }));
  };

  const buildRankedIdeas = () => {
    const selectedSkills = Object.keys(skillProgress).filter((s) => skillProgress[s]);

    return ideas
      .map((idea) => {
        const core = idea.coreSkills || [];
        const stretch = idea.stretchSkills || [];

        const matched = core.filter((s) => selectedSkills.includes(s));
        const matches = matched.length;

        const ideaSkills = [...core, ...stretch];
        const recommended = ideaSkills.filter((s) => !selectedSkills.includes(s));

        const whyParts = [];
        if (matched.length > 0) {
          whyParts.push(
            `${t.whyMatched ?? "Matches your skills"}: ${matched.slice(0, 4).join(", ")}${
              matched.length > 4 ? "…" : ""
            }`
          );
        } else {
          whyParts.push(t.whyFresh ?? "New skills (good stretch)");
        }

        if (recommended.length > 0) {
          whyParts.push(
            `${t.whyNext ?? "Try next"}: ${recommended.slice(0, 3).join(", ")}${
              recommended.length > 3 ? "…" : ""
            }`
          );
        }

        return { ...idea, matches, recommended, why: whyParts.join(" • ") };
      })
      .sort((a, b) => b.matches - a.matches)
      .slice(0, 6);
  };

  const generateIdeas = () => {
    const ranked = buildRankedIdeas();
    setIdeasList(ranked);
    setFeaturedId(null);
  };

  const surpriseMe = () => {
    let pool = ideasList;

    if (!pool.length) {
      pool = buildRankedIdeas();
      setIdeasList(pool);
    }

    const pick = pool[Math.floor(Math.random() * pool.length)];
    setFeaturedId(pick.id);
  };

  const clearAll = () => {
    setSkillProgress({});
    setIdeasList([]);
    setFeaturedId(null);
  };

  const handleProjectComplete = ({ id, title }) => {
    if (!id) return;

    setCompleted((prev) => {
      if (prev.some((p) => p.id === id)) return prev;

      showMessage(t.savedToCompleted ?? "Saved to completed");

      return [{ id, title: title || `Project ${id}` }, ...prev];
    });
  };

  const removeCompleted = (id) => {
    setCompleted((prev) => prev.filter((p) => p.id !== id));
  };

  const openCompletedIdea = (id) => {
    setFeaturedId(id);
    setCompletedOpen(false);
  };

  const completedCount = completed.length;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-5xl px-4 py-10 text-center relative">
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => setLang(lang === "en" ? "mn" : "en")}
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-sm hover:opacity-80 transition"
          >
            {t.langToggle}
          </button>

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-sm hover:opacity-80 transition"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6">{t.appTitle}</h1>

        <div className="mb-8 bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
          <h2 className="text-sm font-semibold mb-3">{t.skillsTitle}</h2>

          <div className="flex flex-wrap gap-2 justify-center">
            {ALL_SKILLS.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-2 rounded-lg border text-sm transition ${
                  skillProgress[skill]
                    ? "bg-green-600 text-white border-green-700"
                    : "border-[var(--border)] hover:opacity-80"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button
            onClick={generateIdeas}
            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            {t.generate}
          </button>

          <button
            onClick={surpriseMe}
            className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
          >
            {t.surpriseMe ?? "Surprise me"}
          </button>

          <button
            onClick={clearAll}
            className="px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-sm hover:opacity-80 transition"
          >
            {t.clear ?? "Clear"}
          </button>
        </div>

        <IdeaList
          items={ideasList}
          lang={lang}
          onSkillClick={toggleSkill}
          featuredIdeaId={featuredId}
          onProjectComplete={handleProjectComplete}
        />

        <div className="fixed bottom-4 right-4 z-50">
          {completedOpen ? (
            <div className="w-[min(22rem,92vw)] bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
                <div className="text-sm font-semibold">
                  {t.completedTitle ?? "Completed"}{" "}
                  <span className="opacity-70">({completedCount})</span>
                </div>
                <button
                  onClick={() => setCompletedOpen(false)}
                  className="text-sm opacity-70 hover:opacity-100 transition"
                  title="Minimize"
                >
                  —
                </button>
              </div>

              <div className="max-h-[50vh] overflow-auto p-3">
                {completedCount === 0 ? (
                  <div className="text-sm opacity-70 px-1 py-2">
                    {t.completedEmpty ?? "Finish a project and it will appear here."}
                  </div>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {completed.map((p) => (
                      <li
                        key={p.id}
                        className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2"
                      >
                        <button
                          onClick={() => openCompletedIdea(p.id)}
                          className="flex-1 text-left text-sm hover:opacity-80 transition"
                          title="Open"
                        >
                          {p.title}
                        </button>

                        <button
                          onClick={() => removeCompleted(p.id)}
                          className="text-xs opacity-60 hover:opacity-100 transition"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setCompletedOpen(true)}
              className="rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-lg px-4 py-2 text-sm hover:opacity-90 transition"
              title="Open completed projects"
            >
              {t.completedTitle ?? "Completed"} ({completedCount})
            </button>
          )}
        </div>

        <div
          className={`fixed left-1/2 -translate-x-1/2 bottom-6 z-[9999] transition-all duration-300 ${
            toastVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="px-4 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-lg text-sm">
            {toast}
          </div>
        </div>
      </div>
    </main>
  );
}
