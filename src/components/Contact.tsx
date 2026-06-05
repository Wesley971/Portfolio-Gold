import { useState } from "react";

const EMAIL = "Abdoulwes@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact">
      <div className="wrap">
        <h2 className="ctitle rv">Discutons.</h2>
        <div className="cdiv rv d1" />
        <a
          href={`mailto:${EMAIL}`}
          className={`cemail rv d2${copied ? " cemail-copied" : ""}`}
          onClick={handleEmail}
        >
          {copied ? "Copié !" : EMAIL}
        </a>
        <div className="cbtns rv d3">
          <a
            href="https://github.com/Wesley971"
            target="_blank"
            rel="noopener noreferrer"
            className="cbtn"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/wesley-abdoul/"
            target="_blank"
            rel="noopener noreferrer"
            className="cbtn"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
