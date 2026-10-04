import { Reveal } from "@/components/motion/reveal";
import { skillGroups } from "@/data/skills";

export function SkillGroups() {
  return (
    <div className="divide-y divide-border border-y border-border">
      {skillGroups.map((group, index) => (
        <Reveal key={group.id} delay={index * 0.04}>
          <article className="grid gap-4 py-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
            <div>
              <h3 className="font-display text-2xl tracking-tight">{group.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{group.summary}</p>
            </div>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 lg:pt-2" aria-label={group.title}>
              {group.skills.map((skill) => (
                <li key={skill.name} className="text-sm leading-6 text-foreground">
                  {skill.name}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
