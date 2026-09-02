"use client";

import { type FormEvent, useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUp,
  Bot,
  Camera,
  Check,
  ChevronRight,
  Layers3,
  Mail,
  Menu,
  MonitorSmartphone,
  Palette,
  PenTool,
  Printer,
  Send,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";

const sections = ["home", "about", "journey", "projects", "contact"];

const journey = [
  {
    number: "01",
    icon: Printer,
    title: "Print Production",
    label: "Fondasi desain",
    text: "Terbiasa merancang materi visual yang bukan hanya menarik, tetapi juga siap masuk proses produksi percetakan.",
    points: ["Layout siap cetak", "Media promosi", "Finishing awareness"],
  },
  {
    number: "02",
    icon: MonitorSmartphone,
    title: "Digital Visual",
    label: "Eksplorasi modern",
    text: "Mengembangkan bahasa visual untuk kebutuhan branding, konten digital, kampanye, dan tampilan web.",
    points: ["Brand direction", "Social content", "Digital campaign"],
  },
  {
    number: "03",
    icon: Bot,
    title: "AI Creative",
    label: "Workflow berkembang",
    text: "Memanfaatkan AI sebagai partner eksplorasi untuk mempercepat ide, visualisasi, dan proses kreatif.",
    points: ["Image generation", "Creative ideation", "Smart workflow"],
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add("is-visible");
          }
        });
      },
      { rootMargin: "-22% 0px -58%", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("Preview form sudah bekerja. Email atau WhatsApp tujuan akan disambungkan setelah kontak final ditambahkan.");
  };

  return (
    <main className="site-shell">
      <div className="site-noise" aria-hidden="true" />

      <header className="navbar">
        <button className="brand" onClick={() => goTo("home")} aria-label="Kembali ke awal">
          <span>DR</span><b>©26</b>
        </button>

        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Navigasi utama">
          {sections.map((id) => (
            <button
              key={id}
              className={activeSection === id ? "active" : ""}
              onClick={() => goTo(id)}
            >
              {id === "home" ? "Home" : id === "about" ? "About" : id === "journey" ? "Journey" : id === "projects" ? "Projects" : "Contact"}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="available-chip" onClick={() => goTo("contact")}>
            <i /> Open for work
          </button>
          <button
            className="menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section id="home" className="page-section hero-section is-visible">
        <div className="hero-grid section-inner reveal-block">
          <div className="hero-content">
            <div className="section-tag"><Sparkles size={15} /> Portfolio / 2026</div>
            <h1>
              DESIGN THAT
              <span>WORKS <em>BEYOND</em></span>
              THE SCREEN.
            </h1>
            <p className="hero-intro">
              Saya Dimas Riyanto—graphic designer dengan fondasi percetakan,
              perspektif digital, dan workflow kreatif berbasis AI.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => goTo("projects")}>
                Explore projects <ArrowDownRight size={19} />
              </button>
              <button className="text-button" onClick={() => goTo("about")}>
                Get to know me <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="hero-visual" aria-label="Identitas visual Dimas Riyanto">
            <div className="orbit orbit-one" aria-hidden="true" />
            <div className="orbit orbit-two" aria-hidden="true" />
            <div className="identity-card">
              <div className="identity-head">
                <span>CREATIVE ID</span><b>№ 001</b>
              </div>
              <div className="identity-mark">DR<span>.</span></div>
              <div className="identity-copy">
                <small>GRAPHIC DESIGNER</small>
                <strong>DIMAS<br />RIYANTO</strong>
                <p>PRINT × DIGITAL × AI</p>
              </div>
              <div className="identity-dots"><i /><i /><i /></div>
            </div>
            <div className="float-tool tool-pen"><PenTool /></div>
            <div className="float-tool tool-ai"><WandSparkles /></div>
            <span className="float-label label-print">PRINT READY</span>
            <span className="float-label label-ai">AI ENABLED</span>
          </div>
        </div>

        <div className="marquee" aria-hidden="true">
          <div>PRINT DESIGN <span>✦</span> VISUAL IDENTITY <span>✦</span> DIGITAL CONTENT <span>✦</span> AI CREATIVE <span>✦</span> PRINT DESIGN <span>✦</span> VISUAL IDENTITY <span>✦</span></div>
        </div>
      </section>

      <section id="about" className="page-section dotted-section">
        <div className="section-inner reveal-block">
          <div className="section-heading">
            <div className="boxed-title">ABOUT ME</div>
            <span className="section-number">01 — PROFILE</span>
          </div>

          <div className="about-grid">
            <div className="about-statement">
              <p className="redline">I CREATE VISUAL EXPERIENCES.</p>
              <h2>GOOD DESIGN SHOULD LOOK SHARP—AND <em>WORK HARD.</em></h2>
            </div>
            <div className="about-copy card-frame">
              <p>
                Saya bergerak dari dunia desain grafis percetakan, tempat setiap detail
                harus siap diwujudkan menjadi hasil fisik yang nyata. Pengalaman itu
                membentuk cara saya menyusun visual: jelas, terukur, dan punya fungsi.
              </p>
              <p>
                Kini proses tersebut berkembang ke media digital dan pemanfaatan AI.
                Bukan untuk menggantikan kreativitas, tetapi untuk membuka kemungkinan
                baru dan membuat proses eksplorasi menjadi lebih luas.
              </p>
            </div>
          </div>

          <div className="value-grid">
            <article><span>01</span><Printer /><h3>Production-minded</h3><p>Paham bagaimana desain berakhir menjadi produk cetak.</p></article>
            <article><span>02</span><Layers3 /><h3>Multi-format</h3><p>Mampu berpindah dari kebutuhan fisik ke ruang digital.</p></article>
            <article><span>03</span><Sparkles /><h3>AI-augmented</h3><p>Menggunakan teknologi untuk memperkuat proses kreatif.</p></article>
          </div>
        </div>
      </section>

      <section id="journey" className="page-section dark-section">
        <div className="section-inner reveal-block">
          <div className="section-heading light-heading">
            <div className="boxed-title lime-title">CREATIVE JOURNEY</div>
            <span className="section-number">02 — HOW I GROW</span>
          </div>

          <div className="journey-intro">
            <h2>ONE FOUNDATION.<br /><em>THREE DIRECTIONS.</em></h2>
            <p>Perjalanan yang berkembang tanpa meninggalkan pemahaman dasar tentang desain yang benar-benar digunakan.</p>
          </div>

          <div className="journey-list">
            {journey.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.number} className="journey-card">
                  <div className="journey-index">{item.number}</div>
                  <div className="journey-icon"><Icon size={28} /></div>
                  <div className="journey-main">
                    <span>{item.label}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <ul>
                    {item.points.map((point) => <li key={point}><Check size={14} /> {point}</li>)}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="toolbelt">
            <span>TOOLS & WORKFLOW</span>
            <div>
              <b>Adobe Photoshop</b><b>CorelDRAW</b><b>Canva</b><b>ChatGPT</b><b>Image Generation</b>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="page-section projects-section">
        <div className="section-inner reveal-block">
          <div className="section-heading">
            <div className="boxed-title">PROJECTS</div>
            <span className="section-number">03 — SELECTED WORK</span>
          </div>

          <div className="projects-head">
            <div>
              <p className="redline">A growing visual archive</p>
              <h2>PROJECTS BUILT<br />FROM REAL NEEDS.</h2>
            </div>
            <p>
              Tekan folder untuk melihat kelompok proyek. Karya asli dapat dimasukkan
              ke tiap kategori saat materi portofolio sudah siap.
            </p>
          </div>

          <div className={folderOpen ? "archive is-open" : "archive"}>
            <div className="archive-card archive-print">
              <div><Printer /><span>01</span></div><h3>Print & Production</h3><p>Banner, packaging, sticker, menu, dan kebutuhan promosi.</p>
            </div>
            <div className="archive-card archive-brand">
              <div><Palette /><span>02</span></div><h3>Brand & Social</h3><p>Identitas visual, konten sosial, dan campaign design.</p>
            </div>
            <div className="archive-card archive-ai">
              <div><Bot /><span>03</span></div><h3>AI Exploration</h3><p>Generative image, visual concept, dan smart workflow.</p>
            </div>

            <button
              className="folder-button"
              onClick={() => setFolderOpen((open) => !open)}
              aria-expanded={folderOpen}
              aria-label={folderOpen ? "Tutup folder proyek" : "Buka folder proyek"}
            >
              <img src="/assets/project-folder.webp" alt="Folder 3D kumpulan proyek desain" width="1280" height="853" />
              <span><strong>{folderOpen ? "CLOSE ARCHIVE" : "OPEN PROJECTS"}</strong><small>Click the folder</small></span>
            </button>
          </div>
        </div>
      </section>

      <section id="contact" className="page-section contact-section">
        <div className="section-inner reveal-block">
          <div className="section-heading">
            <div className="boxed-title lime-title">CONTACT</div>
            <span className="section-number">04 — LET&apos;S TALK</span>
          </div>

          <div className="contact-grid">
            <div className="contact-copy-block">
              <p className="redline">Have a project in mind?</p>
              <h2>LET&apos;S MAKE<br /><em>SOMETHING<br />MEMORABLE.</em></h2>
              <p>Ceritakan kebutuhan desainmu—untuk percetakan, digital, branding, atau eksplorasi kreatif dengan AI.</p>
              <div className="social-preview" aria-label="Kanal kontak yang dapat ditambahkan">
                <span><Mail size={21} /></span><span><Camera size={21} /></span><span><Send size={21} /></span>
              </div>
            </div>

            <form className="contact-form card-frame" onSubmit={handleContactSubmit}>
              <label>
                Your name
                <input name="name" type="text" placeholder="Nama kamu" required />
              </label>
              <label>
                Your email
                <input name="email" type="email" placeholder="email@contoh.com" required />
              </label>
              <label>
                Your message
                <textarea name="message" placeholder="Ceritakan proyek yang ingin dibuat..." rows={6} required />
              </label>
              <button type="submit">Prepare message <Send size={19} /></button>
              {formStatus && <p className="form-status" role="status">{formStatus}</p>}
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div><span>DR.</span><p>Dimas Riyanto — Graphic Designer & AI Creative</p></div>
        <button onClick={() => goTo("home")}>Back to top <ArrowUp size={17} /></button>
      </footer>
    </main>
  );
}
