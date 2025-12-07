import IdeaCard from "./IdeaCard";

export default function IdeaList({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
      {items.map((idea, i) => (
        <IdeaCard
          key={i}
          title={idea.title}
          description={idea.description}
          difficulty={idea.difficulty}
          category={idea.category}
          coreSkills={idea.coreSkills}
          stretchSkills={idea.stretchSkills}
          steps={idea.steps}
        />
      ))}
    </div>
  );
}
