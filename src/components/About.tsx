const chips = [
  { ico: "🎮", lbl: "Gaming" },
  { ico: "⛩️", lbl: "Japon" },
  { ico: "🏋️", lbl: "CrossFit" },
];

const timeline = [
  {
    yr: "2023",
    ev: "Formation développement web",
    desc: "OpenClassrooms · Niveau 5 · Premiers projets",
  },
  {
    yr: "2024",
    ev: "Développeur freelance",
    desc: "Wakonnect · Clients réels · React · Node.js",
  },
  {
    yr: "2025",
    ev: "Développeur Full Stack",
    desc: "Alt Incubateur · Équipe · Agile · Lockr",
  },
  {
    yr: "2026",
    ev: "Prochaine équipe",
    desc: "Full Stack · CDI · Paris ou remote",
  },
];

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <p className="lbl rv">Profil</p>
        <div className="about-grid rv d1">
          <div className="photo">
            <img src="/photo.jpg" alt="Wesley Abdoul" />
          </div>

          <div>
            <h2 className="about-ttl">
              De contrôleur
              <br />à développeur.
            </h2>
            <p className="about-p">
              Je suis le genre de personne qui pose les questions que les autres
              n'osent pas poser. Pas par arrogance, plutôt parce que je préfère
              comprendre vraiment plutôt que de faire semblant.
            </p>
            <p className="about-p">
              Le développement m'a appris quelque chose d'assez précis :
              traduire une idée simple dans un langage suffisamment exact pour
              qu'une machine l'exécute sans ambiguïté, c'est un exercice qui ne
              pardonne pas le flou. Et j'aime ça.
            </p>
            <p className="about-p">
              Ce que je cherche, c'est une équipe où on peut autant débloquer un
              problème technique ensemble que rire en standup. Le code c'est
              sérieux, les gens qui le font n'ont pas à l'être tout le temps.
            </p>

            <div className="chips">
              {chips.map((c) => (
                <div key={c.lbl} className="chip">
                  <span className="chip-ico">{c.ico}</span>
                  <span className="chip-lbl">{c.lbl}</span>
                </div>
              ))}
            </div>

            <p className="lbl tl-lbl">Parcours</p>
            <div>
              {timeline.map((t) => (
                <div key={t.yr} className="tl-row">
                  <span className="tl-yr">{t.yr}</span>
                  <div>
                    <div className="tl-ev">{t.ev}</div>
                    <div className="tl-desc">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
