const items = [
  { name: "React", cat: "Frontend", gold: false },
  { name: "TypeScript", cat: "Langage", gold: false },
  { name: "NestJS", cat: "Backend", gold: false },
  { name: "Prisma", cat: "ORM / BDD", gold: false },
  { name: "Docker", cat: "DevOps", gold: false },
  { name: "Node.js", cat: "Runtime", gold: false },
];

export default function Stack() {
  return (
    <section id="stack">
      <div className="wrap">
        <p className="lbl rv">Stack technique</p>
        <div className="sgrid">
          {items.map((item, i) => (
            <div
              key={item.name}
              className="sitem rv"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div
                className="sdot"
                style={{ background: item.gold ? "var(--gold)" : "var(--br)" }}
              />
              <div className="sname">{item.name}</div>
              <div className="scat">{item.cat}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
