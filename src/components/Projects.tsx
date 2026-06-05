import { useEffect, useRef } from "react";

interface Project {
  id: string;
  name: string;
  tags: string[];
  big?: boolean;
  mockupLabel: string;
}

export const projects: Project[] = [
  {
    id: "1",
    name: "Lockr",
    tags: ["React", "NestJS", "Docker", "Prisma", "MySQL", "JWT"],
    big: true,
    mockupLabel: "Application de gestion sécurisée de documents",
  },
  {
    id: "2",
    name: "Cosmiclean",
    tags: ["HTML5", "CSS3", "JavaScript", "Google Maps API"],
    mockupLabel: "Site vitrine — Client réel",
  },
  {
    id: "3",
    name: "My Bibs",
    tags: ["React Native", "TypeScript"],
    mockupLabel: "App mobile — Projet perso",
  },
];

export default function Projects() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = Array.from(
      gridRef.current?.querySelectorAll<HTMLElement>(".pcard") ?? [],
    );

    const cleanup = cards.map((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 3;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 3;
        card.style.transform = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.01)`;
      };
      const onEnter = () => {
        card.style.transition = "transform .1s ease, border-color .4s";
      };
      const onLeave = () => {
        card.style.transition =
          "transform .65s cubic-bezier(.22,1,.36,1), border-color .4s";
        card.style.transform = "";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => cleanup.forEach((fn) => fn());
  }, []);

  return (
    <section id="projects">
      <div className="wrap">
        <div className="proj-hd rv">
          <div className="proj-hd-left">
            <p className="lbl">Projets sélectionnés</p>
            <h2>Ce que j'ai construit</h2>
          </div>
          <a href="#" className="proj-see">
            Voir tout →
          </a>
        </div>

        <div className="pgrid" ref={gridRef}>
          {projects.map((p, i) => (
            <article
              key={p.id}
              className={[
                "pcard",
                p.big ? "big" : "",
                "rv",
                i > 0 ? `d${i}` : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="pmock">
                <span className="pmock-lbl">{p.mockupLabel}</span>
              </div>
              <div className="pinfo">
                <div>
                  <div className="pname">{p.name}</div>
                  <div className="ptags">
                    {p.tags.map((tag, ti) => (
                      <span key={tag}>
                        <span className="ptag">{tag}</span>
                        {ti < p.tags.length - 1 && (
                          <span className="ptag sep">&middot;</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="parrow">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
