import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { socials } from "@/data/socials";
import { foundationColumns, foundationMessage, skillGroups } from "@/data/skills";

const closing =
  "This answer uses only the portfolio record. Missing facts are left missing.";

function listProjects(items: typeof projects): string {
  return items
    .map((project) => {
      const stack =
        project.technologies.length > 0
          ? ` Technologies recorded: ${project.technologies.join(", ")}.`
          : " No stack is recorded beyond the title.";
      const links = [
        project.githubUrl ? `GitHub: ${project.githubUrl}` : null,
        project.liveUrl ? `Live: ${project.liveUrl}` : null,
      ]
        .filter(Boolean)
        .join(" ");
      return `${project.title} (${project.category}). ${project.shortDescription}${stack}${links ? ` ${links}` : ""}`;
    })
    .join("\n");
}

export function answerFromPortfolio(question: string): string {
  const q = question.toLowerCase().replace(/['’]/g, "");
  const parts: string[] = [];

  const about = /who is|about|positioning|what do you do|introduce/.test(q);
  const ai = /\bai\b|generative|llm|rag|langchain|prompt|transformer/.test(q);
  const projectTalk = /project|built|case stud|portfolio work|what have/.test(q);
  const tech = /technolog|stack|skill|language|framework|tooling|database|tools/.test(q);
  const fullStack = /full stack|frontend|back end|backend|mern|foundation/.test(q);
  const certs = /certif|ibm|course/.test(q);
  const exp = /experience|intern|hashedbit|employ|jscms|work history/.test(q);
  const edu = /educat|mca|bca|university|degree|mit world|pune|indore|holkar|college|school|bachelor/.test(q);
  const contact = /contact|email|linkedin|github|resume|reach|hire me/.test(q);
  const roles = /hiring|recruit|internship|full-time|full time|opportunit|aimed|target role|roles/.test(q);

  if (about) {
    parts.push(
      `${profile.name} is an ${profile.role}. ${profile.headline} ${profile.summary}`,
    );
  }

  if (projectTalk && ai) {
    const aiProjects = projects.filter((project) => project.category === "AI");
    parts.push(`AI projects on record:\n${listProjects(aiProjects)}`);
  } else if (projectTalk) {
    parts.push(`Projects on record:\n${listProjects(projects)}`);
  } else if (ai) {
    const aiCert = certifications.find((item) => item.prominent);
    const aiProjects = projects.filter((project) => project.category === "AI");
    parts.push(
      [
        "AI engineering here is separated by evidence.",
        aiCert
          ? `Certified study: ${aiCert.title}, ${aiCert.courseCount} courses, completed ${aiCert.completedLabel}. Areas: ${aiCert.areas.join(", ")}.`
          : null,
        `Named AI projects: ${aiProjects.map((project) => project.title).join("; ")}.`,
        "Employment does not include an AI production role. The only role on record is the HashedBit Innovations internship, which was full stack CMS work.",
      ]
        .filter(Boolean)
        .join(" "),
    );
  }

  if (certs) {
    parts.push(
      certifications
        .map((item) => {
          const meta = [
            item.courseCount ? `${item.courseCount} courses` : null,
            item.completedLabel ? `completed ${item.completedLabel}` : null,
          ]
            .filter(Boolean)
            .join(", ");
          const areas = item.areas.length > 0 ? ` Areas: ${item.areas.join(", ")}.` : "";
          const credential = item.credentialUrl ? ` Credential: ${item.credentialUrl}.` : "";
          return `${item.title} (${item.issuer})${meta ? ` — ${meta}.` : "."}${areas}${credential}`;
        })
        .join("\n"),
    );
  }

  if (fullStack || tech) {
    const groups = skillGroups
      .map(
        (group) =>
          `${group.title}: ${group.skills.map((skill) => skill.name).join(", ")}. ${group.summary}`,
      )
      .join("\n");
    const columns = foundationColumns
      .map((column) => `${column.title}: ${column.items.join(", ")}`)
      .join("\n");
    parts.push(`${foundationMessage}\n${columns}\n\nGrouped skills:\n${groups}`);
  }

  if (exp) {
    parts.push(
      experience
        .map(
          (item) =>
            `${item.organization} — ${item.role} — ${item.start} – ${item.end}. Project: ${item.project}. ${item.summary} Technologies: ${item.technologies.join(", ")}. Work: ${item.responsibilities.join("; ")}.`,
        )
        .join("\n"),
    );
  }

  if (edu) {
    parts.push(
      profile.education
        .map((item) => {
          const field = item.field ? `, ${item.field}` : "";
          return `${item.degree}${field}, ${item.institution}, ${item.location}. ${item.period}.`;
        })
        .join(" "),
    );
  }

  if (contact) {
    const lines = [
      profile.email ? `Email: ${profile.email}` : null,
      ...socials.map((item) =>
        item.href ? `${item.label}: ${item.href}` : `${item.label}: ${item.placeholder}`,
      ),
    ].filter(Boolean);
    parts.push(
      `Contact channels on record:\n${lines.join("\n")}\nThe site also has a contact form. Delivery depends on server email configuration.`,
    );
  }

  if (roles) {
    parts.push(
      `This portfolio is aimed at ${profile.audience.join(", ")}. ${profile.availability}`,
    );
  }

  if (parts.length === 0) {
    return [
      "That question is not covered by the portfolio record, so I will not guess.",
      "I can answer from what is recorded: AI projects, technologies, the full stack background, certifications, the HashedBit internship, education, and how to get in touch.",
      closing,
    ].join(" ");
  }

  return `${parts.join("\n\n")}\n\n${closing}`;
}
