import IdeaCard from "./IdeaCard";

export default function IdeaList({
  items,
  lang,
  onSkillClick,
  featuredIdeaId,
  onProjectComplete,
}) {
  if (!items || items.length === 0) return null;

  const featured =
    featuredIdeaId != null ? items.find((i) => i.id === featuredIdeaId) : null;

  const rest = featured ? items.filter((i) => i.id !== featured.id) : items;

  return (
    <div className="mt-8">
      {featured && (
        <div className="mb-6">
          <div className="mx-auto max-w-3xl">
            <div className="text-xs font-semibold opacity-70 mb-2">
              🎲 Surprise pick
            </div>
            <IdeaCard
              key={`featured-${featured.id || featured.title}`}
              id={featured.id}
              title={featured.title}
              description={featured.description}
              difficulty={featured.difficulty}
              category={featured.category}
              coreSkills={featured.coreSkills}
              stretchSkills={featured.stretchSkills}
              steps={featured.steps}
              recommended={featured.recommended}
              why={featured.why}
              onSkillClick={onSkillClick}
              lang={lang}
              featured
              onProjectComplete={onProjectComplete}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((idea) => (
          <IdeaCard
            key={idea.id || idea.title}
            id={idea.id}
            title={idea.title}
            description={idea.description}
            difficulty={idea.difficulty}
            category={idea.category}
            coreSkills={idea.coreSkills}
            stretchSkills={idea.stretchSkills}
            steps={idea.steps}
            recommended={idea.recommended}
            why={idea.why}
            onSkillClick={onSkillClick}
            lang={lang}
            onProjectComplete={onProjectComplete}
          />
        ))}
      </div>
    </div>
  );
}
